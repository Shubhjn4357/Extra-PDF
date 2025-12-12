import { GoogleGenAI, Chat, GenerateContentResponse, FunctionDeclaration, Type } from "@google/genai";
import { ChatMessage } from "../types";

// Initialize the Gemini client
const getClient = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.error("API Key not found. Gemini features will fail.");
    }
    return new GoogleGenAI({ apiKey: apiKey || '' });
};

const addTextTool: FunctionDeclaration = {
  name: 'edit_pdf_add_text',
  description: 'Add new text to the PDF. Use this for filling forms or adding comments.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      text: { type: Type.STRING, description: 'The text content to add.' },
      page: { type: Type.NUMBER, description: 'Page number (1-based index).' },
      x: { type: Type.NUMBER, description: 'X coordinate in points (0 is left).' },
      y: { type: Type.NUMBER, description: 'Y coordinate in points (0 is top).' },
    },
    required: ['text', 'x', 'y', 'page'],
  },
};

const replaceTextTool: FunctionDeclaration = {
  name: 'edit_pdf_replace_text',
  description: 'Replace text by covering old text with whiteout and adding new text on top.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      newText: { type: Type.STRING, description: 'The new text to write.' },
      page: { type: Type.NUMBER, description: 'Page number (1-based index).' },
      x: { type: Type.NUMBER, description: 'X coordinate of the area.' },
      y: { type: Type.NUMBER, description: 'Y coordinate of the area.' },
      width: { type: Type.NUMBER, description: 'Width of the area to cover.' },
      height: { type: Type.NUMBER, description: 'Height of the area to cover.' },
    },
    required: ['newText', 'x', 'y', 'width', 'height', 'page'],
  },
};

const cleanStampTool: FunctionDeclaration = {
    name: 'clean_page_image',
    description: 'Process the current page image to remove stamps or watermarks.',
    parameters: {
        type: Type.OBJECT,
        properties: {
            page: { type: Type.NUMBER, description: 'Page number to clean.' }
        },
        required: ['page']
    }
}

export const createChatSession = (): Chat => {
    const ai = getClient();
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: `You are ExtraPDF Assistant, an expert AI document editor.
            
            Key Capabilities:
            1. **Analyze & Suggest**: When asked for suggestions, analyze the text context and suggest grammar fixes, clarity improvements, or professional tone shifts.
            2. **Edit PDF**: You can call tools to Add Text, Replace Text, or Clean Stamps. 
               - When replacing text, provide the exact coordinates of the text to be replaced (x,y,width,height) and the new text string.
            3. **Formatting**: If the user asks for bold/italic text, mention that they should select the text in the editor toolbar, as you primarily handle content generation.
            
            Coordinate System:
            - PDF A4: 595 x 842 points. Origin Top-Left.
            
            Rules:
            - Provide FULL and COMPREHENSIVE responses.
            - If asked to "remove stamp", call the 'clean_page_image' tool.
            - When suggesting edits, show "Original: ..." and "Suggestion: ...".
            `,
            tools: [{ functionDeclarations: [addTextTool, replaceTextTool, cleanStampTool] }],
        },
    });
};

export const prepareDocumentPrompt = (pdfText: string, userQuery: string): string => {
    const MAX_CONTEXT = 100000; 
    const context = pdfText.length > MAX_CONTEXT ? pdfText.substring(0, MAX_CONTEXT) + "\n...(truncated)..." : pdfText;
    return `Document Content:\n${context}\n\nUser Query: ${userQuery}`;
};

export const streamResponse = async (
    chat: Chat, 
    message: string, 
    onChunk: (text: string) => void,
    onToolCall?: (toolCall: any) => Promise<any>
): Promise<void> => {
    try {
        const result = await chat.sendMessageStream({ message });
        
        for await (const chunk of result) {
            const c = chunk as GenerateContentResponse;
            if (c.text) {
                onChunk(c.text);
            }

            const functionCalls = c.candidates?.[0]?.content?.parts?.filter(p => p.functionCall).map(p => p.functionCall);
            
            if (functionCalls && functionCalls.length > 0 && onToolCall) {
                for (const fc of functionCalls) {
                     onChunk(`\n[Action: ${fc.name}...]`);
                     const toolResult = await onToolCall(fc);
                     if (toolResult) {
                        await chat.sendMessage({
                            message: [{
                                functionResponse: {
                                    name: fc.name,
                                    response: { result: toolResult }
                                }
                            }]
                        });
                        onChunk(` Done.\n`);
                     }
                }
            }
        }
    } catch (error) {
        console.error("Gemini Stream Error:", error);
        onChunk("\nError: Could not complete request. Please try again.");
    }
};

export const removeStampFromImage = async (base64Image: string): Promise<string> => {
    // Fallback/Simulated: In a real app, this would call Imagen or a dedicated cleanup API.
    console.log("AI Stamp Removal Requested (Simulation)");
    return base64Image; 
};

export const detectStamps = async (base64Image: string): Promise<Array<{x: number, y: number, width: number, height: number}>> => {
    const ai = getClient();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    { inlineData: { mimeType: 'image/jpeg', data: base64Image.split(',')[1] } },
                    { text: `Identify the bounding boxes of any red stamps, circular seals, logos, or watermarks in this document image that are distinct from the main text. 
                             Return a JSON array of objects with keys: ymin, xmin, ymax, xmax.
                             Coordinates should be normalized 0-1000 (0 is top/left, 1000 is bottom/right).
                             If none found, return empty array [].
                             Do not include markdown formatting, just raw JSON.
                             Example: [{"ymin": 100, "xmin": 200, "ymax": 300, "xmax": 400}]` }
                ]
            },
            config: {
                responseMimeType: 'application/json'
            }
        });
        
        const text = response.text || "[]";
        // Parse JSON
        const boxes = JSON.parse(text);
        if (!Array.isArray(boxes)) return [];
        
        return boxes.map((b: any) => ({
             // Convert 1000-based range to 0-1 scale for the caller to scale up
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