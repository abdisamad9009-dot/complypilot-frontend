"use client";

import { useEffect, useState } from "react";

export default function MonthlyReport() {
  const [score, setScore] = useState("0");
  const [gdpr, setGdpr] = useState("0");
  const [auth, setAuth] = useState("0");
  const [security, setSecurity] = useState("0");
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");

  useEffect(() => {
    const savedScore = localStorage.getItem("complianceScore") || "0";
    const savedName = localStorage.getItem("businessName") || "";
    const savedIndustry = localStorage.getItem("industry") || "";
    const savedGdpr = localStorage.getItem("gdpr") || "0";
    const savedAuth = localStorage.getItem("auth") || "0";
    const savedSecurity = localStorage.getItem("security") || "0";

    setScore(savedScore);
    setName(savedName);
    setIndustry(savedIndustry);
    setGdpr(savedGdpr);
    setAuth(savedAuth);
    setSecurity(savedSecurity);
  }, []);

  const issues = Number(gdpr) + Number(auth) + Number(security);
  const completedTasks = Math.max(0, Math.floor(Number(score) / 20));
  const upcomingReviews = Number(score) === 100 ? 0 : 2;
  const status = Number(score) >= 80 ? "Fully Compliant" : "Needs Attention";
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
            <h2 style={valueStyle}>{status}</h2>
            <p style={subtleStyle}>Current compliance state</p>
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
