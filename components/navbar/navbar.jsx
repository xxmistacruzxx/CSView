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
          About
        </a>
        <a href="/crosshairs">
          <img src="/images/crosshair.svg" />
          View Crosshairs
        </a>
        <a href="/matches">
          <img src="/images/trophy.svg" />
          View Matches
        </a>
        <a href="/multisearch">
          <img src="/images/group.svg" />
          Search Game
        </a>
        <a href="/search">
          <img src="/images/search.svg" style={{ rotate: "90deg" }} />
          Search Player
        </a>
      </div>
    </div>
  );
}
