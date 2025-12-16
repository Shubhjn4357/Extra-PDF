
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();
        
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
        
        if (!apiKey) {
            return NextResponse.json({ error: 'API Key missing' }, { status: 500 });
        }

        const ai = new GoogleGenAI({ apiKey });
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `You are an expert document creator. Create a professional, well-formatted document based on this request: "${prompt}".
            
            Return the content in **valid HTML** format with inline CSS for styling. 
            - Use a proper structure (h1, h2, p, ul).
            - Add a title if one is implied.
            - Format it to look like a real document (Resume, Invoice, Letter, etc.).
            - WRAP the entire content in a <div id="document-root" style="padding: 40px; font-family: 'Helvetica', sans-serif; line-height: 1.6;"> ... </div>.
            - Do NOT include markdown code blocks (\`\`\`html). Just return the raw HTML string.`
        });

        let text = response.text || "";
        text = text.replace(/```html/g, '').replace(/```/g, '');

        return NextResponse.json({ html: text });

    } catch (error: any) {
        console.error("API Generation Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
