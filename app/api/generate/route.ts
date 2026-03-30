import { NextResponse } from "next/server";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});
export async function POST(req: Request) {
  try {
    const { type } = await req.json();
    const prompt = `Generate a professional ${type} compliance document for a UK-based startup company.

const prompt = `
Generate a highly detailed, enterprise-grade ${type} document for a UK-based company.

Requirements:
- Minimum 1500 words
- Formal, professional, legal tone (like a real compliance consultant wrote it)
- Structured with clear numbered sections and subsections
- No placeholders like [Company Name] — instead write in a realistic generic company voice
- Include:
  • Introduction
  • Purpose
  • Scope
  • Definitions (where relevant)
  • Detailed policy sections
  • Step-by-step procedures
  • Roles & responsibilities
  • Real-world examples where helpful
  • Risk implications and potential financial/legal consequences
  • Compliance references (GDPR, ICO, ISO 27001 where relevant)
  • Review and audit process

Formatting rules:
- Use proper headings (1., 1.1, 1.2 etc.)
- Use bullet points correctly (each on new line)
- No markdown symbols (* # etc.)
- Clean spacing between sections
- Write like a real document businesses could use immediately

Make the document feel premium, thorough, and worth thousands of pounds if sold commercially.
`;

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
