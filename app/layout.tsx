import Link from "next/link";

const navLinkStyle = {
  color: "#111111",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: 500,
  padding: "12px 14px",
  borderRadius: "10px",
  display: "block",
  marginBottom: "6px",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#ffffff",
          color: "#111111",
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <aside
            style={{
              width: "260px",
              background: "#ffffff",
              borderRight: "1px solid #e5e7eb",
              padding: "28px 18px",
            }}
          >
            <div
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#111111",
                marginBottom: "28px",
                letterSpacing: "-0.02em",
              }}
            >
              ComplyPilot
            </div>

            <nav>
              <Link href="/dashboard" style={navLinkStyle}>
                Dashboard
              </Link>

              <Link href="/assessment" style={navLinkStyle}>
                Assessment
              </Link>

              <Link href="/documents" style={navLinkStyle}>
                Document Generation
              </Link>

              <a
                href="https://ai.complypilot.uk"
                style={navLinkStyle}
              >
                AI
              </a>

              <Link href="/risks" style={navLinkStyle}>
                Current Risks
              </Link>

              <Link href="/tasks" style={navLinkStyle}>
                Priority Actions
              </Link>
            </nav>
          </aside>

          <main
            style={{
              flex: 1,
              background: "#ffffff",
              padding: "48px",
            }}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
