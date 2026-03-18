import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/assessment", label: "Assessment" },
  { href: "/documents", label: "Document Generation" },
  { href: "https://ai.complypilot.uk", label: "AI", external: true },
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
        className={inter.className}
        style={{
          margin: 0,
          background: "#f8fafc",
          color: "#0f172a",
        }}
      >
        <div style={{ display: "flex", minHeight: "100vh" }}>

          {/* SIDEBAR */}
          <aside
            style={{
              width: "280px",
              background: "#ffffff",
              borderRight: "1px solid #e2e8f0",
              padding: "28px 20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* LOGO AREA */}
            <div style={{ marginBottom: "32px" }}>
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                }}
              >
                ComplyPilot
              </div>

              <div
                style={{
                  fontSize: "13px",
                  color: "#64748b",
                  marginTop: "6px",
                }}
              >
                Compliance Platform
              </div>
            </div>

            {/* SECTION LABEL */}
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "12px",
                paddingLeft: "12px",
              }}
            >
              Platform
            </div>

            {/* NAV */}
            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
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

          {/* MAIN AREA */}
          <main
            style={{
              flex: 1,
              padding: "40px",
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
  fontSize: "16px",
  fontWeight: 600,
  padding: "14px 16px",
  borderRadius: "12px",
  display: "block",
  background: "#ffffff",
  border: "1px solid #f1f5f9",
};
