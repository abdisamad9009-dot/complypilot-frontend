"use client";

import { useState, useEffect } from "react";

export default function MonthlyReport() {
  const [score, setScore] = useState(0);
  const [risks, setRisks] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
   
    setScore(100);
    setRisks([]);
    setTasks([]);
  }, []);

  const issues = risks.filter(risk => risk.status !== "resolved").length;

  const completedTasks = tasks.filter(task => task.completed).length;

  const upcomingReviews = tasks.filter(task => {
    if (!task.expiryDate) return false;
    const today = new Date();
    const expiry = new Date(task.expiryDate);
    const diffDays = (expiry - today) / (1000 * 60 * 60 * 24);
    return diffDays <= 30;
  }).length;

  const status = score === 100 ? "Fully Compliant" : "Needs Attention";

  const month = new Date().toLocaleString("default", { month: "long" });

  const handleDownload = () => {
    const text = `
Monthly Report - ${month}
Score: ${score}%
Status: ${status}
Issues: ${issues}
Tasks Completed: ${completedTasks}
Upcoming Reviews: ${upcomingReviews}
    `;

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "monthly-report.txt";
    a.click();
  };

  return (
    <div style={{ padding: "24px", color: "white" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Monthly Report - {month}
      </h1>

      <div style={{ display: "grid", gap: "10px", marginBottom: "20px" }}>
        <p>Score: {score}%</p>
        <p>Status: {status}</p>
        <p>Issues: {issues}</p>
        <p>Tasks Completed: {completedTasks}</p>
        <p>Upcoming Reviews: {upcomingReviews}</p>
      </div>

      <button onClick={handleDownload}>
        Download Report
      </button>
    </div>
  );
}
