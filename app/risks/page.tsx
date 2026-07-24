"use client"
import { useEffect, useState } from "react"

export default function RisksPage() {
  const [gdprRisks, setGdprRisks] = useState<string[]>([])
  const [authRisks, setAuthRisks] = useState<string[]>([])
  const [securityRisks, setSecurityRisks] = useState<string[]>([])

  useEffect(() => {
    const gdpr = JSON.parse(localStorage.getItem("gdprIssues") || "[]")
    const auth = JSON.parse(localStorage.getItem("authIssues") || "[]")
    const security = JSON.parse(localStorage.getItem("securityIssues") || "[]")
    setGdprRisks(gdpr)
    setAuthRisks(auth)
    setSecurityRisks(security)
  }, [])

  const totalRisks = gdprRisks.length + authRisks.length + securityRisks.length

  const categories = [
    { label: "GDPR / Data Protection", items: gdprRisks, color: "#dc2626", bg: "#fef2f2" },
    { label: "Authentication", items: authRisks, color: "#d97706", bg: "#fffbeb" },
    { label: "Security Controls", items: securityRisks, color: "#2563eb", bg: "#eff6ff" },
  ]

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 800, margin: 0, letterSpacing: "-0.03em" }}>
          Open Risks
        </h1>
        <p style={{ marginTop: "10px", color: "#64748b", fontSize: "16px" }}>
          {totalRisks > 0
            ? `${totalRisks} open finding${totalRisks === 1 ? "" : "s"} identified in your latest self-assessment`
            : "No active risks identified"}
        </p>
      </div>

      {totalRisks === 0 && (
        <div
          style={{
            padding: "20px",
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: "12px",
            color: "#166534",
          }}
        >
          No open risks identified in your current self-assessment. Run a new assessment any time
          your setup changes to keep this up to date.
        </div>
      )}

      {categories.map(
        (cat) =>
          cat.items.length > 0 && (
            <div key={cat.label} style={{ marginBottom: "28px" }}>
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: cat.color,
                  marginBottom: "12px",
                }}
              >
                {cat.label} ({cat.items.length})
              </h2>
              <div style={{ display: "grid", gap: "10px" }}>
                {cat.items.map((risk, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "16px",
                      background: cat.bg,
                      borderRadius: "10px",
                      border: `1px solid ${cat.color}22`,
                      color: "#1f2937",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {risk}
                  </div>
                ))}
              </div>
            </div>
          )
      )}
    </div>
  )
}
