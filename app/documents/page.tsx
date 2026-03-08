"use client";

import { useRouter } from "next/navigation";

export default function Documents() {
  const router = useRouter();

  const generateDoc = (type: string) => {
    router.push(`/chat?type=${encodeURIComponent(type)}`);
  };

  const Card = ({ title }: { title: string }) => (
    <div className="border border-neutral-200 rounded-2xl p-8 mb-6 bg-white">
      <h2 className="text-xl font-semibold text-black">{title}</h2>

      <p className="text-neutral-500 mt-2 mb-6">
        Status: Missing
      </p>

      <button
        onClick={() => generateDoc(title)}
        className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
      >
        Generate with AI
      </button>
    </div>
  );

  return (
    <main className="min-h-screen bg-white p-12 max-w-3xl">
      <h1 className="text-3xl font-semibold mb-10 text-black">
        Document Generation
      </h1>

      <Card title="Security Policy" />

      <Card title="Risk Assessment" />

      <Card title="GDPR Policy" />
    </main>
  );
}
