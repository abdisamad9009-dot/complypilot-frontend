export default function RisksPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-10">

      <div className="max-w-4xl mx-auto space-y-6">

        <h1 className="text-3xl font-semibold tracking-tight">
          Open Risks
        </h1>

        <div className="bg-white border border-black/10 rounded-xl p-6">

          <ul className="space-y-4 text-black/80">

            <li className="flex items-center gap-3">
              ⚠️ Missing Data Retention Policy
            </li>

            <li className="flex items-center gap-3">
              ⚠️ Two‑factor authentication not enabled
            </li>

            <li className="flex items-center gap-3">
              ⚠️ Privacy policy requires update
            </li>

            <li className="flex items-center gap-3">
              ⚠️ No documented access control policy
            </li>

          </ul>

        </div>

      </div>

    </div>
  )
}
