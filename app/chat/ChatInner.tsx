"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatInner() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const [doc, setDoc] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!type) return;

    const generate = async () => {
      setLoading(true);

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type }),
      });

      const data = await res.json();
      setDoc(data.document);
      setLoading(false);
    };

    generate();
  }, [type]);

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-6">Ask ComplyPilot</h1>

      {loading && <p>Generating document...</p>}

      {!loading && doc && (
        <pre className="bg-gray-100 p-6 rounded-xl whitespace-pre-wrap">
          {doc}
        </pre>
      )}
    </div>
  );
}
