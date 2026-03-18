import Link from "next/link";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/assessment", label: "Assessment" },
  { href: "/documents", label: "Document Generation" },
  { href: "https://ai.complypilot.online", label: "AI", external: true },
  { href: "/risks", label: "Current Risks" },
  { href: "/tasks", label: "Priority Actions" },
];

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
          background: "#f8fafc",
          color: "#0f172a",
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <aside
            style={{
              width: "260px",
              background: "#ffffff",
              borderRight: "1px solid #e2e8f0",
              padding: "28px 18px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#0f172a",
                marginBottom: "24px",
              }}
            >
              ComplyPilot
            </div>

            <div
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "10px",
                paddingLeft: "10px",
              }}
            >
              Platform
            </div>

            <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {navItems.map((item) =>
                item.external ? (
                  <a key={item.label} href={item.href} style={navLink}>
                    {item.label}
                  </a>
                ) : (
                  <Link key={item.label} href={item.href} style={navLink}>
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          </aside>

          <main
            style={{
              flex: 1,
              padding: "32px",
              background: "#f8fafc",
            }}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

const navLink: React.CSSProperties = {
  color: "#0f172a",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: 600,
  padding: "12px 14px",
  borderRadius: "12px",
  display: "block",
  background: "#ffffff",
  border: "1px solid #f1f5f9",
};
