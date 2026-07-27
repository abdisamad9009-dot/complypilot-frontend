import { supabase } from "../supabase"

export async function saveUserData() {
  const { data: userData } = await supabase.auth.getUser()
  const user = userData?.user
  if (!user) return

  const payload = {
    user_id: user.id,
    business_name: localStorage.getItem("businessName") || "",
    industry: localStorage.getItem("industry") || "",
    employees: localStorage.getItem("employees") || "",
    compliance_score: Number(localStorage.getItem("complianceScore") || 0),
    gdpr_issues: JSON.parse(localStorage.getItem("gdprIssues") || "[]"),
    auth_issues: JSON.parse(localStorage.getItem("authIssues") || "[]"),
    security_issues: JSON.parse(localStorage.getItem("securityIssues") || "[]"),
    completed_tasks: Number(localStorage.getItem("completedTasks") || 0),
    generated_docs: JSON.parse(localStorage.getItem("generatedDocs") || "{}"),
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from("user_data").upsert(payload)
  if (error) console.error("Failed to save user data:", error.message)
}

export async function loadUserData() {
  const { data: userData } = await supabase.auth.getUser()
  const user = userData?.user
  if (!user) return

  const { data, error } = await supabase
    .from("user_data")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle()

  if (error) {
    console.error("Failed to load user data:", error.message)
    return
  }

  if (!data) return

  localStorage.setItem("businessName", data.business_name || "")
  localStorage.setItem("industry", data.industry || "")
  localStorage.setItem("employees", data.employees || "")
  localStorage.setItem("complianceScore", String(data.compliance_score ?? 0))
  localStorage.setItem("gdprIssues", JSON.stringify(data.gdpr_issues || []))
  localStorage.setItem("authIssues", JSON.stringify(data.auth_issues || []))
  localStorage.setItem("securityIssues", JSON.stringify(data.security_issues || []))
  localStorage.setItem("completedTasks", String(data.completed_tasks ?? 0))
  localStorage.setItem("generatedDocs", JSON.stringify(data.generated_docs || {}))
}
