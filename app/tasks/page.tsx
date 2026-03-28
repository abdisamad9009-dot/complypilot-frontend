"use client"
import { useEffect, useState } from "react"

export default function TasksPage() {
  const [actions, setActions] = useState<string[]>([])

  useEffect(() => {
    const gdpr = JSON.parse(localStorage.getItem("gdprIssues") || "[]")
    const auth = JSON.parse(localStorage.getItem("authIssues") || "[]")
    const security = JSON.parse(localStorage.getItem("securityIssues") || "[]")

    const allRisks = [...gdpr, ...auth, ...security]

    const mappedActions = allRisks.map((risk: string) => {
      if (risk.includes("privacy policy")) return "Create and implement a GDPR-compliant privacy policy"
      if (risk.includes("multi-factor")) return "Enable multi-factor authentication across all accounts"
      if (risk.includes("encrypted")) return "Implement encryption for sensitive data"
      if (risk.includes("password")) return "Enforce strong password policies"
      if (risk.includes("monitoring")) return "Set up monitoring for unauthorized access"
      if (risk.includes("firewall")) return "Implement firewall protection"
      return "Review and resolve: " + risk
    })

    setActions(mappedActions)
  }, [])

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Priority Actions
      </h1>

      {actions.length === 0 ? (
        <p>No actions required</p>
      ) : (
        actions.map((action, i) => (
          <div
            key={i}
            style={{
              padding: "14px",
              background: "#ecfdf5",
              marginBottom: "12px",
              borderRadius: "8px",
              border: "1px solid #d1fae5"
            }}
          >
            {action}
          </div>
        ))
      )}
    </div>
  )
}
