import styles from "~/styles/index.module.css";
import Navbar from "~/components/navbar/navbar.jsx";
import Footer from "~/components/footer/footer.jsx";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className={styles.bannerContainer}>
        <h2>CSView</h2>
        <p>Your new, light-weight, and all-in-one CS:GO companion.</p>
        <div>
          <h2>Packed with amazing features...</h2>
          <div className={styles.featureBoxesContainer}>
            <a href="/#search">
              <img src="/images/search.svg" />
              <h3>Player Stats Lookup</h3>
              <p>
                Lookup an individual player by their username or SteamID to see
                their stats and match history.
              </p>
            </a>
            <a href="/#multisearch">
              <img src="/images/group.svg" />
              <h3>Multi-player Lookup</h3>
              <p>
                Quickly lookup important stats about the players in your game,
                including your opponents.
              </p>
            </a>
            <a href="/#matches">
              <img src="/images/trophy.svg" />
              <h3>Pro Match Monitoring</h3>
              <p>
                See what professional matches are currently happening, as well
                as their current score, and where to watch them.
              </p>
            </a>
            <a href="/#crosshairs">
              <img src="/images/crosshair.svg" />
              <h3>Crosshair Repository</h3>
              <p>
                Browse crosshairs used by the best professional players and
                quickly copy their codes to use in your game.
              </p>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.features}>
        <div id="search">
          <div className={styles.featureContent}>
            <h2>Player Stats Lookup</h2>
            <p>
              Ever wanted to see your overall stats across your competitive
              matches?
              <br />
              What about your friends? What about your opponents?
              <br />
              Well, look no further!
              <br />
              <br />
              Simply look at a player's stats by entering their username,
              SteamID, or Steam Profile Link.
            </p>
            <a href="/search">Search Player</a>
          </div>
          <div
            className={styles.featureGraphic}
            id={styles.playerStatsLookupImage}
          >
            <img src="/images/search.svg" />
          </div>
        </div>
        <div id="multisearch">
          <div className={styles.featureContent}>
            <h2>Multi-player Lookup</h2>
            <p>
              Wanna see the ranks of the players on the other team?
              <br />
              What about the ranks of your own team?
              <br />
              <br />
              Simply copy and paste the status of your game into the
              multi-player lookup to see the whole game's ranks, stats, and
              parties.
            </p>
            <a href="/multisearch">Search Game</a>
          </div>
          <div className={styles.featureGraphic} id={styles.groupLookupImage}>
            <img src="/images/group.svg" />
          </div>
        </div>
        <div id="matches">
          <div className={styles.featureContent}>
            <h2>Pro Match Monitoring</h2>
            <p>
              Are you an avid viewer of professional CS:GO?
              <br />
              Need a way to view to the ongoing matches?
              <br />
              <br />
              Use the matches dashboard to view the current professional matches
              and navigate to places to watch them.
            </p>
            <a href="/matches">View Matches</a>
          </div>
          <div className={styles.featureGraphic} id={styles.proMatchImage}>
            <img src="/images/trophy.svg" />
          </div>
        </div>
        <div id="crosshairs">
          <div className={styles.featureContent}>
            <h2>Crosshair Repository</h2>
            <p>
              Are you new to CS:GO?
              <br />
              Do you need a new crosshair?
              <br />
              <br />
              Use the crosshair repository to browse and copy crosshairs used by
              professional players.
            </p>
            <a href="/crosshairs">View Crosshairs</a>
          </div>
          <div
            className={styles.featureGraphic}
            id={styles.crosshairRepositoryImage}
          >
            <img src="/images/crosshair.svg" />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
