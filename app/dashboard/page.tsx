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

    // ✅ ADDED (load business data)
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

  const gdprExposure = Number(gdpr) * 2000000;
  const authExposure = Number(auth) * 50000;
  const securityExposure = Number(security) * 75000;
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
          {/* ✅ CHANGED TEXT ONLY */}
          {name ? `${name} Dashboard` : "Compliance Dashboard"}
        </h1>

        <p
          style={{
            marginTop: "10px",
            color: "#64748b",
            fontSize: "16px",
          }}
        >
          {/* ✅ CHANGED TEXT ONLY */}
          {industry
            ? `${industry} • Monitor compliance score, financial exposure, risks, and next actions.`
            : "Monitor compliance score, financial exposure, risks, and next actions."}
        </p>
      </div>

      {/* EVERYTHING ELSE UNCHANGED BELOW */}

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
