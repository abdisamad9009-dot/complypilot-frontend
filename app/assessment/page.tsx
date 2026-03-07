"use client"

import { useState } from "react"

export default function AssessmentPage() {

  const questions = [
    "Do you encrypt customer data?",
    "Do you use multi-factor authentication?",
    "Do you monitor login attempts?",
    "Do you back up company data regularly?",
    "Do you restrict admin access?",
    "Do you have a privacy policy?",
    "Do you train staff on security?",
    "Do you monitor suspicious activity?",
    "Do you log security events?",
    "Do you review security logs?",

    "Do you encrypt stored data?",
    "Do you encrypt data in transit?",
    "Do you use secure passwords?",
    "Do you rotate passwords regularly?",
    "Do you audit system access?",
    "Do you have firewall protection?",
    "Do you monitor network traffic?",
    "Do you review system permissions?",
    "Do you test backups regularly?",
    "Do you store backups securely?",

    "Do you comply with GDPR?",
    "Do you allow users to delete data?",
    "Do you allow users to export data?",
    "Do you track consent for data use?",
    "Do you protect personal data?",
    "Do you document security policies?",
    "Do you monitor data access?",
    "Do you review compliance regularly?",
    "Do you audit third party tools?",
    "Do you restrict data sharing?",

    "Do you track failed login attempts?",
    "Do you detect unusual logins?",
    "Do you notify admins of breaches?",
    "Do you review access logs?",
    "Do you monitor API usage?",
    "Do you secure internal tools?",
    "Do you test security controls?",
    "Do you review staff permissions?",
    "Do you monitor cloud systems?",
    "Do you secure company devices?",

    "Do you have incident response plans?",
    "Do you report security incidents?",
    "Do you test incident response?",
    "Do you monitor system uptime?",
    "Do you track vulnerabilities?",
    "Do you patch software quickly?",
    "Do you use antivirus protection?",
    "Do you monitor data integrity?",
    "Do you review security alerts?",
    "Do you test disaster recovery?"
  ]

  const [page, setPage] = useState(0)
  const [yesCount, setYesCount] = useState(0)

  const questionsPerPage = 10
  const start = page * questionsPerPage
  const currentQuestions = questions.slice(start, start + questionsPerPage)

  function answerYes() {
    setYesCount(prev => prev + 1)
  }

  function nextPage() {
    if (page < 4) {
      setPage(page + 1)
      window.scrollTo(0, 0)
    } else {

      const score = Math.round((yesCount / 50) * 100)

      const gdpr = yesCount < 20 ? 1 : 0
      const auth = yesCount < 30 ? 1 : 0
      const security = yesCount < 40 ? 1 : 0
      const total = gdpr + auth + security

      window.location.href =
        `/dashboard?score=${score}&gdpr=${gdpr}&auth=${auth}&security=${security}&total=${total}`
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "white",
      color: "black",
      padding: "40px",
      fontFamily: "sans-serif"
    }}>

      <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
        Compliance Assessment
      </h1>

      <p style={{ marginTop: "10px" }}>
        Page {page + 1} of 5
      </p>

      <div style={{ marginTop: "30px" }}>

        {currentQuestions.map((q, i) => (
          <div key={i} style={{ marginBottom: "25px" }}>

            <p style={{ marginBottom: "10px" }}>
              {start + i + 1}. {q}
            </p>

            <button
              onClick={answerYes}
              style={{
                marginRight: "10px",
                padding: "8px 16px",
                backgroundColor: "black",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Yes
            </button>

            <button
              style={{
                padding: "8px 16px",
                backgroundColor: "white",
                color: "black",
                border: "1px solid black",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              No
            </button>

          </div>
        ))}

      </div>

      <button
        onClick={nextPage}
        style={{
          marginTop: "40px",
          padding: "12px 25px",
          backgroundColor: "black",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        {page === 4 ? "Finish Assessment" : "Next Page"}
      </button>

    </div>
  )
}
