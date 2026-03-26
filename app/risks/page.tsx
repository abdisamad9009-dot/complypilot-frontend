"use client"

import { useSearchParams } from "next/navigation"

export default function RisksPage() {
  const searchParams = useSearchParams()

  const gdpr = JSON.parse(decodeURIComponent(searchParams.get("gdprIssues") || "[]"))
  const auth = JSON.parse(decodeURIComponent(searchParams.get("authIssues") || "[]"))
  const security = JSON.parse(decodeURIComponent(searchParams.get("securityIssues") || "[]"))

  const allRisks = [...gdpr, ...auth, ...security]

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
              border: "1px solid #e5e7eb"
            }}
          >
            {risk}
          </div>
        ))
      )}
    </div>
  )
}
