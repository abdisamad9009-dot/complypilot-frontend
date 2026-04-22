"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Documents() {
  const router = useRouter();

  const [docs, setDocs] = useState<{
    title: string;
    desc: string;
    status: string;
    lastGenerated: Date | null;
    nextDue: Date | null;
  }[]>([
    {
      title: "Information Security Policy",
      desc: "Define security controls, responsibilities, and internal policies.",
      status: "Not Generated",
      lastGenerated: null,
      nextDue: null,
    },
    {
      title: "Risk Assessment Report",
      desc: "Identify, evaluate, and prioritise organisational risks.",
      status: "Not Generated",
      lastGenerated: null,
      nextDue: null,
    },
    {
      title: "GDPR Compliance Policy",
      desc: "Ensure compliance with data protection and privacy regulations.",
      status: "Not Generated",
      lastGenerated: null,
      nextDue: null,
    },
    {
      title: "Privacy Policy",
      desc: "Set out how personal data is collected, used, and protected.",
      status: "Not Generated",
      lastGenerated: null,
      nextDue: null,
    },
    {
      title: "Data Retention Policy",
      desc: "Define how long company and customer data should be stored.",
      status: "Not Generated",
      lastGenerated: null,
      nextDue: null,
    },
    {
      title: "Incident Response Plan",
      desc: "Outline actions during a security or compliance incident.",
      status: "Not Generated",
      lastGenerated: null,
      nextDue: null,
    },
    {
      title: "Access Control Policy",
      desc: "Define user access levels and role-based permissions.",
      status: "Not Generated",
      lastGenerated: null,
      nextDue: null,
    },
    {
      title: "Acceptable Use Policy",
      desc: "Define acceptable use of systems, devices, and data.",
      status: "Not Generated",
      lastGenerated: null,
      nextDue: null,
    },
    {
      title: "Business Continuity Plan",
      desc: "Ensure operations continue during disruptions.",
      status: "Not Generated",
      lastGenerated: null,
      nextDue: null,
    },
    {
      title: "Vendor Risk Policy",
      desc: "Assess and manage third-party risks.",
      status: "Not Generated",
      lastGenerated: null,
      nextDue: null,
    },
    {
      title: "Encryption Policy",
      desc: "Define encryption standards for data protection.",
      status: "Not Generated",
      lastGenerated: null,
      nextDue: null,
    },
    {
      title: "Data Breach Response Policy",
      desc: "Outline steps for handling and reporting data breaches.",
      status: "Not Generated",
      lastGenerated: null,
      nextDue: null,
    },
  ]);

  const generateDoc = (index: number) => {
    const updatedDocs = [...docs];
    const now = new Date();
    const next = new Date();
    next.setDate(now.getDate() + 14);
    updatedDocs[index].status = "Completed";
    updatedDocs[index].lastGenerated = now;
    updatedDocs[index].nextDue = next;
    setDocs(updatedDocs);
    router.push(`/chat?type=${encodeURIComponent(updatedDocs[index].title)}`);
  };

  const downloadDoc = (title: string) => {
    const content = `${title}\n\nThis document was generated automatically.`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}.txt`;
    a.click();
  };

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: "36px",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          Document Generation
        </h1>
        <p
          style={{
            marginTop: "10px",
            color: "#64748b",
            fontSize: "16px",
          }}
        >
          Generate and manage compliance documents.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "24px",
        }}
      >
        {docs.map((doc, index) => (
          <div
            key={doc.title}
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "20px",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "260px",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
              transition: "all 0.2s ease",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "20px",
                  fontWeight: 700,
                }}
              >
                {doc.title}
              </h2>
              <p
                style={{
                  marginTop: "12px",
                  color: "#64748b",
                  fontSize: "14px",
                  lineHeight: 1.6,
                }}
              >
                {doc.desc}
              </p>
            </div>

            <div style={{ marginTop: "18px" }}>
              {doc.status === "Completed" ? (
                <>
                  <span
                    style={{
                      background: "#DCFCE7",
                      color: "#166534",
                      padding: "6px 12px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: 600,
                      display: "inline-block",
                    }}
                  >
                    Completed
                  </span>

                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6B7280",
                      marginTop: "8px",
                    }}
                  >
                    Last generated:{" "}
                    {doc.lastGenerated
                      ? new Date(doc.lastGenerated).toLocaleDateString()
                      : "Not generated"}
                  </p>

                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6B7280",
                    }}
                  >
                    Next due:{" "}
                    {doc.nextDue
                      ? new Date(doc.nextDue).toLocaleDateString()
                      : "No due date"}
                  </p>

                  <button
                    onClick={() => downloadDoc(doc.title)}
                    style={{
                      marginTop: "10px",
                      width: "100%",
                      background: "#16a34a",
                      color: "#ffffff",
                      border: "none",
                      padding: "10px",
                      borderRadius: "8px",
                      fontWeight: 600,
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    Download
                  </button>
                </>
              ) : (
                <span
                  style={{
                    background: "#f1f5f9",
                    color: "#334155",
                    padding: "6px 12px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: 600,
                    display: "inline-block",
                  }}
                >
                  Not Generated
                </span>
              )}
            </div>

            <button
              onClick={() => generateDoc(index)}
              style={{
                marginTop: "18px",
                width: "100%",
                background: "#0f172a",
                color: "#ffffff",
                border: "none",
                padding: "12px",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              {doc.status === "Completed"
                ? "Regenerate"
                : "Generate with AI"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
