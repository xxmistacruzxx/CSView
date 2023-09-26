import { useState, useEffect } from "react";
import Head from "next/head";
import $ from "jquery";

import styles from "~/styles/search.module.css";
import styles2 from "~/styles/searchResult.module.css";
import styles3 from "~/styles/error.module.css";
import Navbar from "~/components/navbar/navbar.jsx";
import Footer from "~/components/footer/footer.jsx";
import Loading from "~/components/loading/loading";

// import { getStats } from "~/data/scrape/csgostats/csgostatsscraper";

export default function Search(props) {
  function onSearch(event) {
    event.preventDefault();
    let query = $("#searchInput").val();
    let queryEdit = query.trim();
    if (queryEdit === "") {
      alert(`"${query}" is not a valid input.`);
      return;
    }
    window.location.replace(
      `${window.location.href.split("/")[0]}/search/${queryEdit}`
    );
  }

  // Search Result
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/search/${props.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
        setLoading(false);
      });
  }, []);

  // CS2 vs CSGO
  const [selGame, setSelGame] = useState("cs2");

  return (
    <main>
      <Navbar />
      <div id={styles.searchContainer}>
        <form id={styles.searchForm} onSubmit={onSearch}>
          <div
            className={styles.inputContainer}
            id={styles.searchInputContainer}
          >
            <label htmlFor="searchInput">Username/SteamID/URL</label>
            <div id={styles.searchInput}>
              <input
                id="searchInput"
                name="searchInput"
                type="text"
                placeholder="xxmistacruzxx"
              ></input>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="searchButton">Search</label>
            <div id={styles.searchButton}>
              <input
                id="searchButton"
                name="searchButton"
                type="submit"
                value="GO"
              ></input>
            </div>
          </div>
        </form>
        <div id={styles2.searchResultContainer}>
          <div id={styles2.searchResult}>
            {(() => {
              if (isLoading)
                return (
                  <>
                    <Head>
                      <title>Searching... | CSView</title>
                    </Head>
                    <Loading />
                  </>
                );
              else if (data.error !== undefined) {
                return (
                  <>
                    <Head>
                      <title>ERROR | CSView</title>
                    </Head>
                    <div className={styles3.error}>
                      <h2>ERROR</h2>
                      <p>
                        We were unable to find an account on{" "}
                        <a
                          href="https://www.csgostats.gg"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          csgostats
                        </a>{" "}
                        given your search. Please make sure your input is
                        correct and try again.
                      </p>
                      <p>
                        If you think this is an error on our end, please contact
                        the developers via the information in the footer of this
                        page.
                      </p>
                    </div>
                  </>
                );
              }
              return (
                <>
                  <Head>
                    <title>{data.general.playerName} | CSView</title>
                  </Head>
                  <div className={styles2.playerBanner}>
                    <a
                      href={data.general.playerLink}
                      className={styles2.player}
                    >
                      <img src={data.general.playerAvatar} />
                      <h2>{data.general.playerName}</h2>
                      <p>{data.general.id}</p>
                    </a>
                    <div className={styles2.ranks}>
                      <div style={{ gridColumn: "1/1", gridRow: "2/2" }}>
                        <h3>Rank</h3>
                      </div>
                      <div style={{ gridColumn: "1/1", gridRow: "3/3" }}>
                        <h3>Best</h3>
                      </div>
                      <div style={{ gridColumn: "1/1", gridRow: "4/4" }}>
                        <h3>Last Played</h3>
                      </div>
                      <div style={{ gridColumn: "2/2", gridRow: "1/1" }}>
                        <h3>CS2</h3>
                      </div>
                      <div style={{ gridColumn: "2/2", gridRow: "2/2" }}>
                        <p
                          className={styles2.cs2Rank}
                          style={{ backgroundImage: data.cs2.rankBackground }}
                        >
                          {data.cs2.rank}
                        </p>
                      </div>
                      <div style={{ gridColumn: "2/2", gridRow: "3/3" }}>
                        <p
                          className={styles2.cs2Rank}
                          style={{ backgroundImage: data.cs2.bestBackground }}
                        >
                          {data.cs2.best}
                        </p>
                      </div>
                      <div style={{ gridColumn: "2/2", gridRow: "4/4" }}>
                        <p>{data.cs2.lastPlayed}</p>
                      </div>
                      <div style={{ gridColumn: "3/3", gridRow: "1/1" }}>
                        <h3>CS:GO</h3>
                      </div>
                      <div style={{ gridColumn: "3/3", gridRow: "2/2" }}>
                        <img src={data.csgo.rank} />
                      </div>
                      <div style={{ gridColumn: "3/3", gridRow: "3/3" }}>
                        <img src={data.csgo.best} />
                      </div>
                      <div style={{ gridColumn: "3/3", gridRow: "4/4" }}>
                        <p>{data.csgo.lastPlayed}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      height: "2px",
                      backgroundColor: "var(--background-color2)",
                      marginBottom: "10px",
                      marginTop: "10px",
                    }}
                  />
                  <div className={styles2.gameSelector}>
                    <div>
                      <button
                        style={{
                          backgroundColor: (() => {
                            return selGame === "cs2"
                              ? "#c4a402"
                              : "var(--background-color2)";
                          })(),
                        }}
                        onClick={() => {
                          setSelGame("cs2");
                        }}
                      >
                        CS2
                      </button>
                    </div>
                    <div>
                      <button
                        style={{
                          backgroundColor: (() => {
                            return selGame === "csgo"
                              ? "#c4a402"
                              : "var(--background-color2)";
                          })(),
                        }}
                        onClick={() => {
                          setSelGame("csgo");
                        }}
                      >
                        CS:GO
                      </button>
                    </div>
                  </div>
                  <div className={styles2.stats}>
                    <h2 className={styles2.gameHeader}>
                      {(() => {
                        if (selGame === "cs2") return "CS2";
                        else return "CS:GO";
                      })()}{" "}
                      Stats
                    </h2>
                    <div className={styles2.mainStats}>
                      <div>
                        <h3>Wins</h3>
                        <p>{data[selGame].wins}</p>
                      </div>
                      <div>
                        <h3>K/D</h3>
                        <p>{data[selGame].inner.kpd}</p>
                      </div>
                      <div>
                        <h3>Rating</h3>
                        <p>{data[selGame].inner.kpd}</p>
                      </div>
                    </div>
                    <div className={styles2.boxedStats}>
                      <div className={styles2.statsBox}>
                        <h3>Win Rate: {data[selGame].inner.winRate.winRate}</h3>
                        <p>Played: {data[selGame].inner.winRate.played}</p>
                        <p>Won: {data[selGame].inner.winRate.won}</p>
                        <p>Lost: {data[selGame].inner.winRate.lost}</p>
                        <p>Tied: {data[selGame].inner.winRate.tied}</p>
                      </div>
                      <div className={styles2.statsBox}>
                        <h3>HS%: {data[selGame].inner.hs.hs}</h3>
                        <p>Kills: {data[selGame].inner.hs.kills}</p>
                        <p>Deaths: {data[selGame].inner.hs.deaths}</p>
                        <p>Assists: {data[selGame].inner.hs.assists}</p>
                        <p>Headshots: {data[selGame].inner.hs.headshots}</p>
                      </div>
                      <div className={styles2.statsBox}>
                        <h3>ADR: {data[selGame].inner.adr.adr}</h3>
                        <p>Damage: {data[selGame].inner.adr.damage}</p>
                        <p>Rounds: {data[selGame].inner.adr.rounds}</p>
                      </div>
                    </div>
                    <div className={styles2.clutch}>
                      <h2>
                        Clutch Success: {data[selGame].inner.clutch.clutch}
                      </h2>
                      <div>
                        <div>
                          <h4>1v1</h4>
                          <p>
                            {
                              data[selGame].inner.clutch.clutches["1"]
                                .percentage
                            }
                          </p>
                          <p>{data[selGame].inner.clutch.clutches["1"].raw}</p>
                        </div>
                        <div>
                          <h4>1v2</h4>
                          <p>
                            {
                              data[selGame].inner.clutch.clutches["2"]
                                .percentage
                            }
                          </p>
                          <p>{data[selGame].inner.clutch.clutches["2"].raw}</p>
                        </div>
                        <div>
                          <h4>1v3</h4>
                          <p>
                            {
                              data[selGame].inner.clutch.clutches["3"]
                                .percentage
                            }
                          </p>
                          <p>{data[selGame].inner.clutch.clutches["3"].raw}</p>
                        </div>
                        <div>
                          <h4>1v4</h4>
                          <p>
                            {
                              data[selGame].inner.clutch.clutches["4"]
                                .percentage
                            }
                          </p>
                          <p>{data[selGame].inner.clutch.clutches["4"].raw}</p>
                        </div>
                        <div>
                          <h4>1v5</h4>
                          <p>
                            {
                              data[selGame].inner.clutch.clutches["5"]
                                .percentage
                            }
                          </p>
                          <p>{data[selGame].inner.clutch.clutches["5"].raw}</p>
                        </div>
                      </div>
                    </div>
                    <div className={styles2.entry}>
                      <h2>
                        Entry per Round: {data[selGame].inner.entry.entry}
                      </h2>
                      <div>
                        <div style={{ gridColumn: "2/2", gridRow: "1/1" }}>
                          Combined
                        </div>
                        <div
                          style={{
                            gridColumn: "3/3",
                            gridRow: "1/1",
                            color: "orange",
                          }}
                        >
                          T
                        </div>
                        <div
                          style={{
                            gridColumn: "4/4",
                            gridRow: "1/1",
                            color: "#6495ED",
                          }}
                        >
                          CT
                        </div>
                        <div style={{ gridColumn: "1/1", gridRow: "2/2" }}>
                          Success
                        </div>
                        <div style={{ gridColumn: "2/2", gridRow: "2/2" }}>
                          {data[selGame].inner.entry.success.combined}
                        </div>
                        <div
                          style={{
                            gridColumn: "3/3",
                            gridRow: "2/2",
                            color: "orange",
                          }}
                        >
                          {data[selGame].inner.entry.success.t}
                        </div>
                        <div
                          style={{
                            gridColumn: "4/4",
                            gridRow: "2/2",
                            color: "#6495ED",
                          }}
                        >
                          {data[selGame].inner.entry.success.ct}
                        </div>
                        <div style={{ gridColumn: "1/1", gridRow: "3/3" }}>
                          Attempts
                        </div>
                        <div
                          style={{
                            gridColumn: "2/2",
                            gridRow: "3/3",
                            color: "var(--text-color2)",
                          }}
                        >
                          {data[selGame].inner.entry.attempts.combined}
                        </div>
                        <div
                          style={{
                            gridColumn: "3/3",
                            gridRow: "3/3",
                            color: "yellow",
                          }}
                        >
                          {data[selGame].inner.entry.attempts.t}
                        </div>
                        <div
                          style={{
                            gridColumn: "4/4",
                            gridRow: "3/3",
                            color: "lightblue",
                          }}
                        >
                          {data[selGame].inner.entry.attempts.ct}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  return { props: { id: id } };
}
