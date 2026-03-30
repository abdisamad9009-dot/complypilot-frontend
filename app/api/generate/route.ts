import { NextResponse } from "next/server";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // API key goes in Vercel, NOT here
});
export async function POST(req: Request) {
  try {
    const { type } = await req.json();
    const prompt = `Generate a professional ${type} compliance document for a UK-based startup company.

REQUIREMENTS:
- Minimum 1500 words
- Structured with clear sections and headings
- Include:
  1. Introduction
  2. Purpose
  3. Scope
  4. Definitions (if applicable)
  5. Policy Details
  6. Responsibilities
  7. Procedures
  8. Compliance & Enforcement
  9. Review Schedule
- Use formal business language
- Make it ready for real company use (not generic fluff)
- Include bullet points where helpful
- Make it detailed and practical

Return ONLY the document content.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional compliance document generator.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });
    return NextResponse.json({
      document: completion.choices[0].message.content,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
