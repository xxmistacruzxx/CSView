import Head from "next/head";

import styles from "~/styles/crosshairs.module.css";
import Navbar from "~/components/navbar/navbar";
import Footer from "~/components/footer/footer";
import Wip from "~/components/wip/wip";
import Crosshair from "~/components/crosshair/crosshair";

export default function Crosshairs() {
  const names = [
    [
      "apEX",
      "cl_crosshair_drawoutline 0;cl_crosshaircolor 4;cl_crosshairdot 0;cl_crosshairgap -1;cl_crosshairsize 6;cl_crosshairstyle 4;cl_crosshairthickness 1",
    ],
    [
      "Boombl4",
      "cl_crosshairgap -3; cl_crosshairsize 3; cl_crosshairalpha 255; cl_crosshaircolor 2; cl_crosshairdot 0; cl_crosshairstyle 4; cl_crosshairusealpha 1; cl_crosshairthickness 0; cl_crosshair_sniper_width 1; cl_crosshair_drawoutline 0;",
    ],
    [
      "coldzera",
      "cl_crosshair_drawoutline 0;cl_crosshaircolor 1;cl_crosshairdot 1;cl_crosshairgap 1;cl_crosshairsize 2.3;cl_crosshairstyle 4;cl_crosshairthickness 1",
    ],
    [
      "dev1ce",
      "cl_crosshair_drawoutline 1;cl_crosshair_outlinethickness 1;cl_crosshaircolor 2;cl_crosshairdot 0;cl_crosshairgap -1;cl_crosshairsize 3;cl_crosshairstyle 4;cl_crosshairthickness 1",
    ],
    [
      "dupreeh",
      "cl_crosshair_drawoutline 1;cl_crosshair_outlinethickness 1;cl_crosshaircolor 1;cl_crosshairdot 0;cl_crosshairgap -2;cl_crosshairsize 3;cl_crosshairstyle 4;cl_crosshairthickness 1",
    ],
    [
      "electronic",
      "cl_crosshair_drawoutline 0;cl_crosshaircolor 1;cl_crosshairdot 0;cl_crosshairgap -3;cl_crosshairsize 4;cl_crosshairstyle 4;cl_crosshairthickness 1",
    ],
    [
      "FalleN",
      "cl_crosshair_drawoutline 0;cl_crosshair_outlinethickness 1;cl_crosshaircolor 1;cl_crosshairdot 0;cl_crosshairgap -1.5;cl_crosshairsize 4;cl_crosshairstyle 4;cl_crosshairthickness 1",
    ],
    [
      "flamie",
      "cl_crosshair_drawoutline 0;cl_crosshaircolor 1;cl_crosshairdot 0;cl_crosshairgap -1;cl_crosshairsize 5;cl_crosshairstyle 4;cl_crosshairthickness 1",
    ],
    [
      "flusha",
      "cl_crosshair_drawoutline 0;cl_crosshaircolor 5;cl_crosshairdot 0;cl_crosshairgap -3;cl_crosshairsize 3;cl_crosshairstyle 4;cl_crosshairthickness 1",
    ],
    [
      "forest",
      "cl_crosshair_drawoutline 0;cl_crosshaircolor 1;cl_crosshairdot 0;cl_crosshairgap -1;cl_crosshairsize 6;cl_crosshairstyle 4;cl_crosshairthickness 1",
    ],
    [
      "GeT_RiGhT",
      "cl_crosshair_drawoutline 0;cl_crosshaircolor 1;cl_crosshairdot 0;cl_crosshairgap -1;cl_crosshairsize 5;cl_crosshairstyle 4;cl_crosshairthickness 1.15",
    ],
    [
      "gla1ve",
      "cl_crosshair_drawoutline 0;cl_crosshaircolor 1;cl_crosshairdot 0;cl_crosshairgap -2;cl_crosshairsize 3;cl_crosshairstyle 4;cl_crosshairthickness 1",
    ],
    [
      "GuardiaN",
      "cl_crosshair_drawoutline 0;cl_crosshaircolor 1;cl_crosshairdot 0;cl_crosshairgap 0;cl_crosshairsize 2;cl_crosshairstyle 4;cl_crosshairthickness 0.5",
    ],
    [
      "JW",
      "cl_crosshair_drawoutline 0;cl_crosshaircolor 1;cl_crosshairdot 0;cl_crosshairgap -1;cl_crosshairsize 4;cl_crosshairstyle 4;cl_crosshairthickness 1",
    ],
    [
      "Karrigan",
      "cl_crosshairalpha 255; cl_crosshaircolor 1; cl_crosshairdot 0; cl_crosshairgap -2; cl_crosshairsize 3; cl_crosshairstyle 4; cl_crosshairusealpha 1; cl_crosshairthickness 1; cl_crosshair_drawoutline 0;",
    ],
    [
      "kennyS",
      "cl_crosshair_drawoutline 1;cl_crosshair_outlinethickness 1;cl_crosshaircolor 4;cl_crosshairdot 0;cl_crosshairgap -1;cl_crosshairsize 3;cl_crosshairstyle 4;cl_crosshairthickness 1",
    ],
    [
      "KRIMZ",
      "cl_crosshair_drawoutline 0;cl_crosshaircolor 1;cl_crosshairdot 0;cl_crosshairgap -3;cl_crosshairsize 3;cl_crosshairstyle 4;cl_crosshairthickness 1",
    ],
    [
      "Magisk",
      "cl_crosshair_drawoutline 1;cl_crosshaircolor 0;cl_crosshairdot 0;cl_crosshairgap -1;cl_crosshairsize 1;cl_crosshairstyle 4;cl_crosshairthickness 0",
    ],
    [
      "NiKo",
      "cl_crosshair_drawoutline 0;cl_crosshaircolor 4;cl_crosshairdot 0;cl_crosshairgap -1;cl_crosshairsize 1;cl_crosshairstyle 4;cl_crosshairthickness 0.5",
    ],
    [
      "olofmeister",
      "cl_crosshair_drawoutline 0;cl_crosshaircolor 1;cl_crosshairdot 0;cl_crosshairgap -2.5;cl_crosshairsize 4;cl_crosshairstyle 4;cl_crosshairthickness 0",
    ],
    [
      "rain",
      "cl_crosshair_drawoutline 0;cl_crosshaircolor 1;cl_crosshairdot 0;cl_crosshairgap -2;cl_crosshairgap_useweaponvalue 0;cl_crosshairsize 2;cl_crosshairstyle 4;cl_crosshairthickness 0",
    ],
    [
      "s1mple",
      "cl_crosshair_drawoutline 1;cl_crosshaircolor 1;cl_crosshairdot 0;cl_crosshairgap 0;cl_crosshairsize 2;cl_crosshairstyle 4;cl_crosshairthickness 0",
    ],
    [
      "Snax",
      "cl_crosshair_drawoutline 0;cl_crosshaircolor 1;cl_crosshairdot 0;cl_crosshairgap -1;cl_crosshairsize 3.5;cl_crosshairstyle 4;cl_crosshairthickness 0",
    ],
    [
      "Stewie2k",
      "cl_crosshair_drawoutline 0;cl_crosshaircolor 1;cl_crosshairdot 0;cl_crosshairgap -1.5;cl_crosshairsize 4.5;cl_crosshairstyle 4;cl_crosshairthickness 1",
    ],
    [
      "Xyp9x",
      "cl_crosshair_drawoutline 0;cl_crosshaircolor 1;cl_crosshairdot 0;cl_crosshairgap 0;cl_crosshairsize 5;cl_crosshairstyle 4;cl_crosshairthickness 0.5",
    ],
  ];

  return (
    <>
      <Head>
        <title>Crosshairs | CSView</title>
      </Head>
      <main>
        <Navbar />
        <h2 className={styles.crosshairsHeader}>Crosshair Repository</h2>
        <p className={styles.crosshairsCaption}>
          Click a crosshair to copy its configuration!
        </p>
        <div className={styles.crosshairs}>
          {(() => {
            return names.map((player) => (
              <Crosshair
                name={`${player[0]}`}
                key={`${player[0]}Crosshair`}
                commandsString={player[1]}
              />
            ));
          })()}
        </div>
        <Footer />
      </main>
    </>
  );
}
