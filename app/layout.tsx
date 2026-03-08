import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html>
      <body style={{ margin: 0, fontFamily: "sans-serif", display: "flex" }}>
        
        {/* Sidebar */}
        <div
          style={{
            width: "220px",
            minHeight: "100vh",
            borderRight: "1px solid #eee",
            padding: "20px",
            background: "#fafafa"
          }}
        >
          <h2>ComplyPilot</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "30px" }}>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/assessment">Assessment</Link>
            <Link href="/tasks">Tasks</Link>
          </div>
        </div>

        {/* Page Content */}
        <div style={{ flex: 1, padding: "40px" }}>
          {children}
        </div>

      </body>
    </html>
  );
}
