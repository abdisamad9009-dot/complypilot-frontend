export default function MonthlyReport() {
  
  const score = 100; 
  const risks = []; 
  const tasks = []; 

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

  return (
    <div>
      <h1>Monthly Report - {month}</h1>
      <p>Score: {score}%</p>
      <p>Status: {status}</p>
      <p>Issues: {issues}</p>
      <p>Tasks Completed: {completedTasks}</p>
      <p>Upcoming Reviews: {upcomingReviews}</p>
    </div>
  );
}
