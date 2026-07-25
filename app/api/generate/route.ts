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

const POLICY_FOCUS: Record<string, string> = {
  "Information Security Policy":
    "Focus specifically on technical and access controls: authentication, monitoring, patching, encryption, environment separation, and incident tracking. This is the technical backbone document — be concrete about systems and controls.",
  "GDPR Compliance Policy":
    "Focus specifically on GDPR legal obligations rather than technical controls: lawful basis for processing, data subject rights, data protection by design and default, records of processing activities (Article 30), and when a Data Protection Impact Assessment (Article 35) is required. Only mention technical controls briefly where legally required (e.g. Article 32), and do not duplicate the full technical control list — that belongs in the Information Security Policy, not here.",
  "Data Retention Policy":
    "Focus specifically on how long different categories of data are kept, the criteria for those retention periods, and the process and cadence for reviewing and securely deleting data no longer needed.",
  "Access Control Policy":
    "Focus specifically on who gets access to what: role-based access, the principle of least privilege, joiner/mover/leaver provisioning and deprovisioning, and periodic access reviews.",
  "Acceptable Use Policy":
    "Focus specifically on employee conduct rules for company systems, devices, email, and internet use, including what is and isn't permitted, rather than infrastructure-level security controls.",
  "Vendor Risk Policy":
    "Focus specifically on managing third-party and supplier risk: due diligence before onboarding a vendor, data processing agreements, and ongoing monitoring of vendor security practices.",
  "Encryption Policy":
    "Focus specifically on encryption standards for data at rest and in transit, approved algorithms/methods at a policy level (not implementation detail), and key management practices including rotation.",
};

const PLAN_FOCUS: Record<string, string> = {
  "Incident Response Plan":
    "Focus on the general technical detection, containment, eradication, and recovery process for a security incident of any kind (not limited to personal data breaches).",
  "Data Breach Response Policy":
    "Focus specifically on the legal and regulatory side of a PERSONAL DATA breach under UK GDPR: accurately timed obligations (72-hour ICO notification under Article 33, when individuals must also be informed under Article 34), what must be documented and recorded about the breach, and who is legally responsible for those specific obligations. Keep technical containment steps brief — the emphasis here is notification, documentation, and legal compliance, not technical recovery, which belongs in the Incident Response Plan.",
  "Business Continuity Plan":
    "Focus specifically on maintaining overall business operations during a prolonged disruption (e.g. facility loss, extended outage, major supplier failure) — not limited to a data breach or security incident. Cover alternate ways of operating, recovery time expectations, and how the company keeps functioning while systems are restored.",
};

// Keyword tags used to filter which findings are actually relevant to each
// document type, so the model never has irrelevant findings to reach for.
const DOC_KEYWORDS: Record<string, string[]> = {
  "Information Security Policy": [
    "authentication", "multi-factor", "administrative access", "admin", "encrypt",
    "firewall", "antivirus", "endpoint", "vulnerability", "update", "patch",
    "password", "monitor", "log", "penetration", "api", "https", "cloud",
    "phishing", "unauthorized access",
  ],
  "GDPR Compliance Policy": [
    "privacy policy", "breach response plan", "third-party", "vendor",
    "impact assessment", "records of processing", "lawful basis",
    "transfers outside", "cookie", "data protection officer", "privacy lead",
    "subject access request",
  ],
  "Data Retention Policy": [
    "back up", "backup", "retention",
  ],
  "Access Control Policy": [
    "administrative access", "admin", "multi-factor", "least privilege",
    "when someone leaves", "privileged", "access review", "unused", "inactive",
  ],
  "Acceptable Use Policy": [
    "password", "phishing", "antivirus", "https",
  ],
  "Vendor Risk Policy": [
    "third-party", "vendor", "processors",
  ],
  "Encryption Policy": [
    "encrypt",
  ],
  "Incident Response Plan": [
    "unauthorized access", "monitor", "log", "awareness training", "phishing",
  ],
  "Data Breach Response Policy": [
    "breach response plan", "unauthorized access",
  ],
  "Business Continuity Plan": [
    "backup", "disaster recovery",
  ],
};

function filterRelevantFindings(type: string, allFindings: string[]): string[] {
  const keywords = DOC_KEYWORDS[type];
  if (!keywords) return allFindings;
  return allFindings.filter((finding) =>
    keywords.some((kw) => finding.toLowerCase().includes(kw.toLowerCase()))
  );
}

function getDocCategory(type: string): "risk_report" | "policy" | "plan" | "privacy_policy" {
  if (type === "Risk Assessment Report") return "risk_report";
  if (type === "Privacy Policy") return "privacy_policy";
  if (PLAN_DOCS.includes(type)) return "plan";
  if (POLICY_DOCS.includes(type)) return "policy";
  return "policy"; // sensible default for anything unrecognised
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
  const relevantGaps = filterRelevantFindings(type, allGaps);
  const focus = POLICY_FOCUS[type] || "";
  return `
Generate a professional "${type}" for the following UK company. This is an internal company policy
document — the kind an employee or auditor would read to understand the company's actual rules and
standards. It is NOT a risk report and must not read like one. Do NOT list "findings" or reference
a compliance score. Do NOT use placeholders like [Company Name] — use the real values given.

DOCUMENT FOCUS (important — this document type is distinct from other policies the company may also
generate, so keep to this specific emphasis rather than repeating generic content that belongs in a
different policy):
${focus}

COMPANY DETAILS
- Company name: ${companyLabel}
- Industry: ${industry || "not specified"}
- Company size: ${employees || "not specified"} employees

CONTEXT (for your awareness only — do not reference this list directly or call it out as "gaps" in
the document; weave these in naturally as forward-looking company rules, not references to past
failures. This list has already been filtered to only findings relevant to this document's focus —
do not add unrelated content beyond what's needed to cover these):
${relevantGaps.length ? relevantGaps.map((q: string) => `- ${q}`).join("\n") : "- No specific gaps flagged for this document's focus area"}

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
  const relevantGaps = filterRelevantFindings(type, allGaps);
  const focus = PLAN_FOCUS[type] || "";
  return `
Generate a professional "${type}" for the following UK company. This is a procedural plan document —
a step-by-step guide for what the company actually does when a specific situation occurs. It is NOT
a risk report. Do NOT use placeholders — use the real values given.

DOCUMENT FOCUS (important — this document type is distinct from other plans the company may also
generate, so keep to this specific emphasis rather than repeating generic content that belongs in a
different plan):
${focus}

COMPANY DETAILS
- Company name: ${companyLabel}
- Industry: ${industry || "not specified"}
- Company size: ${employees || "not specified"} employees

CONTEXT (for your awareness only — do not list this as "findings"; weave these in naturally at the
relevant step. This list has already been filtered to only findings relevant to this document's
focus — do not add unrelated content beyond what's needed to cover these):
${relevantGaps.length ? relevantGaps.map((q: string) => `- ${q}`).join("\n") : "- No specific gaps flagged for this document's focus area"}

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
