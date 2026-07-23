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

    const totalGaps = gdprIssues.length + authIssues.length + securityIssues.length;

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
- Total gaps identified: ${totalGaps}

SPECIFIC FINDINGS FROM THEIR ASSESSMENT (answered "No" to these questions):
GDPR / data protection gaps:
${gdprIssues.length ? gdprIssues.map((q: string) => `- ${q}`).join("\n") : "- None identified"}

Authentication gaps:
${authIssues.length ? authIssues.map((q: string) => `- ${q}`).join("\n") : "- None identified"}

Security control gaps:
${securityIssues.length ? securityIssues.map((q: string) => `- ${q}`).join("\n") : "- None identified"}

STRUCTURE — produce the document in this order:

1. EXECUTIVE SUMMARY (short, 3-5 sentences): state the compliance score, the total number of gaps
   found, and a one-line characterisation of overall risk level (e.g. "moderate risk requiring
   near-term action" or "low risk with a small number of gaps to close"). Write this for a
   time-pressed business owner, not a technical audience.

2. For each category with findings (GDPR, Authentication, Security), for every individual finding:
   - The finding itself
   - Risk explanation grounded in that specific finding
   - Real-world consequence for a company of this size and industry. Where a UK GDPR article is
     genuinely relevant, name it (e.g. Article 32 — security of processing; Article 35 — DPIAs;
     Article 33 — breach notification; Article 28 — processor/vendor obligations; Article 13 —
     information to be provided to data subjects). Only cite an article where it is a close, accurate
     fit — do not default to Article 32 for every finding. NEVER state definitively that something
     "violates" or "breaches" an article — this is not a legal determination. Use hedged, defensible
     language instead: "may fall short of," "creates exposure under," "is not aligned with the
     expectations of," "could be viewed by the ICO as inconsistent with."
   - A realistic indicative financial exposure range in GBP, grounded in publicly known ICO
     enforcement patterns for UK SMEs (most UK GDPR fines for small businesses with no prior breach
     history and swift remediation tend to range from low thousands to tens of thousands of pounds,
     not the theoretical maximum of 4% of global turnover, which is reserved for large-scale or
     repeated serious breaches).
   - One concrete, prioritised remediation step

At the very start of the first financial exposure figure given anywhere in the document, include this
exact caveat inline (once only, not repeated for every finding): "(indicative only, based on typical
ICO enforcement patterns for similar-sized businesses — not a legal prediction or guarantee)"

3. PRIORITISED ACTION PLAN: a short ranked list (highest risk first) of the top 3-5 actions to take,
   independent of category, so the reader knows exactly what to fix first.

RULES:
- Every risk must be tied directly to one of the specific findings listed above — do not invent
  generic risk categories (e.g. "Market Risks", "Strategic Risks") unrelated to the findings given.
- Vary sentence structure between findings so it doesn't read as a repeated template.
- Keep tone professional and consultative, as if written by a compliance analyst who has actually
  reviewed this company's answers.
- Do not include a signature block, appendices, or disclaimer boilerplate beyond the one financial
  caveat described above.
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
