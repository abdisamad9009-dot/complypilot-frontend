"use client"
import { useEffect, useState } from "react"

type Category = "gdpr" | "auth" | "security"

type TaskItem = {
  text: string
  category: Category
  remediation: string
}

const CATEGORY_WEIGHT: Record<Category, number> = {
  gdpr: 3,
  auth: 2,
  security: 1,
}

const TOTAL_WEIGHT = 64 // matches the assessment: 10*3 + 8*2 + 18*1

const CATEGORY_STYLE: Record<Category, { label: string; color: string; bg: string }> = {
  gdpr: { label: "GDPR", color: "#dc2626", bg: "#fef2f2" },
  auth: { label: "Authentication", color: "#d97706", bg: "#fffbeb" },
  security: { label: "Security", color: "#2563eb", bg: "#eff6ff" },
}

function getRemediation(text: string): string {
  const t = text.toLowerCase()

  if (t.includes("privacy policy")) return "Draft and publish a GDPR-compliant privacy policy on your website."
  if (t.includes("breach response plan")) return "Create a documented data breach response plan covering detection, containment, and notification."
  if (t.includes("subject access request")) return "Set up a process to respond to Subject Access Requests within the statutory one-month deadline."
  if (t.includes("data processing agreements")) return "Put signed Data Processing Agreements in place with all third-party vendors and processors."
  if (t.includes("impact assessment")) return "Introduce a Data Protection Impact Assessment process for high-risk processing activities."
  if (t.includes("records of processing")) return "Create and maintain an Article 30 record of processing activities."
  if (t.includes("lawful basis")) return "Document the lawful basis relied on for each type of personal data you process."
  if (t.includes("transfers outside")) return "Put appropriate safeguards in place for any personal data transfers outside the UK or EEA."
  if (t.includes("cookie consent")) return "Add a compliant cookie consent tool to your website."
  if (t.includes("data protection officer")) return "Appoint a Data Protection Officer or nominate a privacy lead."

  if (t.includes("multi-factor")) return "Enable multi-factor authentication across all company systems."
  if (t.includes("password requirements")) return "Enforce a strong password policy across all accounts."
  if (t.includes("least privilege")) return "Review system access and apply the principle of least privilege."
  if (t.includes("when someone leaves")) return "Create a formal offboarding checklist to revoke access immediately when someone leaves."
  if (t.includes("privileged user")) return "Set up monitoring and logging for privileged user activity."
  if (t.includes("administrative access")) return "Restrict administrative access to only those who genuinely need it."
  if (t.includes("access reviews")) return "Schedule periodic reviews of who has access to what."
  if (t.includes("unused and inactive")) return "Audit and disable or delete unused and inactive user accounts."

  if (t.includes("encrypt sensitive data")) return "Implement encryption (e.g. AES-256) for sensitive data at rest."
  if (t.includes("https")) return "Ensure HTTPS is enforced across your website and services."
  if (t.includes("encrypt backups")) return "Enable encryption for all data backups."
  if (t.includes("rotate encryption")) return "Implement a regular key rotation schedule for encryption keys."
  if (t.includes("security updates")) return "Set up a regular schedule for applying software and security updates."
  if (t.includes("patch management")) return "Document a formal patch management process."
  if (t.includes("firewall")) return "Deploy firewall protection across your network."
  if (t.includes("antivirus")) return "Install antivirus or endpoint protection on all company devices."
  if (t.includes("vulnerability scans")) return "Schedule regular vulnerability scans of your systems."
  if (t.includes("penetration testing")) return "Commission an annual penetration test."
  if (t.includes("awareness training")) return "Roll out security awareness training, including phishing simulations, for all staff."
  if (t.includes("back up company data")) return "Set up regular automated backups of company data."
  if (t.includes("test backup restoration")) return "Regularly test that backups can actually be restored."
  if (t.includes("disaster recovery")) return "Create a documented disaster recovery plan."
  if (t.includes("api endpoints")) return "Secure API endpoints with authentication and rate limiting."
  if (t.includes("development, testing, and production")) return "Separate development, testing, and production environments."
  if (t.includes("unauthorized access")) return "Implement monitoring and alerting for unauthorized access attempts."
  if (t.includes("risk register")) return "Create and maintain a risk register to track identified risks."

  return "Review and resolve this finding."
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<TaskItem[]>([])
  const [completedCount, setCompletedCount] = useState(0)

  useEffect(() => {
    loadTasks()
  }, [])

  function loadTasks() {
    const gdpr: string[] = JSON.parse(localStorage.getItem("gdprIssues") || "[]")
    const auth: string[] = JSON.parse(localStorage.getItem("authIssues") || "[]")
    const security: string[] = JSON.parse(localStorage.getItem("securityIssues") || "[]")

    const combined: TaskItem[] = [
      ...gdpr.map((text) => ({ text, category: "gdpr" as Category, remediation: getRemediation(text) })),
      ...auth.map((text) => ({ text, category: "auth" as Category, remediation: getRemediation(text) })),
      ...security.map((text) => ({ text, category: "security" as Category, remediation: getRemediation(text) })),
    ]

    setTasks(combined)
    setCompletedCount(Number(localStorage.getItem("completedTasks") || 0))
  }

  function completeTask(taskToRemove: TaskItem) {
    const key =
      taskToRemove.category === "gdpr"
        ? "gdprIssues"
        : taskToRemove.category === "auth"
        ? "authIssues"
        : "securityIssues"

    const current: string[] = JSON.parse(localStorage.getItem(key) || "[]")
    const updated = current.filter((t) => t !== taskToRemove.text)
    localStorage.setItem(key, JSON.stringify(updated))

    const weight = CATEGORY_WEIGHT[taskToRemove.category]
    const currentScore = Number(localStorage.getItem("complianceScore") || "0")
    const increment = Math.round((weight / TOTAL_WEIGHT) * 100)
    const newScore = Math.min(currentScore + increment, 100)
    localStorage.setItem("complianceScore", String(newScore))

    const newCompleted = Number(localStorage.getItem("completedTasks") || 0) + 1
    localStorage.setItem("completedTasks", String(newCompleted))

    loadTasks()
  }

  const totalEver = tasks.length + completedCount
  const progressPct = totalEver > 0 ? Math.round((completedCount / totalEver) * 100) : 0

  const sorted = [...tasks].sort(
    (a, b) => CATEGORY_WEIGHT[b.category] - CATEGORY_WEIGHT[a.category]
  )

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 800, margin: 0 }}>Priority Actions</h1>
        <p style={{ marginTop: "8px", color: "#64748b", fontSize: "14px" }}>
          {totalEver > 0
            ? `${completedCount} of ${totalEver} findings resolved`
            : "No findings to resolve"}
        </p>
      </div>

      {totalEver > 0 && (
        <div
          style={{
            height: "10px",
            borderRadius: "999px",
            background: "#e5e7eb",
            marginBottom: "28px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progressPct}%`,
              background: "#16a34a",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      )}

      {sorted.length === 0 ? (
        <div
          style={{
            padding: "20px",
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: "12px",
            color: "#166534",
          }}
        >
          No open actions right now — nice work.
        </div>
      ) : (
        <div style={{ display: "grid", gap: "12px" }}>
          {sorted.map((task, i) => {
            const style = CATEGORY_STYLE[task.category]
            return (
              <div
                key={i}
                style={{
                  padding: "18px",
                  background: style.bg,
                  border: `1px solid ${style.color}22`,
                  borderRadius: "12px",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: style.color,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {style.label}
                </span>
                <p style={{ margin: "6px 0 4px 0", color: "#1f2937", fontWeight: 600, fontSize: "14px" }}>
                  {task.text}
                </p>
                <p style={{ margin: "0 0 12px 0", color: "#4b5563", fontSize: "13px" }}>
                  {task.remediation}
                </p>
                <button
                  onClick={() => completeTask(task)}
                  style={{
                    padding: "8px 14px",
                    background: "#0f172a",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Mark Resolved
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
