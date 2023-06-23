import styles from "./footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div id={styles.powered}>
        <div className={styles.poweredSection} id={styles.csgostats}>
          <h2>
            <p>Powered by </p>{" "}
            <a
              href="https://csgostats.gg/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <mark>csgo</mark>
              stats.gg
            </a>
          </h2>
          <p>
            csgostats.gg is a CS:GO stats viewing service developed by{" "}
            <a
              href="https://twitter.com/_rchh"
              target="_blank"
              rel="noopener noreferrer"
            >
              rchh
            </a>{" "}
            from ESL Gaming. CSView uses csgostats.gg to obtain data regarding
            CS:GO user stats.
          </p>
        </div>
        <div className={styles.poweredSection} id={styles.hltv}>
          <h2>
            <p>Powered by</p>
            <a
              href="https://www.hltv.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/hltv.png" />
              HLTV
            </a>
          </h2>
          <p>
            HLTV is a news and forum website that covers CS:GO eSports. CSView
            uses HLTV to obtain data regarding CS:GO professional matches.
          </p>
        </div>
      </div>
      <div className={styles.seperator} />
      <div id={styles.developerContainer}>
        <div id={styles.developer}>
          <img src="/images/me.PNG" />
          <div id={styles.developerLinks}>
            <a
              href="https://xxmistacruzxx.github.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/web.svg" />
              <p>Website</p>
            </a>
            <a
              href="https://github.com/xxmistacruzxx"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/github.png" />
              <p>Github</p>
            </a>
            <a
              href="https://www.linkedin.com/in/davidalexandercruz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/linkedin.png" />
              <p>LinkedIn</p>
            </a>
          </div>
        </div>
        <div id={styles.developerInfo}>
          <h2>Developed by @xxmistacruzxx</h2>
          <p>
            Hi, I'm David Cruz, a 4/4 Undergraduate at Stevens Institute of
            Technology, pursuing a career in Web Development.
            <br />
            Please feel free to browse my works and contact information at the
            links provided above.
          </p>
        </div>
      </div>
    </div>
  );
}
