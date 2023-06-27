import { useState, useEffect } from "react";
import $ from "jquery";

import styles from "~/styles/search.module.css";
import styles2 from "~/styles/searchResult.module.css";
import Navbar from "~/components/navbar/navbar.jsx";
import Footer from "~/components/footer/footer.jsx";

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
                  <div className={styles2.loading}>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                );
              else
                return (
                  <>
                    <div id={styles2.banner}>
                      <div id={styles2.user}>
                        <img src={`${data.profPic}`} />
                        <h2>{data.username}</h2>
                        <p>{data.lastGame}</p>
                      </div>
                      <div id={styles2.quickInfo}>
                        <div id={styles2.ranks}>
                          <div>
                            <h3>Current Rank</h3>
                            <img src={`${data.currRankImg}`} />
                          </div>
                          <div>
                            <h3>Best Rank</h3>
                            <img src={`${data.bestRankImg}`} />
                          </div>
                        </div>
                        <div id={styles2.quickStats}>
                          <div>
                            <h3>K/D</h3>
                            <p>{`${data.kpd}`}</p>
                          </div>
                          <div>
                            <h3>HLTV Rating</h3>
                            <p>{`${data.hltv}`}</p>
                          </div>
                          <div>
                            <h3>Competitive Wins</h3>
                            <p>{`${data.compWins}`}</p>
                          </div>
                        </div>
                        <div className={styles2.statSection}>
                          <h3>Win Rate: {`${data.winrate.winrate}`}</h3>
                          <div id={styles2.winRate} className={styles2.statRow}>
                            <div>
                              <h4>Played</h4>
                              <p>{`${data.winrate.Played}`}</p>
                            </div>
                            <div>
                              <h4>Won</h4>
                              <p>{`${data.winrate.Won}`}</p>
                            </div>
                            <div>
                              <h4>Lost</h4>
                              <p>{`${data.winrate.Lost}`}</p>
                            </div>
                            <div>
                              <h4>Drew</h4>
                              <p>{`${data.winrate.Drew}`}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id={styles2.profileBody}>
                      <div id={styles2.stats}>
                        <div className={styles2.statSection}>
                          <h3>HS%: {`${data["hs%"]["hs%"]}`}</h3>
                          <div id={styles2.hs} className={styles2.statRow}>
                            <div>
                              <h4>Kills</h4>
                              <p>{`${data["hs%"].Kills}`}</p>
                            </div>
                            <div>
                              <h4>Deaths</h4>
                              <p>{`${data["hs%"].Deaths}`}</p>
                            </div>
                            <div>
                              <h4>Assists</h4>
                              <p>{`${data["hs%"].Assists}`}</p>
                            </div>
                            <div>
                              <h4>Headshots</h4>
                              <p>{`${data["hs%"].Headshots}`}</p>
                            </div>
                          </div>
                        </div>
                        <div className={styles2.statSection}>
                          <h3>ADR: {`${data.adr.adr}`}</h3>
                          <div id={styles2.adr} className={styles2.statRow}>
                            <div>
                              <h4>Damage</h4>
                              <p>{`${data.adr.Damage}`}</p>
                            </div>
                            <div>
                              <h4>Rounds</h4>
                              <p>{`${data.adr.Rounds}`}</p>
                            </div>
                          </div>
                        </div>
                        <div className={styles2.statSection}>
                          <h3>Clutch Success</h3>
                          <div id={styles2.clutch} className={styles2.statRow}>
                            <div className={styles2.cluchRate}>
                              <h4>1v1</h4>
                              <p>{`${data.clutch["1v1"]}`}</p>
                            </div>
                            <div className={styles2.cluchRate}>
                              <h4>1v2</h4>
                              <p>{`${data.clutch["1v2"]}`}</p>
                            </div>
                            <div className={styles2.cluchRate}>
                              <h4>1v3</h4>
                              <p>{`${data.clutch["1v3"]}`}</p>
                            </div>
                            <div className={styles2.cluchRate}>
                              <h4>1v4</h4>
                              <p>{`${data.clutch["1v4"]}`}</p>
                            </div>
                            <div className={styles2.cluchRate}>
                              <h4>1v5</h4>
                              <p>{`${data.clutch["1v5"]}`}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div id={styles2.entry}>
                          <h3>
                            Entry Success | Per Round: {`${data.entry.overall}`}
                          </h3>
                          <div>
                            <div
                              style={{
                                gridRow: "1/1",
                                gridColumn: "2/2",
                                color: "var(--text-color1)",
                              }}
                            >
                              Combined
                            </div>
                            <div
                              style={{
                                gridRow: "1/1",
                                gridColumn: "3/3",
                                color: "var(--text-color1)",
                              }}
                            >
                              T Entries
                            </div>
                            <div
                              style={{
                                gridRow: "1/1",
                                gridColumn: "4/4",
                                color: "var(--text-color1)",
                              }}
                            >
                              CT Entries
                            </div>

                            <div
                              style={{
                                gridRow: "2/2",
                                gridColumn: "1/1",
                                color: "var(--text-color1)",
                              }}
                            >
                              Success
                            </div>
                            <div
                              style={{
                                gridRow: "2/2",
                                gridColumn: "2/2",
                                color: "var(--text-color2)",
                              }}
                            >{`${data.entry.success[0]}`}</div>
                            <div
                              style={{
                                gridRow: "2/2",
                                gridColumn: "3/3",
                                color: "#ee7752",
                              }}
                            >{`${data.entry.success[1]}`}</div>
                            <div
                              style={{
                                gridRow: "2/2",
                                gridColumn: "4/4",
                                color: "#23a6d5",
                              }}
                            >{`${data.entry.success[2]}`}</div>

                            <div
                              style={{
                                gridRow: "3/3",
                                gridColumn: "1/1",
                                color: "var(--text-color1)",
                              }}
                            >
                              Attempts
                            </div>
                            <div
                              style={{
                                gridRow: "3/3",
                                gridColumn: "2/2",
                                color: "var(--text-color2)",
                              }}
                            >{`${data.entry.attempts[0]}`}</div>
                            <div
                              style={{
                                gridRow: "3/3",
                                gridColumn: "3/3",
                                color: "#ee7752",
                              }}
                            >{`${data.entry.attempts[1]}`}</div>
                            <div
                              style={{
                                gridRow: "3/3",
                                gridColumn: "4/4",
                                color: "#23a6d5",
                              }}
                            >{`${data.entry.attempts[2]}`}</div>
                          </div>
                        </div>
                        <div id={styles2.played}>
                          <h3>Most Played Maps</h3>
                          <div>
                            <div>
                              <div>{`${data.played[0][0]}`}</div>
                              <div>{`${data.played[0][1]}`}</div>
                            </div>
                            <div>
                              <div>{`${data.played[1][0]}`}</div>
                              <div>{`${data.played[1][1]}`}</div>
                            </div>
                            <div>
                              <div>{`${data.played[2][0]}`}</div>
                              <div>{`${data.played[2][1]}`}</div>
                            </div>
                            <div>
                              <div>{`${data.played[3][0]}`}</div>
                              <div>{`${data.played[3][1]}`}</div>
                            </div>
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
