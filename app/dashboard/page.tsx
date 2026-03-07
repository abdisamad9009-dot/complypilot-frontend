"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [score, setScore] = useState("0");
  const [gdpr, setGdpr] = useState("0");
  const [auth, setAuth] = useState("0");
  const [security, setSecurity] = useState("0");
  const [total, setTotal] = useState("0");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setScore(params.get("score") || "0");
    setGdpr(params.get("gdpr") || "0");
    setAuth(params.get("auth") || "0");
    setSecurity(params.get("security") || "0");
    setTotal(params.get("total") || "0");
  }, []);

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

      <div style={{ marginTop: "20px" }}>
  <a href="/assessment">
    <button
      style={{
        padding: "10px 20px",
        backgroundColor: "black",
        color: "white",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer"
      }}
    >
      Run Assessment
    </button>
  </a>
</div>

      {/* Financial Exposure */}
      <div style={{ marginTop: "40px" }}>
        <h2>Financial Risk Exposure</h2>

        <p>GDPR Violations: £{gdpr}</p>
        <p>Authentication Violations: £{auth}</p>
        <p>Security Violations: £{security}</p>

        <h3 style={{ marginTop: "10px" }}>
          Total Exposure: £{total}
        </h3>
      </div>

      {/* Open Risks */}
      <div style={{ marginTop: "40px" }}>
        <h2>Open Risks</h2>

        {Number(gdpr) > 0 && <p>⚠️ Customer data protection risk</p>}
        {Number(auth) > 0 && <p>⚠️ Weak authentication controls</p>}
        {Number(security) > 0 && <p>⚠️ Security monitoring gaps</p>}
      </div>

     {/* Priority Actions */}
<div>
  <h2 className="text-xl font-semibold mb-2">
    Priority Actions
  </h2>

  <p className="text-black/60 mb-4">
    Complete these tasks to improve your compliance score.
  </p>

  <Link href="/tasks">
    <button className="border border-black px-4 py-2 rounded">
      View Compliance Tasks
    </button>
  </Link>
</div>
      
<div style={{ marginTop: "40px" }}>
  <h2>Task Progress</h2>

  <label>
    <input
      type="checkbox"
      onChange={(e) => {
        if (e.target.checked) setScore((prev) => Number(prev) + 10);
      }}
    />
    Enable Multi‑Factor Authentication
  </label>

  <br />

  <label>
    <input
      type="checkbox"
      onChange={(e) => {
        if (e.target.checked) setScore((prev) => Number(prev) + 10);
      }}
    />
    Encrypt Customer Data
  </label>

  <br />

  <label>
    <input
      type="checkbox"
      onChange={(e) => {
        if (e.target.checked) setScore((prev) => Number(prev) + 10);
      }}
    />
    Implement Monitoring & Backups
  </label>
</div>
