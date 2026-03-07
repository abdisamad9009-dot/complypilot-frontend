"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { useState } from "react"

export default function AssessmentPage() {

  const [industry, setIndustry] = useState("")
  const [employees, setEmployees] = useState("")

  return (

    <DashboardLayout>

      <div className="p-8">

        <h1 className="text-2xl font-bold mb-6">
          Compliance Assessment
        </h1>

        <div className="border border-black p-6 max-w-xl">

          <input
            placeholder="Industry"
            className="border border-black p-2 w-full mb-4"
            onChange={(e)=>setIndustry(e.target.value)}
          />

          <input
            placeholder="Number of Employees"
            className="border border-black p-2 w-full mb-4"
            onChange={(e)=>setEmployees(e.target.value)}
          />

          <button
            className="border border-black px-4 py-2"
          >
            Run Assessment
          </button>

        </div>

      </div>

    </DashboardLayout>
  )
}
