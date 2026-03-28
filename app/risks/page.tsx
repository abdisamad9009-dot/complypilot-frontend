"use client"
import { useEffect, useState } from "react"

export default function RisksPage() {
  const [allRisks, setAllRisks] = useState<any[]>([])

  useEffect(() => {
    const gdpr = JSON.parse(localStorage.getItem("gdprIssues") || "[]")
    const auth = JSON.parse(localStorage.getItem("authIssues") || "[]")
    const security = JSON.parse(localStorage.getItem("securityIssues") || "[]")

    const combined = [
      ...gdpr.map((i: number) => `GDPR Issue #${i + 1}`),
      ...auth.map((i: number) => `Auth Issue #${i + 1}`),
      ...security.map((i: number) => `Security Issue #${i + 1}`),
    ]

    setAllRisks(combined)
  }, [])

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Open Risks
      </h1>

      {allRisks.length === 0 ? (
        <p>No active risks identified</p>
      ) : (
        allRisks.map((risk, i) => (
          <div
            key={i}
            style={{
              padding: "14px",
              background: "#f9fafb",
              marginBottom: "12px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
            }}
          >
            {risk}
          </div>
        ))
      )}
    </div>
  )
}
