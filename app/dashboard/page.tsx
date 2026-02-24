import Link from "next/link";

export default function Dashboard() {
  return (
    <main style={container}>
      <h1 style={title}>ComplyPilot Dashboard</h1>

      {/* Top cards */}
      <div style={topGrid}>
        <div style={card}>
          <p style={label}>Compliance Score</p>
          <div style={score}>82%</div>
        </div>

        <div style={card}>
          <p style={label}>Open Risks</p>
          <div style={risk}>3</div>
        </div>

        <div style={card}>
          <p style={label}>Next Review</p>
          <div style={text}>12 March</div>
        </div>
      </div>

      {/* Next steps */}
      <div style={section}>
        <h2 style={sectionTitle}>Priority Actions</h2>

        <div style={card}>
          <ul style={list}>
            <li>Finish risk assessment</li>
            <li>Upload security policy</li>
            <li>Enable access reviews</li>
          </ul>

          <Link href="/next-steps">
            <button style={button}>View full plan →</button>
          </Link>
        </div>
      </div>

      {/* Documents */}
      <div style={section}>
        <h2 style={sectionTitle}>Documents</h2>

        <div style={card}>
          <p style={muted}>Generate compliance documents instantly</p>

          <Link href="/documents">
            <button style={button}>Open document center →</button>
          </Link>
        </div>
      </div>
    </main>
  );
}

/* styles */

const container = {
  background: "#f6f7f8",
  minHeight: "100vh",
  padding: "40px",
  fontFamily: "Inter, sans-serif",
};

const title = {
  fontSize: "28px",
  fontWeight: 600,
  marginBottom: "30px",
};

const topGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  marginBottom: "30px",
};

const section = {
  marginTop: "20px",
};

const sectionTitle = {
  fontSize: "20px",
  marginBottom: "12px",
};

const card = {
  background: "white",
  padding: "22px",
  borderRadius: "14px",
  border: "1px solid #e5e7eb",
};

const label = {
  fontSize: "13px",
  color: "#6b7280",
};

const score = {
  fontSize: "38px",
  fontWeight: 700,
  color: "#16a34a",
};

const risk = {
  fontSize: "34px",
  fontWeight: 700,
  color: "#dc2626",
};

const text = {
  fontSize: "20px",
  fontWeight: 600,
};

const muted = {
  color: "#6b7280",
  marginBottom: "10px",
};

const list = {
  paddingLeft: "18px",
  lineHeight: "1.8",
};

const button = {
  marginTop: "12px",
  background: "#111",
  color: "white",
  padding: "10px 14px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
};
