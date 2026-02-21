import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");

export async function POST(request: Request) {
    try {
        const { county } = await request.json();

        if (!process.env.GOOGLE_AI_API_KEY) {
            return NextResponse.json(
                { error: "API Key missing. Please set GOOGLE_AI_API_KEY in .env.local" },
                { status: 500 }
            );
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
      Generate 3 unique, realistic, and slightly humorous 'hustles' (jobs/businesses) specific to ${county} County, Kenya. 
      Consider unique geography, culture, and economy.
      CRITICAL: Estimate 'cost' (Capital) based on LOCAL SCARCITY and reality. 
      (e.g. Selling Water in arid Wajir requires a tanker/borehole = High Capital > 50,000 KES. Selling Water in Kisumu = Low Capital).
      (e.g. Boda Boda in Nairobi = High Capital due to insurance/bike cost).
      
      Return ONLY a valid JSON array of objects with this structure:
      [
        {
          "id": "unique-id",
          "name": "Hustle Name (Swahili/Sheng/English)",
          "cost":number (in KES),
          "risk": number (1-100),
          "profit": number (estimated daily profit KES),
          "description": "Short witty description",
          "category": "Grind" | "Gamble" | "Unique", 
          "challenges": ["Challenge 1", "Challenge 2"],
          "vibe": "Short slang/quote (e.g. 'Kanjo wasafike')"
        }
      ]
      Do not wrap in markdown code blocks. Just the raw JSON string.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up potential markdown code blocks if the model behaves adding them
        const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();

        const hustles = JSON.parse(jsonStr);

        return NextResponse.json({ hustles });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json(
            { error: "Failed to generate hustles. Try again or check API quota." },
            { status: 500 }
        );
    }
}
