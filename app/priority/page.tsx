"use client"
import { useEffect, useState } from "react"

export default function PriorityPage() {
  const [priority, setPriority] = useState<{ type: string; text: string }[]>([])
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    const gdpr = JSON.parse(localStorage.getItem("gdprIssues") || "[]")
    const auth = JSON.parse(localStorage.getItem("authIssues") || "[]")
    const security = JSON.parse(localStorage.getItem("securityIssues") || "[]")

    const allIssues = [
      ...gdpr.map((text: string) => ({ type: "GDPR", text })),
      ...auth.map((text: string) => ({ type: "Authentication", text })),
      ...security.map((text: string) => ({ type: "Security", text })),
    ]

    setTotalCount(allIssues.length)
    setPriority(allIssues.slice(0, 5))
  }, [])

  const typeColor: Record<string, string> = {
    GDPR: "#dc2626",
    Authentication: "#d97706",
    Security: "#2563eb",
  }

  const rationale: Record<string, string> = {
    GDPR: "Prioritized first — direct regulatory exposure under UK GDPR.",
    Authentication: "Prioritized next — governs who can access sensitive systems and data.",
    Security: "Addresses underlying technical controls that reduce breach likelihood.",
  }

  return (
    <div className="p-8 space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold" style={{ letterSpacing: "-0.03em" }}>
          Priority Actions
        </h1>
        <p className="text-black/50 mt-2 text-sm">
          {totalCount > 0
            ? `Top ${Math.min(5, totalCount)} of ${totalCount} findings, ranked by regulatory and security impact`
            : "No priority actions right now"}
        </p>
      </div>

      <div className="bg-white border border-black/10 rounded-xl p-6">
        {priority.length === 0 ? (
          <p className="text-black/60">
            No open findings identified in your current self-assessment.
          </p>
        ) : (
          <div className="space-y-3">
            {priority.map((issue, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                  padding: "14px",
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                  background: "#f9fafb",
                }}
              >
                <div
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    background: "#0f172a",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {index + 1}
                </div>
                <div>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: typeColor[issue.type],
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {issue.type}
                  </span>
                  <p style={{ margin: "4px 0 0 0", color: "#1f2937", fontSize: "14px" }}>
                    {issue.text}
                  </p>
                  <p style={{ margin: "4px 0 0 0", color: "#94a3b8", fontSize: "12px" }}>
                    {rationale[issue.type]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
