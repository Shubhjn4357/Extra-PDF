import { GoogleGenAI, Chat, GenerateContentResponse, FunctionDeclaration, Type } from "@google/genai";
import { ChatMessage } from "../types";

// Initialize the Gemini client
const getClient = () => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
        console.error("API Key not found. Gemini features will fail.");
    }
    return new GoogleGenAI({ apiKey: apiKey || '' });
};

// --- Tool Definitions ---

const addTextTool: FunctionDeclaration = {
    name: 'edit_pdf_add_text',
    description: 'Add new text to the PDF. Use this for filling forms, adding comments, or inserting headers/footers.',
    parameters: {
        type: Type.OBJECT,
        properties: {
            text: { type: Type.STRING, description: 'The text content to add.' },
            page: { type: Type.NUMBER, description: 'Page number (1-based index).' },
            x: { type: Type.NUMBER, description: 'X coordinate in points (0 is left). Default to 100 if unknown.' },
            y: { type: Type.NUMBER, description: 'Y coordinate in points (0 is top). Default to 100 if unknown.' },
            fontSize: { type: Type.NUMBER, description: 'Font size (default 14).' },
            color: { type: Type.STRING, description: 'Hex color (default #000000).' }
        },
        required: ['text', 'page'],
    },
};

const cleanStampTool: FunctionDeclaration = {
    name: 'clean_page_image',
    description: 'Use AI Vision to detect and remove stamps, watermarks, or logos from a specific page.',
    parameters: {
        type: Type.OBJECT,
        properties: {
            page: { type: Type.NUMBER, description: 'Page number to clean (1-based index).' }
        },
        required: ['page']
    }
};

const rotatePageTool: FunctionDeclaration = {
    name: 'organize_rotate_page',
    description: 'Rotate a specific page by 90 degrees clockwise.',
    parameters: {
        type: Type.OBJECT,
        properties: {
            page: { type: Type.NUMBER, description: 'Page number to rotate.' }
        },
        required: ['page']
    }
};

const deletePageTool: FunctionDeclaration = {
    name: 'organize_delete_page',
    description: 'Delete a specific page or list of pages from the document.',
    parameters: {
        type: Type.OBJECT,
        properties: {
            pages: {
                type: Type.ARRAY,
                items: { type: Type.NUMBER },
                description: 'Array of page numbers to delete.'
            }
        },
        required: ['pages']
    }
};

const pageCountTool: FunctionDeclaration = {
    name: 'get_page_count',
    description: 'Get the total number of pages in the document.',
    parameters: { type: Type.OBJECT, properties: {} }
};

export const createChatSession = (): Chat => {
    const ai = getClient();
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: `You are ExtraPDF Assistant, an expert AI document editor.
            
            Capabilities:
            1. **Edit Content**: Add text, comments, or form fills using 'edit_pdf_add_text'.
            2. **Clean Up**: Remove stamps/watermarks using 'clean_page_image'.
            3. **Organize**: Rotate pages ('organize_rotate_page') or delete pages ('organize_delete_page').
            4. **Analyze**: Summarize or explain content based on the text provided by the user.
            
            Rules:
            - Always confirm action completion (e.g., "I've rotated page 3").
            - For 'clean_page_image', tell the user you are "scanning the page for visual artifacts".
            - If the user asks to "fix" or "clean" a page, assume they mean stamp/artifact removal.
            - Coordinate System: PDF origin is Top-Left. Width ~595pt.
            `,
            tools: [{ functionDeclarations: [addTextTool, cleanStampTool, rotatePageTool, deletePageTool, pageCountTool] }],
        },
    });
};

export const prepareDocumentPrompt = (pdfText: string, userQuery: string, isFirstMessage: boolean): string => {
    if (!isFirstMessage) return userQuery;

    const MAX_CONTEXT = 50000;
    const context = pdfText.length > MAX_CONTEXT ? pdfText.substring(0, MAX_CONTEXT) + "\n...(truncated)..." : pdfText;
    return `Context (Document Text):\n${context}\n\nUser Query: ${userQuery}`;
};

export const streamResponse = async (
    chat: Chat,
    message: string,
    onChunk: (text: string) => void,
    onToolCall?: (toolCall: any) => Promise<any>
): Promise<void> => {
    try {
        const result = await chat.sendMessageStream({ message });

        let fullText = "";

        for await (const chunk of result) {
            const c = chunk as GenerateContentResponse;
            if (c.text) {
                fullText += c.text;
                onChunk(c.text);
            }

            const functionCalls = c.candidates?.[0]?.content?.parts?.filter(p => p.functionCall).map(p => p.functionCall);

            if (functionCalls && functionCalls.length > 0 && onToolCall) {
                for (const fc of functionCalls) {
                    // Notify UI of tool usage via text stream
                    // onChunk(`\n(Executing ${fc.name.replace(/_/g, ' ')}...)\n`);

                    const toolResult = await onToolCall(fc);

                    // Send result back to model
                    const toolResponse = await chat.sendMessageStream({
                        message: [{
                            functionResponse: {
                                name: fc?.name,
                                response: { result: toolResult }
                            }
                        }]
                    });

                    // Stream the explanation after tool execution
                    for await (const toolChunk of toolResponse) {
                        const tc = toolChunk as GenerateContentResponse;
                        if (tc.text) onChunk(tc.text);
                    }
                }
            }
        }
    } catch (error) {
        console.error("Gemini Stream Error:", error);
        onChunk("\nError: Could not complete request. Please try again.");
    }
};

export const detectStamps = async (base64Image: string): Promise<Array<{ x: number, y: number, width: number, height: number }>> => {
    const ai = getClient();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    { inlineData: { mimeType: 'image/jpeg', data: base64Image.split(',')[1] } },
                    {
                        text: `Locate visual stamps, seals, logos, or bold watermarks on this page.
                             Return a JSON array of bounding boxes: [{"ymin": 0, "xmin": 0, "ymax": 1000, "xmax": 1000}].
                             Normalize coordinates to 0-1000 scale.
                             Rules:
                             - TIGHT boxes only.
                             - Ignore regular text paragraphs.
                             - Focus on colored ink (red/blue) or circular seals.` }
                ]
            },
            config: {
                responseMimeType: 'application/json'
            }
        });

        const text = response.text || "[]";
        const boxes = JSON.parse(text);
        if (!Array.isArray(boxes)) return [];

        return boxes.map((b: any) => ({
            x: b.xmin / 1000,
            y: b.ymin / 1000,
            width: (b.xmax - b.xmin) / 1000,
            height: (b.ymax - b.ymin) / 1000
        }));

    } catch (e) {
        console.error("Gemini Vision Error:", e);
        return [];
    }
};

// NEW: Single text block enhancement
export const enhanceTextBlock = async (text: string, instruction: string): Promise<string> => {
    const ai = getClient();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `System: You are a text editor assistant. Improve the following text based on this instruction: "${instruction}". Return ONLY the improved text, no quotes, no explanations.
            Text: "${text}"`
        });
        return response.text?.trim() || text;
    } catch (e) {
        console.error(e);
        return text;
    }
};

// NEW: Real Inpainting via Gemini
export const removeStampWithMask = async (imageBase64: string, maskBase64: string): Promise<string | null> => {
    const ai = getClient();
    try {
        const response = await ai.models.generateContent({
            // Using 2.5 Flash for vision tasks or Pro if higher quality needed.
            // Note: Standard 'generateContent' with mask implies an editing task.
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    { text: "Remove the object covered by the white mask. Restore the background naturally to match the document paper." },
                    { inlineData: { mimeType: 'image/png', data: imageBase64.split(',')[1] } },
                    { inlineData: { mimeType: 'image/png', data: maskBase64.split(',')[1] } }
                ]
            }
        });

        // Find the image part in the response
        if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData && part.inlineData.data) {
                    return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                }
            }
        }
        return null;
    } catch (e) {
        console.error("Gemini Inpainting Error:", e);
        throw e;
    }
};