"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AssessmentPage() {

  const router = useRouter()

  const [industry, setIndustry] = useState("")
  const [employees, setEmployees] = useState("")
  const [customerData, setCustomerData] = useState("")
  const [mfa, setMfa] = useState("")

  function runAssessment() {
    // later this will send data to AI
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-white text-black p-8">

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

        <select
          value={customerData}
          onChange={(e) => setCustomerData(e.target.value)}
          className="border border-black p-2 w-full"
        >
          <option value="">Stores Customer Data?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <select
          value={mfa}
          onChange={(e) => setMfa(e.target.value)}
          className="border border-black p-2 w-full"
        >
          <option value="">Two‑Factor Authentication Enabled?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <button
          onClick={runAssessment}
          className="bg-black text-white px-4 py-2"
        >
          Run Assessment
        </button>

      </div>

    </div>
  )
}
