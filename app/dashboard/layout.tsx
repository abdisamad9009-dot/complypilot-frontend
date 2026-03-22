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
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "260px",
          borderRight: "1px solid #e5e7eb",
          padding: "32px 24px",
          background: "#ffffff",
        }}
      >
        <h1
          style={{
            fontSize: "20px",
            fontWeight: 600,
            marginBottom: "40px",
          }}
        >
          ComplyPilot
        </h1>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <Link href="/dashboard" style={link}>Dashboard</Link>
          <Link href="/assessment" style={link}>Assessment</Link>
          <Link href="/documents" style={link}>Document Generation</Link>
          <a href="https://ai.complypilot.uk" style={link}>AI</a>
          <Link href="/risks" style={link}>Current Risks</Link>
          <Link href="/tasks" style={link}>Priority Actions</Link>
        </nav>
      </div>

      {/* Main content */}
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
  padding: "10px 12px",
  borderRadius: "8px",
};
