"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function Dashboard() {
  const [score, setScore] = useState("0");
  const [gdpr, setGdpr] = useState("0");
  const [auth, setAuth] = useState("0");
  const [security, setSecurity] = useState("0");
  const [total, setTotal] = useState("0");
  
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [employees, setEmployees] = useState(""); // 

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

    setName(localStorage.getItem("businessName") || "");
    setIndustry(localStorage.getItem("industry") || "");
    setEmployees(localStorage.getItem("employees") || ""); 
  }, []);

  const updateScore = () => {
    setScore((prev) => {
      const newScore = (Number(prev) + 2).toString();
      localStorage.setItem("complianceScore", newScore);
      return newScore;
    });
  };
  
  let sizeMultiplier = 0.5;
  if (employees === "1-10") sizeMultiplier = 0.3;
  if (employees === "11-50") sizeMultiplier = 0.6;
  if (employees === "51-200") sizeMultiplier = 1;
  if (employees === "200+") sizeMultiplier = 1.5;

  // ✅ NEW LOGIC (fixed, no duplicates)
  let completedTaskIds = [];
  if (typeof window !== "undefined") {
    completedTaskIds = JSON.parse(localStorage.getItem("completedTaskIds") || "[]");
  }

  // assume each issue = 1 task id (simple mapping for now)
  const adjustedGdpr = Math.max(Number(gdpr) - completedTaskIds.filter(id => id.includes("gdpr")).length, 0);
  const adjustedAuth = Math.max(Number(auth) - completedTaskIds.filter(id => id.includes("auth")).length, 0);
  const adjustedSecurity = Math.max(Number(security) - completedTaskIds.filter(id => id.includes("security")).length, 0);

  const gdprExposure = adjustedGdpr * 2000000 * sizeMultiplier * 0.1;
  const authExposure = adjustedAuth * 50000 * sizeMultiplier * 0.5;
  const securityExposure = adjustedSecurity * 75000 * sizeMultiplier * 0.5;

  const totalExposure = gdprExposure + authExposure + securityExposure;

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
          {name ? `${name} Dashboard` : "Compliance Dashboard"}
        </h1>
        <p
          style={{
            marginTop: "10px",
            color: "#64748b",
            fontSize: "16px",
          }}
        >
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
          <h2 style={valueStyle}>{adjustedGdpr}</h2>
          <p style={subtleStyle}>Data protection findings</p>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>Auth Issues</p>
          <h2 style={valueStyle}>{adjustedAuth}</h2>
          <p style={subtleStyle}>Authentication weaknesses</p>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>Security Issues</p>
          <h2 style={valueStyle}>{adjustedSecurity}</h2>
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
          {adjustedGdpr > 0 && (
            <div style={riskItemStyle}>Customer data protection risk</div>
          )}
          {adjustedAuth > 0 && (
            <div style={riskItemStyle}>Weak authentication controls</div>
          )}
          {adjustedSecurity > 0 && (
            <div style={riskItemStyle}>Security monitoring gaps</div>
          )}
          {adjustedGdpr === 0 &&
            adjustedAuth === 0 &&
            adjustedSecurity === 0 && (
              <div style={riskItemStyle}>No active risks identified</div>
            )}
        </div>
      </div>
    </div>
  );
}
