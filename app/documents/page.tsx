"use client"

import Link from "next/link"

export default function Documents() {

  const generateDoc = async (type: string) => {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type }),
  });

  const data = await res.json();
  alert(data.document);
};
  
  return (
    <main className="min-h-screen bg-white px-12 py-16">

      <div className="max-w-4xl">

        <h1 className="text-4xl font-semibold text-black mb-2">
          Document Center
        </h1>

        <p className="text-neutral-500 mb-12">
          Generate and manage compliance documents
        </p>

        <div className="space-y-6">

          <div className="border border-neutral-200 rounded-2xl p-8">
            <h2 className="text-xl font-medium text-black">
              Security Policy
            </h2>
            <p className="text-neutral-500 mt-1 mb-6">
              Status: Missing
            </p>

            <button className="bg-black text-white px-5 py-3 rounded-xl hover:opacity-90 transition">
              Generate with AI
            </button>
          </div>

          <div className="border border-neutral-200 rounded-2xl p-8">
            <h2 className="text-xl font-medium text-black">
              Risk Assessment
            </h2>
            <p className="text-neutral-500 mt-1 mb-6">
              Status: Missing
            </p>

           <button
  onClick={() => generateDoc("Risk Assessment")}
  className="bg-black text-white px-5 py-3 rounded-xl hover:opacity-90 transition"
>
  Generate with AI
</button>

          <div className="border border-neutral-200 rounded-2xl p-8">
            <h2 className="text-xl font-medium text-black">
              GDPR Policy
            </h2>
            <p className="text-neutral-500 mt-1 mb-6">
              Status: Missing
            </p>

           <button
  onClick={() => generateDoc("GDPR Policy")}
  className="bg-black text-white px-5 py-3 rounded-xl hover:opacity-90 transition"
>
  Generate with AI
</button>
        </div>

        <Link href="/dashboard">
          <p className="mt-12 text-sm text-neutral-500 hover:text-black cursor-pointer">
            ← Back to dashboard
          </p>
        </Link>

      </div>
    </main>
  )
}
