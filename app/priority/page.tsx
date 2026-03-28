"use client"
import { useEffect, useState } from "react"

export default function PriorityPage() {
  const [priority, setPriority] = useState<any[]>([])

  useEffect(() => {
    const gdpr = JSON.parse(localStorage.getItem("gdprIssues") || "[]")
    const auth = JSON.parse(localStorage.getItem("authIssues") || "[]")
    const security = JSON.parse(localStorage.getItem("securityIssues") || "[]")

    const allIssues = [
      ...gdpr.map((i: number) => ({ type: "GDPR", id: i })),
      ...auth.map((i: number) => ({ type: "Auth", id: i })),
      ...security.map((i: number) => ({ type: "Security", id: i })),
    ]

    setPriority(allIssues.slice(0, 5)) // top 5 only
  }, [])

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">
        Priority Steps
      </h1>

      <div className="bg-white border border-black/10 rounded-xl p-6">
        <ul className="space-y-3 text-black/80">
          {priority.length === 0 ? (
            <li>No priority issues </li>
          ) : (
            priority.map((issue, index) => (
              <li key={index}>
                ✅ {issue.type} Issue #{issue.id + 1}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}
