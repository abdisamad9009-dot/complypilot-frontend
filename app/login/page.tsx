"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // ✅ NEW
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        router.push("/dashboard");
      } else {
        setChecking(false);
      }
    };

    checkUser();
  }, [router]);

  // ✅ LOGIN (email + password)
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      router.push("/dashboard");
    } else {
      alert(error.message);
    }
  };

  // ✅ SIGN UP
  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (!error) {
      alert("Account created. Now log in.");
    } else {
      alert(error.message);
    }
  };

  if (checking) return <div>Loading...</div>;

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
        {/* LEFT SIDE */}
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
        </div>

        {/* RIGHT SIDE */}
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
              }}
            >
              Login or create an account below.
            </p>

            <div style={{ display: "grid", gap: "14px" }}>
              {/* EMAIL */}
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "16px 18px",
                  borderRadius: "14px",
                  border: "1px solid #d1d5db",
                }}
              />

              {/* PASSWORD */}
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "16px 18px",
                  borderRadius: "14px",
                  border: "1px solid #d1d5db",
                }}
              />

              {/* LOGIN */}
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
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Log In
              </button>

              {/* SIGN UP */}
              <button
                onClick={handleSignup}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "14px",
                  border: "1px solid #d1d5db",
                  background: "#fff",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
