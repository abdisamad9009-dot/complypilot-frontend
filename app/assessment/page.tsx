"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AssessmentPage() {

  const router = useRouter()

  const [step, setStep] = useState(1)

  const [answers, setAnswers] = useState<{[key:string]: string}>({})

  function updateAnswer(question: string, value: string) {
    setAnswers(prev => ({
      ...prev,
      [question]: value
    }))
  }

  function next() {
    setStep(step + 1)
  }

  function back() {
    setStep(step - 1)
  }

  function runAssessment() {

    let score = 100

    let gdprFine = 0
    let authFine = 0
    let securityFine = 0

    const risky = (q:string) => answers[q] === "no"

    if (risky("customerData")) {
      score -= 10
      gdprFine += 10000
    }

    if (risky("mfa")) {
      score -= 20
      authFine += 10000
    }

    if (risky("encryption")) {
      score -= 20
      gdprFine += 15000
    }

    if (risky("backups")) {
      score -= 10
      securityFine += 5000
    }

    if (risky("incidentPlan")) {
      score -= 10
      securityFine += 5000
    }

    if (risky("monitoring")) {
      score -= 10
      securityFine += 5000
    }

    if (score < 0) score = 0

    const totalFine = gdprFine + authFine + securityFine

    router.push(
      `/dashboard?score=${score}&gdpr=${gdprFine}&auth=${authFine}&security=${securityFine}&total=${totalFine}`
    )
  }

  return (
    <div className="min-h-screen bg-white text-black p-8">

      <h1 className="text-2xl font-bold mb-6">
        Compliance Assessment
      </h1>

      <p className="mb-6">
        Step {step} of 5
      </p>

      <div className="max-w-xl space-y-4">

        {step === 1 && (
          <>
            <select onChange={(e)=>updateAnswer("customerData",e.target.value)} className="border p-2 w-full">
              <option>Do you process customer personal data?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            <select onChange={(e)=>updateAnswer("international",e.target.value)} className="border p-2 w-full">
              <option>Do you operate internationally?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </>
        )}

        {step === 2 && (
          <>
            <select onChange={(e)=>updateAnswer("mfa",e.target.value)} className="border p-2 w-full">
              <option>Do you use Multi‑Factor Authentication?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            <select onChange={(e)=>updateAnswer("passwords",e.target.value)} className="border p-2 w-full">
              <option>Are strong passwords enforced?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </>
        )}

        {step === 3 && (
          <>
            <select onChange={(e)=>updateAnswer("encryption",e.target.value)} className="border p-2 w-full">
              <option>Is customer data encrypted?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            <select onChange={(e)=>updateAnswer("accessControl",e.target.value)} className="border p-2 w-full">
              <option>Do you restrict access to sensitive data?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </>
        )}

        {step === 4 && (
          <>
            <select onChange={(e)=>updateAnswer("monitoring",e.target.value)} className="border p-2 w-full">
              <option>Do you monitor systems for suspicious activity?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            <select onChange={(e)=>updateAnswer("training",e.target.value)} className="border p-2 w-full">
              <option>Do employees receive security training?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </>
        )}

        {step === 5 && (
          <>
            <select onChange={(e)=>updateAnswer("backups",e.target.value)} className="border p-2 w-full">
              <option>Do you maintain secure backups?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            <select onChange={(e)=>updateAnswer("incidentPlan",e.target.value)} className="border p-2 w-full">
              <option>Do you have an incident response plan?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </>
        )}

        <div className="flex gap-3 mt-6">

          {step > 1 && (
            <button
              onClick={back}
              className="border px-4 py-2"
            >
              Back
            </button>
          )}

          {step < 5 && (
            <button
              onClick={next}
              className="bg-black text-white px-4 py-2"
            >
              Next
            </button>
          )}

          {step === 5 && (
            <button
              onClick={runAssessment}
              className="bg-black text-white px-4 py-2"
            >
              Run Assessment
            </button>
          )}

        </div>

      </div>

    </div>
  )
}
