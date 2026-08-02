"use client"
import { useState, useEffect } from "react"

type Question = {
  text: string
  category: "gdpr" | "auth" | "security"
}

const CATEGORY_WEIGHT: Record<string, number> = {
  gdpr: 3,
  auth: 2,
  security: 1,
}

const QUESTIONS: Question[] = [
  { text: "Do you have a published privacy policy?", category: "gdpr" },
  { text: "Do you have a documented data breach response plan?", category: "gdpr" },
  { text: "Do you know how to respond to a Subject Access Request within one month, as required by UK GDPR?", category: "gdpr" },
  { text: "Do you have Data Processing Agreements in place with your third-party vendors and processors?", category: "gdpr" },
  { text: "Do you conduct Data Protection Impact Assessments for high-risk data processing activities?", category: "gdpr" },
  { text: "Do you maintain records of processing activities as required under Article 30?", category: "gdpr" },
  { text: "Do you have a documented lawful basis for each type of personal data you process?", category: "gdpr" },
  { text: "Do you have a process for handling personal data transfers outside the UK or EEA?", category: "gdpr" },
  { text: "Do you use cookie consent management on your website?", category: "gdpr" },
  { text: "Have you appointed a Data Protection Officer or nominated a privacy lead, if required for your business?", category: "gdpr" },

  { text: "Do you use multi-factor authentication for company systems?", category: "auth" },
  { text: "Do you enforce strong password requirements?", category: "auth" },
  { text: "Do you follow the principle of least privilege for system access?", category: "auth" },
  { text: "Do you have a formal process for removing access when someone leaves the company?", category: "auth" },
  { text: "Do you monitor and log privileged user activity?", category: "auth" },
  { text: "Do you restrict administrative access to only those who need it?", category: "auth" },
  { text: "Do you conduct periodic access reviews?", category: "auth" },
  { text: "Do you disable or delete unused and inactive accounts?", category: "auth" },

  { text: "Do you encrypt sensitive data at rest?", category: "security" },
  { text: "Do you use HTTPS across your website and services?", category: "security" },
  { text: "Do you encrypt backups?", category: "security" },
  { text: "Do you rotate encryption keys periodically?", category: "security" },
  { text: "Do you apply software and security updates on a regular schedule?", category: "security" },
  { text: "Do you have a documented patch management process?", category: "security" },
  { text: "Do you use firewall protection for your network?", category: "security" },
  { text: "Do you use antivirus or endpoint protection on company devices?", category: "security" },
  { text: "Do you run vulnerability scans on your systems?", category: "security" },
  { text: "Do you conduct penetration testing at least annually?", category: "security" },
  { text: "Do you provide security awareness training to employees, including phishing awareness?", category: "security" },
  { text: "Do you back up company data regularly?", category: "security" },
  { text: "Do you test backup restoration regularly?", category: "security" },
  { text: "Do you have a disaster recovery plan?", category: "security" },
  { text: "Do you secure API endpoints with authentication and rate limiting?", category: "security" },
  { text: "Do you separate development, testing, and production environments?", category: "security" },
  { text: "Do you monitor for unauthorized access attempts?", category: "security" },
  { text: "Do you maintain a risk register to track identified risks?", category: "security" },
]

function getCurrentMonthKey() {
  const now = new Date()
  return `${now.getFullYear()}-${now.getMonth() + 1}`
}

function pickRandomSample<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export default function AssessmentPage() {
  const [mode, setMode] = useState<"loading" | "full" | "checkin" | "done-this-month">("loading")
  const [questionIndexes, setQuestionIndexes] = useState<number[]>([])
  const [page, setPage] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})

  const [businessName, setBusinessName] = useState("")
  const [industry, setIndustry] = useState("")
  const [employees, setEmployees] = useState("")

  const questionsPerPage = 9

  useEffect(() => {
    const savedAnswersRaw = localStorage.getItem("assessmentAnswers")
    const lastMonth = localStorage.getItem("lastAssessmentMonth")
    const currentMonth = getCurrentMonthKey()

    setBusinessName(localStorage.getItem("businessName") || "")
    setIndustry(localStorage.getItem("industry") || "")
    setEmployees(localStorage.getItem("employees") || "")

    if (!savedAnswersRaw) {
      // First ever assessment — ask everything
      setQuestionIndexes(QUESTIONS.map((_, i) => i))
      setMode("full")
      return
    }

    if (lastMonth === currentMonth) {
      // Already checked in this month
      setMode("done-this-month")
      return
    }

    // Monthly check-in: re-ask previous "no" answers + a random sample of previous "yes" answers
    const savedAnswers = JSON.parse(savedAnswersRaw) as { [key: number]: string }
    const noIndexes = Object.entries(savedAnswers)
      .filter(([, v]) => v === "no")
      .map(([k]) => Number(k))
    const yesIndexes = Object.entries(savedAnswers)
      .filter(([, v]) => v === "yes")
      .map(([k]) => Number(k))
    const spotCheckSample = pickRandomSample(yesIndexes, Math.min(5, yesIndexes.length))

    const combined = [...new Set([...noIndexes, ...spotCheckSample])]
    setAnswers(savedAnswers) // pre-load carried-forward answers
    setQuestionIndexes(combined)
    setMode("checkin")
  }, [])

  const totalPages = Math.ceil(questionIndexes.length / questionsPerPage)
  const start = page * questionsPerPage
  const currentIndexes = questionIndexes.slice(start, start + questionsPerPage)

  function setAnswer(index: number, value: string) {
    setAnswers(prev => ({ ...prev, [index]: value }))
  }

  function nextPage() {
    const unanswered = currentIndexes.some((i) => !answers[i])
    if (unanswered) {
      alert("Please answer every question on this page before continuing.")
      return
    }

    if (page < totalPages - 1) {
      setPage(page + 1)
      window.scrollTo(0, 0)
      return
    }

    finishAssessment()
  }

  function finishAssessment() {
    const gdpr: string[] = []
    const auth: string[] = []
    const security: string[] = []
    let earnedWeight = 0
    let totalWeight = 0

    QUESTIONS.forEach((q, i) => {
      const weight = CATEGORY_WEIGHT[q.category]
      totalWeight += weight
      const answer = answers[i]

      if (answer === "yes") {
        earnedWeight += weight
      } else if (answer === "no") {
        if (q.category === "gdpr") gdpr.push(q.text)
        if (q.category === "auth") auth.push(q.text)
        if (q.category === "security") security.push(q.text)
      }
    })

    const score = Math.round((earnedWeight / totalWeight) * 100)

    localStorage.setItem("complianceScore", String(score))
    localStorage.setItem("gdprIssues", JSON.stringify(gdpr))
    localStorage.setItem("authIssues", JSON.stringify(auth))
    localStorage.setItem("securityIssues", JSON.stringify(security))
    localStorage.setItem("businessName", businessName)
    localStorage.setItem("industry", industry)
    localStorage.setItem("employees", employees)
    localStorage.setItem("assessmentAnswers", JSON.stringify(answers))
    localStorage.setItem("lastAssessmentMonth", getCurrentMonthKey())

    // Keep a lightweight history for trend display later
    const history = JSON.parse(localStorage.getItem("assessmentHistory") || "[]")
    history.push({ date: new Date().toISOString(), score })
    localStorage.setItem("assessmentHistory", JSON.stringify(history))

    window.location.href =
      `/dashboard?score=${score}&gdpr=${gdpr.length}&auth=${auth.length}&security=${security.length}&total=${gdpr.length + auth.length + security.length}`
  }

  if (mode === "loading") {
    return <div style={{ padding: "40px" }}>Loading...</div>
  }

  if (mode === "done-this-month") {
    return (
      <div style={{ minHeight: "100vh", background: "white", padding: "40px", fontFamily: "sans-serif" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>Compliance Assessment</h1>
        <div
          style={{
            marginTop: "24px",
            padding: "20px",
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: "12px",
            color: "#166534",
            maxWidth: "600px",
          }}
        >
          You've already completed your check-in for this month. Come back next month for your next
          review, or visit your Dashboard to see your current results.
        </div>
      </div>
    )
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
        {mode === "full" ? "Compliance Assessment" : "Monthly Check-In"}
      </h1>
      {mode === "checkin" && (
        <p style={{ marginTop: "12px", color: "#64748b", maxWidth: "600px" }}>
          A quick recheck of your previous gaps, plus a few spot-checks — takes a couple of minutes.
        </p>
      )}

      {page === 0 && mode === "full" && (
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

      <p>Page {page + 1} of {totalPages}</p>

      <div style={{ marginTop: "30px" }}>
        {currentIndexes.map((qIndex) => {
          const q = QUESTIONS[qIndex]
          const selected = answers[qIndex]

          return (
            <div key={qIndex} style={{ marginBottom: "25px" }}>
              <p style={{ marginBottom: "10px" }}>
                {q.text}
              </p>

              <button
                onClick={() => setAnswer(qIndex, "yes")}
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
                onClick={() => setAnswer(qIndex, "no")}
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
        {page === totalPages - 1 ? "Finish" : "Next Page"}
      </button>
    </div>
  )
}
