import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const {
      type,
      businessName,
      industry,
      employees,
      complianceScore,
      gdprIssues,
      authIssues,
      securityIssues,
    } = await req.json();

    const companyLabel = businessName?.trim() ? businessName : "the company";

    const prompt = `
Generate a professional "${type}" compliance document for the following UK company.
Use their real details below. Do NOT use placeholders like [Company Name] or [Insert Date] —
use the actual values provided. If a value is missing, refer to them naturally as "the company"
rather than leaving a bracketed placeholder.

COMPANY DETAILS
- Company name: ${companyLabel}
- Industry: ${industry || "not specified"}
- Company size: ${employees || "not specified"} employees
- Overall compliance score from their self-assessment: ${complianceScore || "not available"}%

SPECIFIC FINDINGS FROM THEIR ASSESSMENT (answered "No" to these questions):
GDPR / data protection gaps:
${gdprIssues.length ? gdprIssues.map((q: string) => `- ${q}`).join("\n") : "- None identified"}

Authentication gaps:
${authIssues.length ? authIssues.map((q: string) => `- ${q}`).join("\n") : "- None identified"}

Security control gaps:
${securityIssues.length ? securityIssues.map((q: string) => `- ${q}`).join("\n") : "- None identified"}

INSTRUCTIONS:
1. Every risk you describe must be tied directly to one of the specific findings listed above —
   do not invent generic risk categories (e.g. "Market Risks", "Strategic Risks") that have nothing
   to do with the findings given.
2. Where relevant, reference the applicable UK GDPR article in plain terms (e.g. Article 32 —
   security of processing; Article 35 — DPIAs; Article 33 — breach notification) rather than vague
   phrases like "GDPR violations."
3. For each finding, briefly explain the real-world consequence for a company of this size and
   industry, and give one concrete, actionable remediation step.
4. Keep tone professional and consultative, as if written by a compliance analyst who has actually
   reviewed this company's answers — not a generic template.
5. Do not include a signature block, appendices, or disclaimer boilerplate.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a professional UK GDPR and security compliance analyst. You write specific, evidence-based compliance documents grounded strictly in the data you are given. You never use placeholder text and never introduce generic risk categories unrelated to the findings provided.",
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
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
