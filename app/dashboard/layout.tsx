import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f3f4f6",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "260px",
          background: "#f9fafb",
          padding: "32px 20px",
          boxShadow: "4px 0 12px rgba(0,0,0,0.08)",
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "20px",
              fontWeight: 600,
              marginBottom: "4px",
              color: "#111827",
              marginTop: 0,
            }}
          >
            ComplyPilot
          </h1>
          <p
            style={{
              fontSize: "12px",
              color: "#6b7280",
              margin: 0,
            }}
          >
            Compliance Software
          </p>
        </div>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            flex: 1,
          }}
        >
          <Link href="/dashboard" style={link}>
            Dashboard
          </Link>
          <Link href="/assessment" style={link}>
            Assessment
          </Link>
          <Link href="/documents" style={link}>
            Document Generation
          </Link>
          <a href="https://ai.complypilot.uk" style={link}>
            AI
          </a>
          <Link href="/risks" style={link}>
            Current Risks
          </Link>
          <Link href="/tasks" style={link}>
            Priority Actions
          </Link>
        </nav>
      </div>

      {/* Main */}
      <div
        style={{
          flex: 1,
          padding: "40px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

const link = {
  color: "#111827",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: 500,
  padding: "12px 14px",
  borderRadius: "10px",
  background: "#f3f4f6",
  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  display: "block",
};
