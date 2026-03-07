export default function RisksPage() {
  return (
    <div className="p-8 space-y-6">

      <h1 className="text-3xl font-bold">
        Open Risks
      </h1>

      <div className="bg-white border border-black/10 rounded-xl p-6">

        <ul className="space-y-3 text-black/80">

          <li>⚠️ Missing Data Retention Policy</li>

          <li>⚠️ Two‑factor authentication not enabled</li>

          <li>⚠️ Privacy policy requires update</li>

          <li>⚠️ No documented access control policy</li>

        </ul>

      </div>

    </div>
  )
}
