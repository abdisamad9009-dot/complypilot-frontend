import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="p-8 space-y-10">

      {/* Header */}
      <div>
        <p className="text-xs uppercase tracking-wider text-black/50">
          Next Review
        </p>
        <h2 className="text-4xl font-bold mt-2 text-slate-900">
          12 March
        </h2>
      </div>

      {/* Compliance Score Card */}
      <div className="bg-white border border-black/10 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-2">
          Compliance Score
        </h2>

        <div className="text-5xl font-bold text-slate-900">
          82%
        </div>

        <p className="text-black/60 mt-2">
          Your business is in good standing. A few documents need updating.
        </p>
      </div>

      {/* Documents Section */}
      <div className="bg-white border border-black/10 rounded-xl p-6">
        <h2 className="text-xl font-semibold tracking-tight mb-2">
          Documents
        </h2>

        <p className="text-black/60 mb-4">
          Generate compliance documents instantly
        </p>

        <Link href="/documents">
          <button className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition duration-200">
            Open document center →
          </button>
        </Link>
      </div>

    </div>
  );
}
