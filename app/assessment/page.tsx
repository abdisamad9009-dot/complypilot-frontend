"use client"

import { useState } from "react"

const questions = [
  { id: 1, text: "Do you have a privacy policy?" },
  { id: 2, text: "Do you encrypt stored user data?" },
  { id: 3, text: "Do you use secure authentication?" },
  { id: 4, text: "Do you have a data breach response plan?" },
  { id: 5, text: "Do you regularly update software?" },
  { id: 6, text: "Do employees receive security training?" },
  { id: 7, text: "Do you monitor unauthorized access attempts?" },
  { id: 8, text: "Do you restrict admin access?" },
  { id: 9, text: "Do you back up company data?" },
  { id: 10, text: "Do you test backups regularly?" },
  { id: 11, text: "Do you use multi-factor authentication?" },
  { id: 12, text: "Do you log security events?" },
  { id: 13, text: "Do you perform vulnerability scans?" },
  { id: 14, text: "Do you have firewall protection?" },
  { id: 15, text: "Do you enforce strong passwords?" },
  { id: 16, text: "Do you manage user access permissions?" },
  { id: 17, text: "Do you delete unused accounts?" },
  { id: 18, text: "Do you secure API endpoints?" },
  { id: 19, text: "Do you protect customer payment data?" },
  { id: 20, text: "Do you use HTTPS everywhere?" },
  { id: 21, text: "Do you review third‑party vendors?" },
  { id: 22, text: "Do you have incident reporting procedures?" },
  { id: 23, text: "Do you document security policies?" },
  { id: 24, text: "Do you restrict database access?" },
  { id: 25, text: "Do you use endpoint protection?" },
  { id: 26, text: "Do you monitor network traffic?" },
  { id: 27, text: "Do you run penetration tests?" },
  { id: 28, text: "Do you secure cloud infrastructure?" },
  { id: 29, text: "Do you rotate encryption keys?" },
  { id: 30, text: "Do you track security incidents?" },
  { id: 31, text: "Do you review security logs?" },
  { id: 32, text: "Do you enforce device security?" },
  { id: 33, text: "Do you use antivirus protection?" },
  { id: 34, text: "Do you audit system access?" },
  { id: 35, text: "Do you secure employee devices?" },
  { id: 36, text: "Do you encrypt backups?" },
  { id: 37, text: "Do you protect against phishing?" },
  { id: 38, text: "Do you maintain a risk register?" },
  { id: 39, text: "Do you have a disaster recovery plan?" },
  { id: 40, text: "Do you monitor cloud logs?" },
  { id: 41, text: "Do you review compliance regularly?" },
  { id: 42, text: "Do you conduct internal audits?" },
  { id: 43, text: "Do you maintain security documentation?" },
  { id: 44, text: "Do you review access privileges?" },
  { id: 45, text: "Do you monitor privileged users?" },
  { id: 46, text: "Do you secure development environments?" },
  { id: 47, text: "Do you separate production environments?" },
  { id: 48, text: "Do you review security alerts?" },
  { id: 49, text: "Do you perform regular risk assessments?" },
  { id: 50, text: "Do you continuously improve security controls?" }
]

export default function Assessment() {

  const [answers, setAnswers] = useState({})

  const handleAnswer = (id, value) => {
    setAnswers({
      ...answers,
      [id]: value
    })
  }

  const handleSubmit = () => {

    if (Object.keys(answers).length < questions.length) {
      alert("Please answer all questions")
      return
    }

    const yesCount = Object.values(answers).filter(
      a => a === "yes"
    ).length

    const score = yesCount * 2

    const gdpr = Math.floor(score * 0.4)
    const auth = Math.floor(score * 0.3)
    const security = Math.floor(score * 0.3)

    const total = gdpr + auth + security

    // SAVE SCORE SO DASHBOARD + TASKS USE SAME NUMBER
    localStorage.setItem("complianceScore", score)

    window.location.href =
      `/dashboard?score=${score}&gdpr=${gdpr}&auth=${auth}&security=${security}&total=${total}`
  }

  return (
    <div style={{ padding: 40 }}>

      <h1>Compliance Assessment</h1>

      {questions.map((q) => (
        <div key={q.id} style={{ marginBottom: 20 }}>
          <p>{q.text}</p>

          <button onClick={() => handleAnswer(q.id, "yes")}>
            Yes
          </button>

          <button onClick={() => handleAnswer(q.id, "no")}>
            No
          </button>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        style={{
          marginTop: 30,
          padding: 10,
          fontSize: 18
        }}
      >
        Submit Assessment
      </button>

    </div>
  )
}
