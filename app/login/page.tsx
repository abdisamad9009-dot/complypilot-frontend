"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

export default function LoginPage() {
const [email, setEmail] = useState("");

useEffect(() => {
const checkUser = async () => {
const { data } = await supabase.auth.getUser();
if (data.user) {
window.location.href = "https://complypilot-frontend.vercel.app";
 }
 };

checkUser();
 }, []);

const handleLogin = async () => {
const { error } = await supabase.auth.signInWithOtp({
email,
options: {
emailRedirectTo: "https://complypilot-frontend.vercel.app",
 },
 });

if (error) {
alert(error.message);
 } else {
alert("Check your email");
 }
 };

return (
<div
style={{
minHeight: "100vh",
display: "grid",
placeItems: "center",
background:
"linear-gradient(135deg, #0f172a 0%, #111827 45%, #1e293b 100%)",
padding: "24px",
 }}
>
<div
style={{
width: "100%",
maxWidth: "1100px",
display: "grid",
gridTemplateColumns: "1.1fr 0.9fr",
background: "rgba(255,255,255,0.04)",
border: "1px solid rgba(255,255,255,0.08)",
borderRadius: "24px",
overflow: "hidden",
boxShadow: "0 25px 80px rgba(0,0,0,0.35)",
backdropFilter: "blur(18px)",
 }}
>
<div
style={{
padding: "64px 56px",
color: "white",
background:
"radial-gradient(circle at top left, rgba(59,130,246,0.22), transparent 35%)",
 }}
>
<div
style={{
display: "inline-block",
padding: "8px 14px",
borderRadius: "999px",
background: "rgba(255,255,255,0.08)",
fontSize: "13px",
marginBottom: "22px",
 }}
>
 ComplyPilot
</div>

<h1
style={{
fontSize: "48px",
lineHeight: 1.05,
margin: "0 0 18px",
fontWeight: 700,
 }}
>
 Compliance,
<br />
 simplified.
</h1>

<p
style={{
fontSize: "17px",
color: "rgba(255,255,255,0.72)",
maxWidth: "520px",
lineHeight: 1.7,
marginBottom: "36px",
 }}
>
 Assess risks, generate documents, track actions, and understand your
 exposure in one intelligent platform.
</p>

<div
style={{
display: "grid",
gap: "14px",
maxWidth: "500px",
 }}
>
{[
"50-question compliance assessment",
"AI-generated core documentation",
"Risk tracking and priority actions",
"Monthly reporting and AI support",
 ].map((item) => (
<div
key={item}
style={{
padding: "14px 16px",
borderRadius: "14px",
background: "rgba(255,255,255,0.05)",
border: "1px solid rgba(255,255,255,0.06)",
color: "rgba(255,255,255,0.88)",
fontSize: "15px",
 }}
>
 ✓ {item}
</div>
 ))}
</div>
</div>

<div
style={{
background: "#ffffff",
padding: "56px 42px",
display: "flex",
alignItems: "center",
justifyContent: "center",
 }}
>
<div style={{ width: "100%", maxWidth: "360px" }}>
<h2
style={{
fontSize: "30px",
fontWeight: 700,
color: "#111827",
marginBottom: "10px",
 }}
>
 Sign in
</h2>

<p
style={{
color: "#6b7280",
fontSize: "15px",
marginBottom: "28px",
lineHeight: 1.6,
 }}
>
 Enter your email and we’ll send you a secure magic link.
</p>

<div style={{ display: "grid", gap: "14px" }}>
<input
type="email"
placeholder="Enter your work email"
value={email}
onChange={(e) => setEmail(e.target.value)}
style={{
width: "100%",
padding: "16px 18px",
borderRadius: "14px",
border: "1px solid #d1d5db",
fontSize: "15px",
outline: "none",
 }}
/>

<button
onClick={handleLogin}
style={{
width: "100%",
padding: "16px 18px",
borderRadius: "14px",
border: "none",
background:
"linear-gradient(135deg, #111827 0%, #2563eb 100%)",
color: "white",
fontSize: "15px",
fontWeight: 600,
cursor: "pointer",
boxShadow: "0 12px 30px rgba(37,99,235,0.25)",
 }}
>
 Send Magic Link
</button>
</div>

<p
style={{
marginTop: "18px",
fontSize: "13px",
color: "#9ca3af",
lineHeight: 1.6,
 }}
>
 By continuing, you’re accessing ComplyPilot securely.
</p>
</div>
</div>
</div>
</div>
 );
}