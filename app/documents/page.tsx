"use client";

import { useRouter } from "next/navigation";

export default function Documents() {
  const router = useRouter();

  const generateDoc = (type: string) => {
    router.push(`/chat?type=${encodeURIComponent(type)}`);
  };

  const docs = [
    {
      title: "Security Policy",
      desc: "Define security controls, responsibilities, and internal policies.",
      status: "Missing",
    },
    {
      title: "Risk Assessment",
      desc: "Identify, evaluate, and prioritise organisational risks.",
      status: "Missing",
    },
    {
      title: "GDPR Policy",
      desc: "Ensure compliance with data protection and privacy regulations.",
      status: "Missing",
    },
  ];

  return (
    <div>
      {/* HEADER */}
      <div style={{ marginBottom: "28px" }}>
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
          Generate compliance documents instantly using AI.
        </p>
      </div>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {docs.map((doc) => (
          <div
            key={doc.title}
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "20px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "220px",
              boxShadow: "0 6px 20px rgba(15, 23, 42, 0.04)",
            }}
          >
            {/* TOP */}
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#0f172a",
                }}
              >
                {doc.title}
              </h2>

              <p
                style={{
                  marginTop: "10px",
                  color: "#64748b",
                  fontSize: "14px",
                  lineHeight: 1.6,
                }}
              >
                {doc.desc}
              </p>
            </div>

            {/* BOTTOM */}
            <div style={{ marginTop: "20px" }}>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#94a3b8",
                  marginBottom: "12px",
                }}
              >
                Status: {doc.status}
              </div>

              <button
                onClick={() => generateDoc(doc.title)}
                style={{
                  width: "100%",
                  background: "#0f172a",
                  color: "#ffffff",
                  border: "none",
                  padding: "12px",
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Generate with AI
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
