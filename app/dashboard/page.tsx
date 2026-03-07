"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {

  const [score, setScore] = useState("0");
  const [gdpr, setGdpr] = useState("0");
  const [auth, setAuth] = useState("0");
  const [security, setSecurity] = useState("0");
  const [total, setTotal] = useState("0");

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

  }, []);

  const updateScore = () => {
    setScore((prev) => {
      const newScore = (Number(prev) + 2).toString();
      localStorage.setItem("complianceScore", newScore);
      return newScore;
    });
  };

  const gdprExposure = Number(gdpr) * 20000000;
  const authExposure = Number(auth) * 50000;
  const securityExposure = Number(security) * 75000;

  const totalExposure =
    gdprExposure + authExposure + securityExposure;

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>

      <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
        Compliance Dashboard
      </h1>

      {/* Compliance Score */}
      <div style={{ marginTop: "30px" }}>
        <h2>Compliance Score</h2>
        <div style={{ fontSize: "60px", fontWeight: "bold" }}>
          {score}%
        </div>
      </div>

      {/* Run Assessment */}
      <div style={{ marginTop: "20px" }}>
        <Link href="/assessment">
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "black",
              color: "white",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Run Assessment
          </button>
        </Link>
      </div>

      {/* Financial Exposure */}
      <div style={{ marginTop: "40px" }}>
        <h2>Financial Risk Exposure</h2>

        <p>GDPR Violations: £{gdprExposure.toLocaleString()}</p>

        <p>Authentication Violations: £{authExposure.toLocaleString()}</p>

        <p>Security Violations: £{securityExposure.toLocaleString()}</p>

        <h3 style={{ marginTop: "10px" }}>
          Total Exposure: £{totalExposure.toLocaleString()}
        </h3>

      </div>

      {/* Open Risks */}
      <div style={{ marginTop: "40px" }}>
        <h2>Open Risks</h2>

        {Number(gdpr) > 0 && <p>⚠ Customer data protection risk</p>}
        {Number(auth) > 0 && <p>⚠ Weak authentication controls</p>}
        {Number(security) > 0 && <p>⚠ Security monitoring gaps</p>}

      </div>

      {/* Priority Actions */}
      <div style={{ marginTop: "40px" }}>
        <h2>Priority Actions</h2>

        <p>Complete tasks to improve your compliance score.</p>

        <Link href="/tasks">
          <button
            style={{
              marginTop: "10px",
              padding: "10px 16px",
              border: "1px solid black",
              borderRadius: "6px",
              background: "white",
              cursor: "pointer",
            }}
          >
            View Compliance Tasks
          </button>
        </Link>

      </div>

      {/* Task Progress */}
      <div style={{ marginTop: "40px" }}>
        <h2>Task Progress</h2>

        <label>
          <input
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked) updateScore();
            }}
          />
          Enable Multi‑Factor Authentication
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked) updateScore();
            }}
          />
          Encrypt Customer Data
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked) updateScore();
            }}
          />
          Implement Monitoring & Backups
        </label>

      </div>

    </div>
  );
}
