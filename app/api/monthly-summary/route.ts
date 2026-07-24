import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const {
      businessName,
      industry,
      complianceScore,
      gdprIssues,
      authIssues,
      securityIssues,
    } = await req.json();

    const companyLabel = businessName?.trim() ? businessName : "the company";
    const totalGaps = gdprIssues.length + authIssues.length + securityIssues.length;

    const prompt = `
Write a short monthly compliance summary (3-4 sentences, plain prose, no headers or bullet points)
for the following UK company, to appear on their dashboard.

Company: ${companyLabel}
Industry: ${industry || "not specified"}
Compliance score: ${complianceScore}%
Total open gaps: ${totalGaps} (${gdprIssues.length} GDPR, ${authIssues.length} authentication,
${securityIssues.length} security)

Rules:
- Use hedged, non-definitive language for any regulatory claims: "may fall short of," "creates
  exposure under" — never "violates," "breaches," or "fully compliant."
- If total gaps is 0, write a short positive-but-measured summary, not an overclaiming one (avoid
  "fully compliant" — prefer "no open gaps identified in the current self-assessment").
- Mention the general themes of the open gaps in plain terms rather than listing every finding.
- No placeholders. Use the real company name and details given.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a compliance analyst writing brief, accurate monthly summaries. You never overclaim compliance status and never use definitive legal language like 'violates' or 'fully compliant'.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return NextResponse.json({
      summary: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
