"use client"

import Link from "next/link"

export default function TasksPage() {

  const tasks = [
    "Enable Multi‑Factor Authentication",
    "Encrypt customer data",
    "Implement monitoring and backups"
  ]

  return (
    <div className="p-8 space-y-10">

      <h1 className="text-3xl font-bold">
        Compliance Tasks
      </h1>

      {/* Compliance Score */}
      <div>
        <p className="text-sm text-black/60">
          Compliance Score
        </p>

        <div className="text-5xl font-bold">
          50%
        </div>

        <Link href="/assessment">
          <button className="mt-4 bg-gray-600 text-white px-4 py-2 rounded">
            Run Assessment
          </button>
        </Link>
      </div>

      {/* Tasks */}
      <div>
        <h2 className="text-xl font-semibold mb-3">
          Compliance Checklist
        </h2>

        <ul className="space-y-3">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center border p-3 rounded"
            >
              {task}

              <button className="bg-black text-white px-3 py-1 rounded">
                Complete
              </button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}
