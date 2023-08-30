import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <a href="/">
        <img src="/images/csgologo.png" />
        <h1>CSView</h1>
      </a>
      <div>
        <a href="/about">
          <img src="/images/info.svg" />
          <p>About</p>
        </a>
        <a href="/crosshairs">
          <img src="/images/crosshair.svg" />
          <p>View Crosshairs</p>
        </a>
        <a href="/matches">
          <img src="/images/trophy.svg" />
          <p>View Matches</p>
        </a>
        <a href="/multisearch">
          <img src="/images/group.svg" />
          <p>Search Game</p>
        </a>
        <a href="/search">
          <img src="/images/search.svg" style={{ rotate: "90deg" }} />
          <p>Search Player</p>
        </a>
      </div>
    </div>
  );
}
