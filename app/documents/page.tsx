"use client";

import { useRouter } from "next/navigation";

export default function Documents() {
 const router = useRouter();
  
  const generateDoc = async (type: string) => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type }),
    });

    const data = await res.json();
   localStorage.setItem("generatedDoc", data.document);
router.push("/chat");
  };

  return (
    <main className="min-h-screen bg-white p-10">
      <h1 className="text-3xl font-semibold mb-10">Documents</h1>

      {/* Security */}
      <div className="border border-neutral-200 rounded-2xl p-8 mb-6">
        <h2 className="text-xl font-medium text-black">Security Policy</h2>
        <p className="text-neutral-500 mt-1 mb-6">Status: Missing</p>

        <button
          onClick={() => generateDoc("Security Policy")}
          className="bg-black text-white px-5 py-3 rounded-xl hover:opacity-90 transition"
        >
          Generate with AI
        </button>
      </div>

      {/* Risk */}
      <div className="border border-neutral-200 rounded-2xl p-8 mb-6">
        <h2 className="text-xl font-medium text-black">Risk Assessment</h2>
        <p className="text-neutral-500 mt-1 mb-6">Status: Missing</p>

        <button
          onClick={() => generateDoc("Risk Assessment")}
          className="bg-black text-white px-5 py-3 rounded-xl hover:opacity-90 transition"
        >
          Generate with AI
        </button>
      </div>

      {/* GDPR */}
      <div className="border border-neutral-200 rounded-2xl p-8">
        <h2 className="text-xl font-medium text-black">GDPR Policy</h2>
        <p className="text-neutral-500 mt-1 mb-6">Status: Missing</p>

        <button
          onClick={() => generateDoc("GDPR Policy")}
          className="bg-black text-white px-5 py-3 rounded-xl hover:opacity-90 transition"
        >
          Generate with AI
        </button>
      </div>
    </main>
  );
}

    
