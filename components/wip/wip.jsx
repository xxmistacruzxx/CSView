export default function Wip() {
    return <div
      style={{
        height: "500px",
        color: "var(--text-color1)",
        textAlign: "center",
      }}
    >
      <h1>This Page is a Work in Progress</h1>
      <p style={{ color: "var(--text-color2)" }}>
        Click{" "}
        <a
          href="/"
          style={{
            color: "var(--text-color1)",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          here
        </a>{" "}
        to go home.
      </p>
    </div>
}