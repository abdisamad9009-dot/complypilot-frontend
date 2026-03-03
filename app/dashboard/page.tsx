import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="space-y-10">

      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          ComplyPilot Dashboard
        </h1>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white border border-black/10 rounded-xl p-6">
          <p className="text-xs uppercase tracking-wider text-black/50">
            Compliance Score
          </p>
          <h2 className="text-4xl font-bold mt-2 text-slate-900">
            82%
          </h2>
        </div>

        <div className="bg-white border border-black/10 rounded-xl p-6">
          <p className="text-xs uppercase tracking-wider text-black/50">
            Open Risks
          </p>
          <h2 className="text-4xl font-bold mt-2 text-slate-900">
            3
          </h2>
        </div>

        <div className="bg-white border border-black/10 rounded-xl p-6">
          <p className="text-xs uppercase tracking-wider text-black/50">
            Next Review
          </p>
          <h2 className="text-4xl font-bold mt-2 text-slate-900">
            12 March
          </h2>
        </div>

      </div>

    </div>
  );
}

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
  );
}
