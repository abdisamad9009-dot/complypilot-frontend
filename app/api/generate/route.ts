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

The document MUST contain exactly these six section headers, in this order, every single time,
with no exceptions:

## EXECUTIVE SUMMARY
## FINANCIAL EXPOSURE DISCLAIMER
## DETAILED FINDINGS
## COMPOUNDING RISKS
## PRIORITISED ACTION PLAN
## PATH FORWARD

Content rules for each section:

## EXECUTIVE SUMMARY
3-5 sentences. State the compliance score, total gap count, and a one-line risk verdict (e.g.
"moderate risk requiring near-term action"). Written for a time-pressed business owner.

## FINANCIAL EXPOSURE DISCLAIMER
Exactly one sentence, appearing here ONLY and nowhere else in the document: "Financial exposure
figures throughout this report are indicative only, based on typical ICO enforcement patterns for
similarly sized businesses, and do not constitute a legal prediction or guarantee." Do not repeat
any version of this sentence anywhere else in the document.

## DETAILED FINDINGS
For every finding across GDPR, Authentication, and Security (grouped under their own subheadings),
give: the finding, a risk explanation, the real-world consequence (naming a specific UK GDPR article
ONLY where it is a close, accurate fit — vary which article you use, do not default to Article 32
for everything), an indicative GBP financial exposure range (numbers only, no repeated disclaimer
text), and one concrete remediation step. Use hedged, non-definitive language for legal claims
always: "may fall short of," "creates exposure under," "is not aligned with the expectations of" —
NEVER "violates" or "breaches."

## COMPOUNDING RISKS
This section is MANDATORY and must never be skipped or left empty. Identify at least one genuine
way two or more of the findings above interact to create a combined risk greater than either alone
(for example: absent MFA together with no monitoring of privileged users meaningfully increases
insider-threat exposure; missing backup testing together with no disaster recovery plan means a
single incident could cause irreversible data loss). Write 2-4 sentences on this.

## PRIORITISED ACTION PLAN
A ranked list of the top 3-5 actions, highest priority first. For EVERY item, include a short clause
explaining why it is ranked where it is relative to the others (e.g. "ranked first because it is
low-effort and closes the highest-likelihood gap"). Do not list actions without this justification.

## PATH FORWARD
This section is MANDATORY. One short closing paragraph estimating, in plain directional terms (not
a fabricated precise percentage), how much completing the action plan would improve the company's
compliance posture relative to the ${totalGaps} gaps identified.

GENERAL RULES:
- Every risk must trace to one of the specific findings given — never invent generic categories
  like "Market Risks" or "Strategic Risks."
- Vary sentence structure between findings so nothing reads like a repeated template.
- Write with the confidence and economy of a compliance analyst who has done this hundreds of times.
  Do not over-explain basic concepts the reader already understands.
- No signature block, appendices, or extra disclaimer boilerplate anywhere outside the one
  designated disclaimer section above.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
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
