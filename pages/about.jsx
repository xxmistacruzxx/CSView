import { useState } from "react";
import Head from "next/head";
import $ from "jquery";

import styles from "~/styles/about.module.css";
import Navbar from "~/components/navbar/navbar";
import Footer from "~/components/footer/footer";

export default function About() {
  function tabHandler(event) {
    let tabs = $("#aboutTabs")[0].children;
    for (let tab of tabs) tab.setAttribute("active", "false");
    let contents = $("#aboutContent")[0].children;
    for (let content of contents) content.setAttribute("active", "false");

    let tabId = event.target.id;
    event.target.setAttribute("active", "true");
    $(`#${tabId.substring(0, tabId.length - 3)}`)[0].setAttribute(
      "active",
      "true"
    );
  }

  return (
    <>
      <Head>
        <title>About | CSView</title>
      </Head>
      <main>
        <Navbar />
        <div className={styles.aboutContainer}>
          <div className={styles.about}>
            <div id="aboutTabs" className={styles.aboutTabs}>
              <button
                id="aboutCSViewTab"
                className={styles.aboutTab}
                active="true"
                onClick={tabHandler}
              >
                CSView
              </button>
              <button
                id="aboutMeTab"
                className={styles.aboutTab}
                onClick={tabHandler}
              >
                @xxmistacruzxx
              </button>
            </div>
            <div id="aboutContent" className={styles.aboutContent}>
              <div
                id="aboutCSView"
                className={styles.aboutSection}
                active="true"
              >
                <div className={styles.aboutBanner}>
                  <img src="/images/csgologo.png" />
                  <h2>CSView</h2>
                </div>
                <div className={styles.aboutBody}>
                  <h3>General</h3>
                  <p>
                    CSView, developed by @xxmistacruzxx, is a service designed
                    to provide insightful tools to Counter-Strike players.
                    <br />
                    <br />
                    The main features of CSView are...
                    <br />• Player Lookup - View an account's overall
                    performance stats and recent history.
                    <br />• Game/Multi-player Lookup - Get a quick glance at the
                    stats and history of all the players in your game.
                    <br />• Upcoming Professional Matches Listing - See all the
                    upcoming professional Counter-Strike matches.
                    <br />• Crosshair Repository - Access a variety of
                    crosshairs used by professional players and quickly copy
                    them to use in game.
                  </p>
                  <h3>Technical</h3>
                  <h4>Github Repo and Docker Image</h4>
                  <p>
                    CSView is an open source project who's{" "}
                    <a
                      href="https://github.com/xxmistacruzxx/CSView/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Github Repository can be found here.
                    </a>
                  </p>
                  <p>
                    CSView is also deployed using Docker, who's{" "}
                    <a
                      href="https://hub.docker.com/r/xxmistacruzxx/csview"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Docker Image can be found here.
                    </a>
                  </p>
                  <h4>Overview of Tools and Services</h4>
                  <p>
                    CSView uses{" "}
                    <a
                      href="https://www.csgostats.gg/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      csgostats.gg
                    </a>{" "}
                    to obtain Counter-Strike player data for the lookup
                    functionalities.
                  </p>
                  <p>
                    CSView also uses{" "}
                    <a
                      href="https://www.hltv.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      hltv.org
                    </a>{" "}
                    to obtain Counter-Strike professional match data for its
                    upcoming professional matches listing functionality.
                  </p>
                  <p>
                    CSView is built using a variety of development tools, such
                    as...
                    <br />•{" "}
                    <a
                      href="https://react.dev/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      React
                    </a>
                    <br />•{" "}
                    <a
                      href="https://nextjs.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Next
                    </a>
                    <br />•{" "}
                    <a
                      href="https://pptr.dev/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Puppeteer
                    </a>
                    <br />•{" "}
                    <a
                      href="https://axios-http.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Axios
                    </a>
                    <br />•{" "}
                    <a
                      href="https://jquery.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Jquery
                    </a>
                  </p>
                  <p>
                    CSView is deployed using...
                    <br />•{" "}
                    <a
                      href="https://www.oracle.com/cloud/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Oracle Cloud
                    </a>
                    <br />•{" "}
                    <a
                      href="https://www.docker.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Docker
                    </a>
                  </p>
                </div>
              </div>
              <div id="aboutMe" className={styles.aboutSection}>
                <div className={styles.aboutBanner}>
                  <img src="/images/me2.jpg" style={{ borderRadius: "50%" }} />
                  <h2>David Cruz</h2>
                </div>
                <div id={styles.myLinks}>
                  <a
                    id="linkedInLink"
                    href="https://www.linkedin.com/in/davidalexandercruz/"
                    title="LinkedIn"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <img src="/images/linkedin.png" />
                    <p>LinkedIn</p>
                  </a>
                  <a
                    id="githubLink"
                    href="https://github.com/xxmistacruzxx"
                    title="Github"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <img src="/images/github.png" />
                    <p>Github</p>
                  </a>
                  <a
                    href="https://xxmistacruzxx.github.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/images/web.svg" />
                    <p>Website</p>
                  </a>
                  <a
                    id="resumeLink"
                    href="https://drive.google.com/file/d/1ANYVE9pHHH9K74U8HtZmYNOnpWk3dwxN/view?usp=sharing"
                    title="Resume"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <img src="/images/pdf.png" />
                    <p>Resume</p>
                  </a>
                  <a
                    id="emailLink"
                    href="mailto: dcruz2@stevens.edu"
                    title="Send Email"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <img src="/images/email.png" />
                    <p>Email</p>
                  </a>
                </div>
                <div id={styles.myDescription}>
                  <p>
                    Hi, I'm David Cruz, a 4/4 Undergraduate at Stevens Institue
                    of Technology in Hoboken, NJ. I'm currently pursuing a
                    career in Web Development and UI/UX Design, hence CSView is
                    one of my passion projects to better familiarize myself with
                    the widely used frameworks and tools in current Web
                    Development.
                  </p>
                  <p>
                    Please feel free to browse my works and contact information
                    at the links provided above.
                  </p>
                  <p>
                    P.S. I'm also obviously a huge fan of Counter-Strike, so
                    feel free to add me on{" "}
                    <a
                      href="https://steamcommunity.com/id/xxmistacruzxx/"
                      title="Send Email"
                      target="_blank"
                      rel="noreferrer noopener"
                      style={{
                        color: "var(--text-color1)",
                        textDecoration: "none",
                        fontWeight: "bold",
                      }}
                    >
                      Steam
                    </a>{" "}
                    to play sometime. :)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
