"use client";

import { useEffect, useState } from "react";

export default function MonthlyReport() {
  const [score, setScore] = useState("0");
  const [gdpr, setGdpr] = useState("0");
  const [auth, setAuth] = useState("0");
  const [security, setSecurity] = useState("0");
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [narrative, setNarrative] = useState("");
  const [loadingNarrative, setLoadingNarrative] = useState(false);

  useEffect(() => {
    const savedScore = localStorage.getItem("complianceScore") || "0";
    const savedName = localStorage.getItem("businessName") || "";
    const savedIndustry = localStorage.getItem("industry") || "";

    const savedGdprArr = JSON.parse(localStorage.getItem("gdprIssues") || "[]");
    const savedAuthArr = JSON.parse(localStorage.getItem("authIssues") || "[]");
    const savedSecurityArr = JSON.parse(localStorage.getItem("securityIssues") || "[]");

    setScore(savedScore);
    setName(savedName);
    setIndustry(savedIndustry);
    setGdpr(String(savedGdprArr.length));
    setAuth(String(savedAuthArr.length));
    setSecurity(String(savedSecurityArr.length));

    async function generateNarrative() {
      setLoadingNarrative(true);
      try {
        const res = await fetch("/api/monthly-summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            businessName: savedName,
            industry: savedIndustry,
            complianceScore: savedScore,
            gdprIssues: savedGdprArr,
            authIssues: savedAuthArr,
            securityIssues: savedSecurityArr,
          }),
        });
        const data = await res.json();
        setNarrative(data.summary || "");
      } catch (err) {
        console.error(err);
      }
      setLoadingNarrative(false);
    }

    generateNarrative();
  }, []);

  const issues = Number(gdpr) + Number(auth) + Number(security);

  const completedTasks =
    typeof window !== "undefined"
      ? Number(localStorage.getItem("completedTasks") || 0)
      : 0;

  const upcomingReviews = issues === 0 ? 0 : Math.min(issues, 3);

  function getStatus(s) {
    if (s >= 90) return "Strong Compliance Posture";
    if (s >= 70) return "Moderate Risk — Action Recommended";
    if (s >= 40) return "Elevated Risk — Attention Needed";
    return "High Risk — Immediate Action Needed";
  }
  const status = getStatus(Number(score));

  const month = new Date().toLocaleString("default", { month: "long" });

  const handleDownload = () => {
    const text = `
Monthly Report - ${month}
Business: ${name || "Business"}
Industry: ${industry || "Not set"}
Score: ${score}%
Status: ${status}
Issues: ${issues}
Tasks Completed: ${completedTasks}
Upcoming Reviews: ${upcomingReviews}

Summary:
${narrative || "Summary not available."}
    `;

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "monthly-report.txt";
    a.click();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "36px",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              margin: 0,
              color: "#0f172a",
            }}
          >
            Monthly Report - {month}
          </h1>
          <p
            style={{
              marginTop: "10px",
              color: "#64748b",
              fontSize: "16px",
            }}
          >
            {name
              ? `${name}${industry ? ` • ${industry}` : ""} compliance summary`
              : "Compliance summary and report overview"}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "24px",
            marginBottom: "24px",
          }}
        >
          <div style={cardStyle}>
            <p style={labelStyle}>Compliance Score</p>
            <h2 style={valueStyle}>{score}%</h2>
            <p style={subtleStyle}>Overall readiness</p>
          </div>

          <div style={cardStyle}>
            <p style={labelStyle}>Status</p>
            <h2 style={{ ...valueStyle, fontSize: "22px" }}>{status}</h2>
            <p style={subtleStyle}>Based on self-assessment, not a legal determination</p>
          </div>

          <div style={cardStyle}>
            <p style={labelStyle}>Issues Found</p>
            <h2 style={valueStyle}>{issues}</h2>
            <p style={subtleStyle}>Open findings across categories</p>
          </div>

          <div style={cardStyle}>
            <p style={labelStyle}>Tasks Completed</p>
            <h2 style={valueStyle}>{completedTasks}</h2>
            <p style={subtleStyle}>Completed compliance actions</p>
          </div>
        </div>

        <div
          style={{
            ...cardStyle,
            marginBottom: "24px",
          }}
        >
          <h3 style={sectionTitle}>Monthly Summary</h3>
          <div style={{ marginTop: "18px", fontSize: "14px", color: "#334155", lineHeight: 1.6 }}>
            {loadingNarrative && <p>Generating summary...</p>}
            {!loadingNarrative && narrative && <p>{narrative}</p>}
            {!loadingNarrative && !narrative && (
              <p style={subtleStyle}>Summary not available.</p>
            )}
          </div>
        </div>

        <div
          style={{
            ...cardStyle,
            marginBottom: "24px",
          }}
        >
          <h3 style={sectionTitle}>Upcoming Reviews</h3>
          <div style={{ marginTop: "18px" }}>
            <div style={rowStyle}>
              <span>Reviews Due Soon</span>
              <strong>{upcomingReviews}</strong>
            </div>
          </div>
        </div>

        <button onClick={handleDownload} style={primaryButtonStyle}>
          Download Report
        </button>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "20px",
  padding: "28px",
  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
};

const labelStyle = {
  margin: 0,
  fontSize: "14px",
  fontWeight: 600,
  color: "#64748b",
};

const valueStyle = {
  margin: "10px 0 8px 0",
  fontSize: "32px",
  fontWeight: 800,
  letterSpacing: "-0.03em",
  color: "#0f172a",
};

const subtleStyle = {
  margin: 0,
  fontSize: "13px",
  color: "#94a3b8",
};

const sectionTitle = {
  margin: 0,
  fontSize: "20px",
  fontWeight: 700,
  color: "#0f172a",
};

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "14px",
  color: "#334155",
};

const primaryButtonStyle = {
  background: "#0f172a",
  color: "#ffffff",
  border: "none",
  padding: "14px 18px",
  borderRadius: "10px",
  fontWeight: 700,
  fontSize: "14px",
  cursor: "pointer",
};
