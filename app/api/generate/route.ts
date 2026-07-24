import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const POLICY_DOCS = [
  "Information Security Policy",
  "GDPR Compliance Policy",
  "Data Retention Policy",
  "Access Control Policy",
  "Acceptable Use Policy",
  "Vendor Risk Policy",
  "Encryption Policy",
];

const PLAN_DOCS = [
  "Incident Response Plan",
  "Business Continuity Plan",
  "Data Breach Response Policy",
];

function getDocCategory(type: string): "risk_report" | "policy" | "plan" | "privacy_policy" {
  if (type === "Risk Assessment Report") return "risk_report";
  if (type === "Privacy Policy") return "privacy_policy";
  if (PLAN_DOCS.includes(type)) return "plan";
  if (POLICY_DOCS.includes(type)) return "policy";
  return "policy";
}

function buildRiskReportPrompt(vars: any) {
  const { companyLabel, industry, employees, complianceScore, totalGaps, gdprIssues, authIssues, securityIssues } = vars;
  return `
Generate a professional "Risk Assessment Report" for the following UK company.
Use their real details below. Do NOT use placeholders like [Company Name] or [Insert Date] —
use the actual values provided.

COMPANY DETAILS
- Company name: ${companyLabel}
- Industry: ${industry || "not specified"}
- Company size: ${employees || "not specified"} employees
- Overall compliance score: ${complianceScore || "not available"}%
- Total gaps identified: ${totalGaps}

SPECIFIC FINDINGS (answered "No" to these questions):
GDPR / data protection gaps:
${gdprIssues.length ? gdprIssues.map((q: string) => `- ${q}`).join("\n") : "- None identified"}
Authentication gaps:
${authIssues.length ? authIssues.map((q: string) => `- ${q}`).join("\n") : "- None identified"}
Security control gaps:
${securityIssues.length ? securityIssues.map((q: string) => `- ${q}`).join("\n") : "- None identified"}

The document MUST contain exactly these six section headers, in this order:
## EXECUTIVE SUMMARY
## FINANCIAL EXPOSURE DISCLAIMER
## DETAILED FINDINGS
## COMPOUNDING RISKS
## PRIORITISED ACTION PLAN
## PATH FORWARD

## EXECUTIVE SUMMARY
3-5 sentences. State the compliance score, total gap count, and a one-line risk verdict.

## FINANCIAL EXPOSURE DISCLAIMER
Exactly one sentence, appearing here ONLY: "Financial exposure figures throughout this report are
indicative only, based on typical ICO enforcement patterns for similarly sized businesses, and do
not constitute a legal prediction or guarantee."

## DETAILED FINDINGS
Cover every single finding listed above individually — never skip, truncate, or summarize any of
them. For each: the finding, a risk explanation, real-world consequence (naming a specific UK GDPR
article ONLY where genuinely relevant — vary the article used, never default to Article 32 for
everything), an indicative GBP financial exposure range (individual findings generally £500-£15,000,
higher only for the single most severe finding if one clearly stands out), and one remediation step.
Use hedged language always: "may fall short of," "creates exposure under" — NEVER "violates" or
"breaches."

## COMPOUNDING RISKS
Mandatory. Identify at least one genuine way two or more findings interact to create a combined risk
greater than either alone.

## PRIORITISED ACTION PLAN
Ranked top 3-5 actions, each with a short justification for its rank.

## PATH FORWARD
Mandatory. One paragraph, plain directional terms, on how much completing the plan would improve
the company's posture relative to the ${totalGaps} gaps.

RULES: vary sentence structure between findings; write with the confidence of an experienced
analyst; no signature block or appendices.
`;
}

function buildPolicyPrompt(vars: any) {
  const { type, companyLabel, industry, employees, gdprIssues, authIssues, securityIssues } = vars;
  const allGaps = [...gdprIssues, ...authIssues, ...securityIssues];
  return `
Generate a professional "${type}" for the following UK company. This is an internal company policy
document — the kind an employee or auditor would read to understand the company's actual rules and
standards. It is NOT a risk report and must not read like one. Do NOT list "findings" or reference
a compliance score. Do NOT use placeholders like [Company Name] — use the real values given.

COMPANY DETAILS
- Company name: ${companyLabel}
- Industry: ${industry || "not specified"}
- Company size: ${employees || "not specified"} employees

CONTEXT (for your awareness only — do not reference this list directly or call it out as "gaps" in
the document; instead, make sure the policy's rules directly close these specific gaps by requiring
the relevant practice):
${allGaps.length ? allGaps.map((q: string) => `- ${q}`).join("\n") : "- No specific gaps flagged"}

STRUCTURE:
## PURPOSE
1-2 sentences: what this policy governs and why it exists for this company.

## SCOPE
Who and what this policy applies to (e.g. all employees, contractors, systems handling company or
customer data).

## POLICY STATEMENTS
The core rules of the policy, as numbered statements written in the present tense as binding company
rules (e.g. "All company devices must have multi-factor authentication enabled before accessing
production systems."). Make sure the statements collectively require the specific practices needed
to close the gaps listed in CONTEXT above, phrased as forward-looking company rules, not references
to past failures.

## RESPONSIBILITIES
Who owns enforcement and monitoring of this policy (e.g. IT lead, management, all staff) — keep
generic to role, not named individuals.

## REVIEW
One sentence stating this policy should be reviewed at least annually or after any significant
change to the company's systems or data handling.

RULES:
- Written entirely as forward-looking company rules — never in the language of "the company lacks X"
  or "gaps were found."
- Professional, plain business English — the tone of an actual internal policy document, not a
  report.
- No signature block, no disclaimers, no financial figures — those belong in the Risk Assessment
  Report, not here.
`;
}

function buildPlanPrompt(vars: any) {
  const { type, companyLabel, industry, employees, gdprIssues, authIssues, securityIssues } = vars;
  const allGaps = [...gdprIssues, ...authIssues, ...securityIssues];
  return `
Generate a professional "${type}" for the following UK company. This is a procedural plan document —
a step-by-step guide for what the company actually does when a specific situation occurs. It is NOT
a risk report. Do NOT use placeholders — use the real values given.

COMPANY DETAILS
- Company name: ${companyLabel}
- Industry: ${industry || "not specified"}
- Company size: ${employees || "not specified"} employees

CONTEXT (for your awareness only — do not list this as "findings"; instead make sure the plan's
procedures specifically close these gaps by requiring the relevant practice at the relevant step):
${allGaps.length ? allGaps.map((q: string) => `- ${q}`).join("\n") : "- No specific gaps flagged"}

STRUCTURE:
## PURPOSE
1-2 sentences on what scenario this plan covers and why it matters for this company.

## ROLES AND RESPONSIBILITIES
Who is responsible for what during an incident (by role, not named individuals — e.g. "IT lead",
"management", "all staff").

## PROCEDURE
A clear, numbered, step-by-step sequence of actions to take when this scenario occurs, from initial
detection/trigger through to resolution and follow-up. Where UK GDPR timing requirements are
genuinely relevant (e.g. 72-hour ICO breach notification under Article 33), state them accurately.

## COMMUNICATION
Who needs to be informed (internally and, where relevant, externally — customers, ICO, etc.) and in
what order.

## REVIEW
One sentence stating this plan should be tested/reviewed at least annually.

RULES:
- Written as an actionable procedure the company would actually follow, not a description of risks.
- Plain, direct, numbered steps — a stressed employee following this during a real incident should
  be able to act on it immediately.
- No financial figures, no disclaimers — those belong in the Risk Assessment Report, not here.
`;
}

function buildPrivacyPolicyPrompt(vars: any) {
  const { companyLabel, industry } = vars;
  return `
Generate a professional, publishable "Privacy Policy" for the following UK company's website. This
is an external, customer-facing legal document explaining to data subjects how their personal data
is handled. It must NOT reference any internal compliance gaps, scores, or risk findings — those are
completely irrelevant here. Do NOT use placeholders — use the real company name given.

COMPANY DETAILS
- Company name: ${companyLabel}
- Industry: ${industry || "not specified"}

STRUCTURE:
## INTRODUCTION
Who the company is and that this policy explains how it handles personal data, in plain terms.

## WHAT DATA WE COLLECT
A realistic list of data types a company in this industry would typically collect (e.g. contact
details, account information, and industry-appropriate examples).

## HOW WE USE YOUR DATA
Plain-language explanation of the purposes data is used for.

## LEGAL BASIS FOR PROCESSING
Briefly note the relevant UK GDPR legal bases likely to apply (e.g. consent, contract, legitimate
interests) in plain terms, without overclaiming certainty about which applies to every case.

## DATA RETENTION
General plain-language statement that data is kept only as long as necessary for the purposes
described, and is reviewed periodically.

## YOUR RIGHTS
Plain-language summary of UK GDPR data subject rights (access, rectification, erasure, restriction,
portability, objection).

## CONTACT US
A generic placeholder line inviting the reader to contact the company's data protection contact,
without inventing a specific name or email (use "please contact us via the details on our website").

RULES:
- Written entirely in plain, customer-facing language — no compliance jargon, no internal audit
  language, no reference to any assessment or score.
- This must genuinely be usable, close to as-is, as a real published privacy policy.
- No disclaimers about legal advice needed beyond a brief closing note that this is a template and
  should be reviewed by a qualified professional before publishing.
`;
}

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

    const category = getDocCategory(type);

    const vars = {
      type,
      companyLabel,
      industry,
      employees,
      complianceScore,
      totalGaps,
      gdprIssues,
      authIssues,
      securityIssues,
    };

    let prompt: string;
    if (category === "risk_report") prompt = buildRiskReportPrompt(vars);
    else if (category === "plan") prompt = buildPlanPrompt(vars);
    else if (category === "privacy_policy") prompt = buildPrivacyPolicyPrompt(vars);
    else prompt = buildPolicyPrompt(vars);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a professional UK GDPR and security compliance analyst. You write specific, evidence-based, correctly structured compliance documents. You never use placeholder text, never invent generic content unrelated to what you're given, and always match the actual structure and purpose of the specific document type requested.",
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
