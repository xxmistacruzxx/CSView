import { useState, useEffect } from "react";
import Head from "next/head";
import $ from "jquery";

import styles from "~/styles/matches.module.css";
import styles2 from "~/styles/error.module.css";
import Navbar from "~/components/navbar/navbar";
import Footer from "~/components/footer/footer";
import Loading from "~/components/loading/loading";

export default function Matches() {
  // Search Result
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/matches/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Matches | CSView</title>
      </Head>
      <main>
        <Navbar />
        <div id={styles.contentContainer}>
          <div id={styles.matchesContainer}>
            <div id={styles.matches}>
              {(() => {
                if (isLoading) return <Loading />;
                if (data.error !== undefined)
                  return (
                    <div className={styles2.error}>
                      <h2>ERROR</h2>
                      <p>
                        We were unable to look up the upcoming matches from{" "}
                        <a
                          href="https://www.hltv.org/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          HLTV
                        </a>
                        . Please wait 30 seconds and try again.
                      </p>
                      <p>
                        If this error persists, please contact the developers
                        via the information in the footer of this page.
                      </p>
                    </div>
                  );
                return data.data.map((section) =>
                  createSectionElement(section)
                );
              })()}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}

function createSectionElement(sectionData) {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionHeader}>{sectionData.date}</h2>
      <div className={styles.sectionMatches}>
        {(() => {
          return sectionData.matches.map((match) => createMatchElement(match));
        })()}
      </div>
    </div>
  );
}

function createMatchElement(matchData) {
  return (
    <a
      className={styles.match}
      target="_blank"
      rel="noopener"
      href={matchData.link}
    >
      <div className={styles.matchInfo}>
        <div>{matchData.time}</div>
        <div>{matchData.meta}</div>
      </div>
      {(() => {
        if (matchData.placeholder !== undefined)
          return (
            <div className={styles.matchContent}>
              <div className={styles.placeholder}>{matchData.placeholder}</div>
            </div>
          );

        return (
          <div className={styles.matchContent}>
            <div className={styles.teams}>
              <div className={styles.team}>
                <div>
                  <img src={matchData.team1.img} />
                </div>
                <div>{matchData.team1.name}</div>
              </div>
              <div className={styles.team}>
                <div>
                  <img src={matchData.team2.img} />
                </div>
                <div>{matchData.team2.name}</div>
              </div>
            </div>
            <div className={styles.event}>
              <div className={styles.eventImgContainer}>
                <img src={matchData.event.img} />
              </div>
              <div className={styles.eventNameContainer}>
                <div>{matchData.event.name}</div>
              </div>
            </div>
          </div>
        );
      })()}
    </a>
  );
}
