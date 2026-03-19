import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

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
  className={inter.variable}
  style={{
    margin: 0,
    background: "#f8fafc",
    color: "#0f172a",
    fontFamily: "var(--font-inter)", // 👈 THIS locks it in
  }}
>
        <div style={{ display: "flex", minHeight: "100vh" }}>
          {/* SIDEBAR */}
          <aside
            style={{
              width: "260px",
              background: "#ffffff",
              borderRight: "1px solid #e2e8f0",
              padding: "24px 16px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* LOGO */}
            <div style={{ marginBottom: "28px" }}>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                }}
              >
                ComplyPilot
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "#64748b",
                  marginTop: "4px",
                }}
              >
                Compliance Platform
              </div>
            </div>

            {/* SECTION LABEL */}
            <div
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "12px",
                paddingLeft: "8px",
              }}
            >
              Platform
            </div>

            {/* NAV */}
            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
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

          {/* MAIN */}
          <main
            style={{
              flex: 1,
              padding: "24px",
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
  fontWeight: 500,
  padding: "12px 14px",
  borderRadius: "10px",
  display: "block",
};
