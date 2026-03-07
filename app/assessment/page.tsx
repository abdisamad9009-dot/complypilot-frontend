"use client"

import { useState } from "react"

export default function AssessmentPage() {
  const [company, setCompany] = useState("")

  const handleSubmit = (e: any) => {
    e.preventDefault()
    alert("Assessment submitted")
  }

  return (
    <div className="p-8 space-y-6">

      <h1 className="text-3xl font-bold">
        Compliance Assessment
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Company Name"
          className="border p-3 rounded w-full"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Run Assessment
        </button>

      </form>

    </div>
  )
}
