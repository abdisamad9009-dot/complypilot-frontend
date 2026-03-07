"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function Dashboard() {

  const searchParams = useSearchParams()

  const score = searchParams.get("score") ?? "0"
  const gdpr = searchParams.get("gdpr") ?? "0"
  const auth = searchParams.get("auth") ?? "0"
  const security = searchParams.get("security") ?? "0"
  const total = searchParams.get("total") ?? "0"

  return (
    <div className="p-8 space-y-10">

      {/* Header */}
      <div>
        <p className="text-xs uppercase tracking-wider text-black/50">
          Latest Compliance Review
        </p>

        <h2 className="text-4xl font-bold mt-2 text-slate-900">
          Compliance Dashboard
        </h2>

        <p className="text-black/60 mt-2">
          Results generated from your latest assessment.
        </p>
      </div>

      {/* Compliance Score */}
      <div className="bg-white border border-black/10 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-2">
          Compliance Score
        </h2>

        <div className="text-5xl font-bold text-slate-900">
          {score}%
        </div>

        <p className="text-black/60 mt-2">
          Calculated based on your assessment answers.
        </p>
      </div>

      {/* Financial Risk */}
      <div className="bg-white border border-black/10 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Financial Risk Exposure
        </h2>

        <p>GDPR Risk: £{gdpr}</p>
        <p>Authentication Risk: £{auth}</p>
        <p>Security Risk: £{security}</p>

        <div className="mt-4 font-bold">
          Total Exposure: £{total}
        </div>
      </div>

      {/* Open Risks */}
      <div className="bg-white border border-black/10 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-2">
          Open Risks
        </h2>

        <p className="text-black/60 mb-4">
          Risks identified in your compliance review.
        </p>

        <Link href="/risks">
          <button className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition">
            View open risks →
          </button>
        </Link>
      </div>

      {/* Priority Steps */}
      <div className="bg-white border border-black/10 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-2">
          Priority Steps
        </h2>

        <p className="text-black/60 mb-4">
          Actions you should complete next to improve compliance.
        </p>

        <Link href="/priority">
          <button className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition">
            Get next priority steps →
          </button>
        </Link>
      </div>

      {/* Documents */}
      <div className="bg-white border border-black/10 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-2">
          Documents
        </h2>

        <p className="text-black/60 mb-4">
          Generate compliance documents instantly.
        </p>

        <Link href="/documents">
          <button className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition">
            Open document center →
          </button>
        </Link>
      </div>

    </div>
  )
}
