"use client"
import { useState } from "react"

export default function AssessmentPage() {
  const questions = [
    "Do you have a privacy policy?",
    "Do you encrypt stored user data?",
    "Do you use secure authentication?",
    "Do you have a data breach response plan?",
    "Do you regularly update software?",
    "Do employees receive security training?",
    "Do you monitor unauthorized access attempts?",
    "Do you restrict admin access?",
    "Do you back up company data?",
    "Do you test backups regularly?",
    "Do you use multi-factor authentication?",
    "Do you log security events?",
    "Do you perform vulnerability scans?",
    "Do you have firewall protection?",
    "Do you enforce strong passwords?",
    "Do you manage user access permissions?",
    "Do you delete unused accounts?",
    "Do you secure API endpoints?",
    "Do you protect customer payment data?",
    "Do you use HTTPS everywhere?",
    "Do you review third‑party vendors?",
    "Do you have incident reporting procedures?",
    "Do you document security policies?",
    "Do you restrict database access?",
    "Do you use endpoint protection?",
    "Do you monitor network traffic?",
    "Do you run penetration tests?",
    "Do you secure cloud infrastructure?",
    "Do you rotate encryption keys?",
    "Do you track security incidents?",
    "Do you review security logs?",
    "Do you enforce device security?",
    "Do you use antivirus protection?",
    "Do you audit system access?",
    "Do you secure employee devices?",
    "Do you encrypt backups?",
    "Do you protect against phishing?",
    "Do you maintain a risk register?",
    "Do you have a disaster recovery plan?",
    "Do you monitor cloud logs?",
    "Do you review compliance regularly?",
    "Do you conduct internal audits?",
    "Do you maintain security documentation?",
    "Do you review access privileges?",
    "Do you monitor privileged users?",
    "Do you secure development environments?",
    "Do you separate production environments?",
    "Do you review security alerts?",
    "Do you perform regular risk assessments?",
    "Do you continuously improve security controls?"
  ]

  const [page, setPage] = useState(0)
 const [answers, setAnswers] = useState<{ [key: number]: string }>({})

  // ✅ EXISTING
  const [businessName, setBusinessName] = useState("")
  const [industry, setIndustry] = useState("")

  // ✅ ADDED
  const [employees, setEmployees] = useState("")

  const questionsPerPage = 10
  const start = page * questionsPerPage
  const currentQuestions = questions.slice(start, start + questionsPerPage)

  function setAnswer(index: number, value: string) {
    setAnswers(prev => ({
      ...prev,
      [index]: value
    }))
  }

  function nextPage() {
    if (page < 4) {
      setPage(page + 1)
      window.scrollTo(0, 0)
    } else {
     let gdpr: any[] = []
     let auth: any[] = []
     let security: any[] = []

      Object.entries(answers).forEach(([index, value]) => {
        if (value === "no") {
          const i = Number(index)

          if ([0, 3, 20, 37, 40, 48].includes(i)) {
            gdpr.push(questions[i])
          }

          if ([2, 7, 10, 14, 15, 16, 43, 44].includes(i)) {
            auth.push(questions[i])
          }

          if (
            [
              1, 4, 5, 6, 8, 9, 11, 12, 13, 17, 18, 19,
              21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
              31, 32, 33, 34, 35, 36, 38, 39, 41, 42,
              45, 46, 47, 49
            ].includes(i)
          ) {
            security.push(questions[i])
          }
        }
      })

      const yesCount =
        Object.values(answers).filter(a => a === "yes").length

      const score = Math.round((yesCount / 50) * 100)

      // ✅ SAVE EVERYTHING
      localStorage.setItem("complianceScore", String(score))
      localStorage.setItem("gdprIssues", JSON.stringify(gdpr))
      localStorage.setItem("authIssues", JSON.stringify(auth))
      localStorage.setItem("securityIssues", JSON.stringify(security))

      // ✅ EXISTING
      localStorage.setItem("businessName", businessName)
      localStorage.setItem("industry", industry)

      // ✅ ADDED
      localStorage.setItem("employees", employees)

      window.location.href =
        `/dashboard?score=${score}&gdpr=${gdpr.length}&auth=${auth.length}&security=${security.length}&total=${gdpr.length + auth.length + security.length}`
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "white",
      color: "black",
      padding: "40px",
      fontFamily: "sans-serif"
    }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
        Compliance Assessment
      </h1>

      {/* ✅ NEW INPUTS */}
      {page === 0 && (
        <div style={{ marginTop: "20px", marginBottom: "30px" }}>
          <input
            placeholder="Business Name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            style={{
              display: "block",
              marginBottom: "10px",
              padding: "10px",
              width: "300px",
              border: "1px solid black",
              borderRadius: "6px"
            }}
          />

          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            style={{
              padding: "10px",
              width: "300px",
              border: "1px solid black",
              borderRadius: "6px",
              marginBottom: "10px"
            }}
          >
            <option value="">Select Industry</option>
            <option value="SaaS">SaaS</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Law Firm">Law Firm</option>
            <option value="Marketing Agency">Marketing Agency</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>

          {/* ✅ ADDED EMPLOYEE SIZE */}
          <select
            value={employees}
            onChange={(e) => setEmployees(e.target.value)}
            style={{
              padding: "10px",
              width: "300px",
              border: "1px solid black",
              borderRadius: "6px"
            }}
          >
            <option value="">Select company size</option>
            <option value="1-10">1–10 employees</option>
            <option value="11-50">11–50 employees</option>
            <option value="51-200">51–200 employees</option>
            <option value="200+">200+ employees</option>
          </select>
        </div>
      )}

      <p>Page {page + 1} of 5</p>

      <div style={{ marginTop: "30px" }}>
        {currentQuestions.map((q, i) => {
          const index = start + i
          const selected = answers[index]

          return (
            <div key={i} style={{ marginBottom: "25px" }}>
              <p style={{ marginBottom: "10px" }}>
                {index + 1}. {q}
              </p>

              <button
                onClick={() => setAnswer(index, "yes")}
                style={{
                  marginRight: "10px",
                  padding: "8px 16px",
                  background: selected === "yes" ? "black" : "white",
                  color: selected === "yes" ? "white" : "black",
                  border: "1px solid black",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Yes
              </button>

              <button
                onClick={() => setAnswer(index, "no")}
                style={{
                  padding: "8px 16px",
                  background: selected === "no" ? "black" : "white",
                  color: selected === "no" ? "white" : "black",
                  border: "1px solid black",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                No
              </button>
            </div>
          )
        })}
      </div>

      <button
        onClick={nextPage}
        style={{
          marginTop: "40px",
          padding: "12px 25px",
          background: "black",
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
