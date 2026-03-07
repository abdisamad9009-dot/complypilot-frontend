"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"

export default function AssessmentPage() {
  const [industry, setIndustry] = useState("")
  const [employees, setEmployees] = useState("")

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">
          Compliance Assessment
        </h1>

        <div className="border border-black p-6 max-w-xl space-y-4">
          
          <input
            type="text"
            placeholder="Industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="border border-black p-2 w-full"
          />

          <input
            type="number"
            placeholder="Number of Employees"
            value={employees}
            onChange={(e) => setEmployees(e.target.value)}
            className="border border-black p-2 w-full"
          />

          <button className="bg-black text-white px-4 py-2 rounded">
            Run Assessment
          </button>

        </div>
      </div>
    </DashboardLayout>
  )
}
