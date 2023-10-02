import axios from "axios";
import $ from "jquery";
import { useState } from "react";

import Navbar from "~/components/navbar/navbar";
import Footer from "~/components/footer/footer";
import Wip from "~/components/wip/wip";
import Head from "next/head";

import styles from "~/styles/multisearch.module.css";
import Loading from "~/components/loading/loading";
import Quickstats from "~/components/quickstats/quickstats";

export default function Multisearch() {
  const exampleStatusText = `Connected to =[A:1:3641022475:18246]:0
  hostname: Valve CS:GO EU West Server (srcds203-fra2.272.217)
  version : 1.37.9.9 secure
  os      :  Linux
  type    :  official dedicated
  map     : de_inferno
  players : 10 humans, 0 bots (20/0 max) (not hibernating)
  # userid name uniqueid connected ping loss state rate
  # 613 2 "            " STEAM_1:0:000000 09:21 64 0 active 196608
  # 585 3 "     " STEAM_1:0:000000 31:16 50 0 active 196608
  # 637 4 "rchh" STEAM_1:0:404014 00:34 50 0 active 786432
  # 610 5 "          " STEAM_1:1:000000 12:52 58 0 active 196608
  # 624 6 "         " STEAM_1:0:000000 09:04 108 0 active 196608
  # 625 7 "     " STEAM_1:0:000000 09:04 120 0 active 196608
  # 588 8 "         " STEAM_1:0:000000 31:03 45 0 active 307200
  # 635 9 "             " STEAM_1:1:000000 03:22 55 0 active 196608
  # 626 10 "             " STEAM_1:0:000000 09:03 132 0 active 196608
  # 607 11 "        " STEAM_1:1:000000 16:09 46 0 active 196608
  #end`;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function multiSearch(event) {
    event.preventDefault();
    setLoading(true);

    let text = $("#statusText").val();
    let res;
    try {
      res = await axios.post(
        `${window.location.href.split("/")[0]}/api/multisearch/`,
        {
          statusText: text,
        }
      );
    } catch (e) {
      alert(e.toString());
      setData(null);
      setLoading(false);
      return;
    }

    console.log(res);
    setData(res.data);
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Multisearch | CSView</title>
      </Head>
      <main>
        <Navbar />
        <div className={styles.multiSearchContainer}>
          {(() => {
            if (loading)
              return (
                <div style={{ marginBottom: "20%" }}>
                  <Loading />
                </div>
              );
            if (!loading && data === null)
              return (
                <>
                  <div className={styles.searchTips}>
                    <h2>How to use Multi Player Search</h2>
                    <ol>
                      <li>
                        Connect to your match and wait for all players to
                        connect.
                      </li>
                      <li>
                        Press ~ to open the CS:GO console window.
                        <br />
                        If your developer console is not enabled, you must
                        enable it first.
                      </li>
                      <li>Type status and press enter or return.</li>
                      <li>
                        Copy the full status text and paste it into the form.
                      </li>
                    </ol>
                  </div>

                  <form
                    className={styles.multiSearchForm}
                    onSubmit={multiSearch}
                  >
                    <textarea
                      name="statusText"
                      id="statusText"
                      placeholder={exampleStatusText}
                    ></textarea>
                    <button type="submit">Submit</button>
                  </form>
                </>
              );
            if (!loading && data !== null)
              return (
                <>
                  {(() => {
                    let elems = data.data.map((playerData) => {
                      return (
                        <Quickstats
                          data={playerData}
                          key={playerData.general.id}
                        />
                      );
                    });

                    return (
                      <>
                        <h2>Team 1</h2>
                        <div className={styles.searchResultContainer}>
                          {elems.slice(0, 5)}
                        </div>

                        <h2>Team 2</h2>
                        <div className={styles.searchResultContainer}>
                          {elems.slice(5, 10)}
                        </div>
                      </>
                    );
                  })()}
                </>
              );
          })()}
        </div>
        <Footer />
      </main>
    </>
  );
}
