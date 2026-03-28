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

  function completeTask(index) {
    let gdpr = JSON.parse(localStorage.getItem("gdprIssues") || "[]")
    let auth = JSON.parse(localStorage.getItem("authIssues") || "[]")
    let security = JSON.parse(localStorage.getItem("securityIssues") || "[]")

    let all = [...gdpr, ...auth, ...security]

    all.splice(index, 1)

    const newGdpr = all.filter(r => gdpr.includes(r))
    const newAuth = all.filter(r => auth.includes(r))
    const newSecurity = all.filter(r => security.includes(r))

    localStorage.setItem("gdprIssues", JSON.stringify(newGdpr))
    localStorage.setItem("authIssues", JSON.stringify(newAuth))
    localStorage.setItem("securityIssues", JSON.stringify(newSecurity))

    const currentScore = Number(localStorage.getItem("complianceScore") || "0")
    const newScore = Math.min(currentScore + 2, 100)
    localStorage.setItem("complianceScore", String(newScore))

    window.location.reload()
  }

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

            <button
              onClick={() => completeTask(i)}
              style={{
                marginTop: "10px",
                padding: "6px 12px",
                background: "black",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Mark Complete
            </button>
          </div>
        ))
      )}
    </div>
  )
}
