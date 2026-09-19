import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        // Call OpenAI API (or replace with Groq / Gemini API)
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "You are NOVA Copilot, a helpful and concise AI assistant for a modern workspace web platform.",
                    },
                    { role: "user", content: prompt },
                ],
            }),
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            return NextResponse.json(
                { text: errData?.error?.message || "API request failed." },
                { status: response.status }
            );
        }

        const data = await response.json();
        const reply = data.choices[0]?.message?.content || "No response generated.";

        return NextResponse.json({ text: reply });
    } catch (_error) {
        return NextResponse.json(
            { text: "Server error processing your request." },
            { status: 500 }
        );
    }
}