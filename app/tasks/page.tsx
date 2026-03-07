"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function TasksPage() {

  const [score, setScore] = useState(0)

  const [tasks, setTasks] = useState([
    { name: "Enable Multi‑Factor Authentication", done: false },
    { name: "Encrypt customer data", done: false },
    { name: "Implement monitoring and backups", done: false }
  ])

  useEffect(() => {
    const savedScore = localStorage.getItem("complianceScore")
    if (savedScore) {
      setScore(Number(savedScore))
    }
  }, [])

  function completeTask(index) {

  const updatedTasks = [...tasks]

  if (!updatedTasks[index].done) {

    updatedTasks[index].done = true

    const newScore = score + 2

    setScore(newScore)

    localStorage.setItem("complianceScore", newScore)
  }

  setTasks(updatedTasks)
}

    setTasks(updatedTasks)
  }

  return (
    <div className="min-h-screen bg-white text-black p-8 space-y-10">

      <h1 className="text-3xl font-bold">
        Compliance Tasks
      </h1>

      {/* Compliance Score */}
      <div>

        <p className="text-sm text-gray-500">
          Compliance Score
        </p>

        <div className="text-5xl font-bold">
          {score}%
        </div>

        <Link href="/assessment">
          <button className="mt-4 bg-black text-white px-4 py-2 rounded">
            Run Assessment
          </button>
        </Link>

      </div>

      {/* Task List */}
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

              <span
                className={task.done ? "line-through text-gray-400" : ""}
              >
                {task.name}
              </span>

              <button
                onClick={() => completeTask(index)}
                disabled={task.done}
                className={
                  task.done
                    ? "bg-gray-300 text-gray-600 px-3 py-1 rounded"
                    : "bg-black text-white px-3 py-1 rounded"
                }
              >
                {task.done ? "Completed" : "Complete"}
              </button>

            </li>

          ))}

        </ul>

      </div>

    </div>
  )
}
