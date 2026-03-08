import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html>
      <body
        style={{
          margin: 0,
          fontFamily: "sans-serif",
          display: "flex",
          background: "white",
          color: "black"
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            width: "260px",
            minHeight: "100vh",
            borderRight: "1px solid #e5e5e5",
            padding: "30px 20px",
            background: "white"
          }}
        >
          <h1 style={{ fontSize: "22px", marginBottom: "40px" }}>
            ComplyPilot
          </h1>

          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              fontSize: "18px",
              fontWeight: "500"
            }}
          >
            <Link href="/dashboard">Dashboard</Link>

            <Link href="/assessment">Assessment</Link>

            <Link href="/documents">Document Generation</Link>

            <a href="https://ai.complypilot.uk">AI</a>

            <Link href="/risks">Current Risks</Link>

            <Link href="/tasks">Priority Actions</Link>
          </nav>
        </div>

        {/* Page Content */}
        <div
          style={{
            flex: 1,
            padding: "60px"
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
