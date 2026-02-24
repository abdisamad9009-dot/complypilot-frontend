export default function Dashboard() {
  return (
    <main style={container}>
      <header style={header}>
        <h1 style={logo}>ComplyPilot</h1>
      </header>

      <div style={content}>
        <h2 style={pageTitle}>Dashboard</h2>

        <div style={grid}>
          {/* Compliance Score */}
          <div style={card}>
            <p style={cardLabel}>Compliance Score</p>
            <div style={score}>84%</div>
            <p style={muted}>Good standing</p>
          </div>

          {/* Next Steps */}
          <div style={card}>
            <p style={cardLabel}>Next Steps</p>
            <ul style={list}>
              <li>Finish risk assessment</li>
              <li>Upload security policy</li>
              <li>Generate SOC2 report</li>
            </ul>
          </div>

          {/* Risk */}
          <div style={card}>
            <p style={cardLabel}>Risk Level</p>
            <div style={risk}>Medium</div>
            <p style={muted}>2 items need attention</p>
          </div>

          {/* Documents */}
          <div style={card}>
            <p style={cardLabel}>Documents</p>
            <button style={primaryBtn}>Generate Policy</button>
            <div style={{ height: 10 }} />
            <button style={secondaryBtn}>Download Report</button>
          </div>
        </div>
      </div>
    </main>
  );
}

/* STYLES */

const container = {
  background: "#f5f6f7",
  minHeight: "100vh",
  fontFamily: "Inter, system-ui, sans-serif",
};

const header = {
  background: "white",
  padding: "16px 28px",
  borderBottom: "1px solid #e5e7eb",
};

const logo = {
  fontSize: "18px",
  fontWeight: 600,
};

const content = {
  padding: "40px",
};

const pageTitle = {
  fontSize: "28px",
  fontWeight: 600,
  marginBottom: "30px",
};

const grid = {
  display: "grid",
  gap: "20px",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
};

const card = {
  background: "white",
  padding: "22px",
  borderRadius: "14px",
  border: "1px solid #e5e7eb",
};

const cardLabel = {
  fontSize: "13px",
  color: "#6b7280",
  marginBottom: "10px",
};

const score = {
  fontSize: "42px",
  fontWeight: 700,
  color: "#16a34a",
};

const risk = {
  fontSize: "28px",
  fontWeight: 600,
};

const muted = {
  fontSize: "13px",
  color: "#6b7280",
};

const list = {
  paddingLeft: "18px",
  fontSize: "14px",
  lineHeight: "1.7",
};

const primaryBtn = {
  background: "#16a34a",
  color: "white",
  padding: "10px 14px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontWeight: 500,
};

const secondaryBtn = {
  background: "#eef0f1",
  color: "#111",
  padding: "10px 14px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
};
