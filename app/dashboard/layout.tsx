import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html>
      <body
        style={{
          margin: 0,
          fontFamily: "Inter, sans-serif",
          display: "flex",
          background: "#ffffff",
          color: "#000",
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            width: "260px",
            minHeight: "100vh",
            borderRight: "1px solid #e5e5e5",
            padding: "32px 24px",
            background: "#ffffff",
          }}
        >
          <h1
            style={{
              fontSize: "20px",
              fontWeight: 600,
              marginBottom: "40px",
              color: "#000",
            }}
          >
            ComplyPilot
          </h1>

          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
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

        {/* Main content */}
        <div
          style={{
            flex: 1,
            padding: "60px",
            background: "#ffffff",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}

const link = {
  color: "#000",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: 500,
  padding: "10px 12px",
  borderRadius: "8px",
};
