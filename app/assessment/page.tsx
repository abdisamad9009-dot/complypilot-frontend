"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AssessmentPage() {

  const router = useRouter()

  const [company, setCompany] = useState("")

  const handleSubmit = (e: any) => {
    e.preventDefault()

    // later this will call AI
    console.log("Running compliance assessment for:", company)

    // redirect to dashboard
    router.push("/dashboard")
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
