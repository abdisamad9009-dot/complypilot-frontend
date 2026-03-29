"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [score, setScore] = useState("0");
  const [gdpr, setGdpr] = useState("0");
  const [auth, setAuth] = useState("0");
  const [security, setSecurity] = useState("0");
  const [total, setTotal] = useState("0");

  // ✅ ADDED
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlScore = params.get("score") || "0";
    const urlGdpr = params.get("gdpr") || "0";
    const urlAuth = params.get("auth") || "0";
    const urlSecurity = params.get("security") || "0";
    const urlTotal = params.get("total") || "0";

    setGdpr(urlGdpr);
    setAuth(urlAuth);
    setSecurity(urlSecurity);
    setTotal(urlTotal);

    const savedScore = localStorage.getItem("complianceScore");
    if (savedScore) {
      setScore(savedScore);
    } else {
      setScore(urlScore);
      localStorage.setItem("complianceScore", urlScore);
    }

    // ✅ LOAD BUSINESS DATA
    setName(localStorage.getItem("businessName") || "");
    setIndustry(localStorage.getItem("industry") || "");
  }, []);

  const updateScore = () => {
    setScore((prev) => {
      const newScore = (Number(prev) + 2).toString();
      localStorage.setItem("complianceScore", newScore);
      return newScore;
    });
  };

const employees = localStorage.getItem("employees")

let sizeMultiplier = 1
if (employees === "1-10") sizeMultiplier = 0.3
if (employees === "11-50") sizeMultiplier = 0.6
if (employees === "51-200") sizeMultiplier = 1
if (employees === "200+") sizeMultiplier = 1.5

const gdprExposure = Number(gdpr) * 2000000 * sizeMultiplier * 0.1
const authExposure = Number(auth) * 50000 * sizeMultiplier * 0.5
const securityExposure = Number(security) * 75000 * sizeMultiplier * 0.5

const totalExposure = gdprExposure + authExposure + securityExposure

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
          {/* ✅ DYNAMIC NAME */}
          {name ? `${name} Dashboard` : "Compliance Dashboard"}
        </h1>

        <p
          style={{
            marginTop: "10px",
            color: "#64748b",
            fontSize: "16px",
          }}
        >
          {/* ✅ DYNAMIC INDUSTRY */}
          {industry
            ? `${industry} • Monitor compliance score, financial exposure, risks, and next actions.`
            : "Monitor compliance score, financial exposure, risks, and next actions."}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
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
          <p style={labelStyle}>GDPR Issues</p>
          <h2 style={valueStyle}>{gdpr}</h2>
          <p style={subtleStyle}>Data protection findings</p>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>Auth Issues</p>
          <h2 style={valueStyle}>{auth}</h2>
          <p style={subtleStyle}>Authentication weaknesses</p>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>Security Issues</p>
          <h2 style={valueStyle}>{security}</h2>
          <p style={subtleStyle}>Security control gaps</p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: "24px",
          marginBottom: "24px",
        }}
      >
        <div style={cardStyle}>
          <h3 style={sectionTitle}>Financial Risk Exposure</h3>

          <div style={{ display: "grid", gap: "12px", marginTop: "18px" }}>
            <div style={rowStyle}>
              <span>GDPR Violations</span>
              <strong>£{gdprExposure.toLocaleString()}</strong>
            </div>

            <div style={rowStyle}>
              <span>Authentication Violations</span>
              <strong>£{authExposure.toLocaleString()}</strong>
            </div>

            <div style={rowStyle}>
              <span>Security Violations</span>
              <strong>£{securityExposure.toLocaleString()}</strong>
            </div>

            <div
              style={{
                ...rowStyle,
                marginTop: "8px",
                borderTop: "1px solid #e2e8f0",
                paddingTop: "16px",
              }}
            >
              <span>Total Exposure</span>
              <strong>£{totalExposure.toLocaleString()}</strong>
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={sectionTitle}>Actions</h3>

          <div style={{ display: "grid", gap: "12px", marginTop: "18px" }}>
            <Link href="/assessment" style={{ textDecoration: "none" }}>
              <button style={primaryButtonStyle} onClick={updateScore}>
                Run Assessment
              </button>
            </Link>

            <Link href="/tasks" style={{ textDecoration: "none" }}>
              <button style={secondaryButtonStyle}>
                View Compliance Tasks
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div style={cardStyle}>
        <h3 style={sectionTitle}>Open Risks</h3>

        <div style={{ display: "grid", gap: "12px", marginTop: "18px" }}>
          {Number(gdpr) > 0 && (
            <div style={riskItemStyle}>Customer data protection risk</div>
          )}
          {Number(auth) > 0 && (
            <div style={riskItemStyle}>Weak authentication controls</div>
          )}
          {Number(security) > 0 && (
            <div style={riskItemStyle}>Security monitoring gaps</div>
          )}

          {Number(gdpr) === 0 &&
            Number(auth) === 0 &&
            Number(security) === 0 && (
              <div style={riskItemStyle}>No active risks identified</div>
            )}
        </div>
      </div>
    </div>
  );
}

// ✅ DO NOT REMOVE — REQUIRED STYLES
const cardStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "20px",
  padding: "28px",
  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
};

const labelStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "14px",
  fontWeight: 600,
  color: "#64748b",
};

const valueStyle: React.CSSProperties = {
  margin: "10px 0 8px 0",
  fontSize: "36px",
  fontWeight: 800,
  letterSpacing: "-0.03em",
  color: "#0f172a",
};

const subtleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "13px",
  color: "#94a3b8",
};

const sectionTitle: React.CSSProperties = {
  margin: 0,
  fontSize: "20px",
  fontWeight: 700,
  color: "#0f172a",
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "14px",
  color: "#334155",
};

const riskItemStyle: React.CSSProperties = {
  padding: "14px 16px",
  borderRadius: "14px",
  border: "1px solid #e2e8f0",
  background: "#ffffff",
  color: "#334155",
  fontWeight: 500,
};

const primaryButtonStyle: React.CSSProperties = {
  width: "100%",
  background: "#0f172a",
  color: "#ffffff",
  border: "none",
  padding: "12px",
  borderRadius: "10px",
  fontWeight: 700,
  fontSize: "14px",
  cursor: "pointer",
};

const secondaryButtonStyle: React.CSSProperties = {
  width: "100%",
  background: "#ffffff",
  color: "#0f172a",
  border: "1px solid #cbd5e1",
  padding: "12px",
  borderRadius: "10px",
  fontWeight: 700,
  fontSize: "14px",
  cursor: "pointer",
};
