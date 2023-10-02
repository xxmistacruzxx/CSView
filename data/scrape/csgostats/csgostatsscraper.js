import getBrowser from "../browser.js";

// GET ALL PLAYER DATA FUNCTION
export async function getStats(accNumber) {
  const browser = await getBrowser(`SEARCH ${accNumber}`);
  const [csgoPage, cs2Page] = await Promise.all([
    await browser.newPage(),
    await browser.newPage(),
  ]);
  await Promise.all([
    csgoPage.goto(`https://csstats.gg/player/${accNumber}/csgo`),
    cs2Page.goto(`https://csstats.gg/player/${accNumber}`),
  ]);
  await Promise.all([
    csgoPage.setViewport({ width: 1080, height: 1024 }),
    cs2Page.setViewport({ width: 1080, height: 1024 }),
  ]);

  let data = {};
  try {
    data.general = {};
    data.general.id = accNumber;
    data.general.playerAvatar = await getSrc(
      csgoPage,
      await csgoPage.$("#player-avatar > img")
    );
    data.general.playerName = await getTextContent(
      csgoPage,
      await csgoPage.$("#player-name")
    );
    data.general.playerLink = await getHref(
      csgoPage,
      await csgoPage.$("#other-profiles > .icon > a")
    );

    try {
      data.cs2 = await getCs2Data(cs2Page);
    } catch (e) {
      data.cs2 = {};
      data.cs2.error = e.toString();
    }
    try {
      data.csgo = await getCsgoData(csgoPage);
    } catch (e) {
      data.csgo = {};
      data.csgo.error = e.toString();
    }
  } catch (e) {
    data = { ...data, error: e.toString() };
  } finally {
    browser.close();
  }

  // console.log(`Server Side: ${JSON.stringify(data)}`);
  return data;
}

async function getCsgoData(page) {
  let data = {};
  try {
    data.lastPlayed = await getTextContent(
      page,
      await page.$("#csgo-rank > .icon")
    );
  } catch (e) {
    data.lastPlayed = "N/A";
  }
  data.lastPlayed = data.lastPlayed !== "" ? data.lastPlayed : "N/A";
  try {
    data.wins = await getTextContent(page, await page.$("#csgo-rank > .wins"));
  } catch (e) {
    data.wins = "N/A";
  }
  data.wins = data.wins !== "" ? data.wins : "N/A";
  try {
    data.rank = await getSrc(page, await page.$("#csgo-rank > .rank > img"));
  } catch (e) {
    data.rank = "/images/unranked.png";
  }
  try {
    data.best = await getSrc(page, await page.$("#csgo-rank > .best > img"));
  } catch (e) {
    data.best = data.rank;
  }

  try {
    data.inner = await getInnerData(page);
  } catch (e) {
    data.error = e.toString();
  }

  return data;
}

async function getCs2Data(page) {
  let data = {};
  try {
    data.lastPlayed = await getTextContent(
      page,
      await page.$("#cs2-rank > .icon")
    );
  } catch (e) {
    data.lastPlayed = "N/A";
  }
  data.lastPlayed = data.lastPlayed !== "" ? data.lastPlayed : "N/A";

  try {
    data.wins = await getTextContent(page, await page.$("#cs2-rank > .wins"));
  } catch (e) {
    data.wins = "N/A";
  }
  data.wins = data.wins !== "" ? data.wins : "N/A";

  try {
    data.rank = await getTextContent(
      page,
      await page.$("#cs2-rank > .rank > div > span")
    );
  } catch (e) {
    data.rank = "---";
  }
  data.rank = data.rank !== "" ? data.rank : "---";

  try {
    data.rankBackground = await getBackgroundImage(
      page,
      await page.$("#cs2-rank > .rank > div")
    );
  } catch (e) {
    data.rankBackground = `url("/images/defaultrating.png")`;
  }
  data.rankBackground =
    data.rankBackground !== ""
      ? data.rankBackground
      : `url("/images/defaultrating.png")`;

  try {
    data.best = await getTextContent(
      page,
      await page.$("#cs2-rank > .best > div > span")
    );
  } catch (e) {
    data.best = data.rank;
  }
  try {
    data.bestBackground = await getBackgroundImage(
      page,
      await page.$("#cs2-rank > .best > div")
    );
  } catch (e) {
    data.bestBackground = data.rankBackground;
  }

  try {
    data.inner = await getInnerData(page);
  } catch (e) {
    data.error = e.toString();
  }

  return data;
}

async function getInnerData(page) {
  let data = {};
  try {
    data.kpd = await getTextContent(page, await page.$("#kpd > span"));
  } catch (e) {
    data.kpd = "N/A";
  }
  try {
    data.rating = await getTextContent(page, await page.$("#rating > span"));
  } catch (e) {
    data.rating = "N/A";
  }

  try {
    data.winRate = await getWinRatePanel(page);
  } catch (e) {
    data.winRate = {};
    data.winRate.winRate = "N/A";
    data.winRate.played = "N/A";
    data.winRate.won = "N/A";
    data.winRate.lost = "N/A";
    data.winRate.tied = "N/A";
  }

  try {
    data.hs = await getHSPanel(page);
  } catch (e) {
    data.hs = {};
    data.hs.hs = "N/A";
    data.hs.headshots = "N/A";
    data.hs.kills = "N/A";
    data.hs.assists = "N/A";
    data.hs.deaths = "N/A";
  }

  try {
    data.adr = await getADRPanel(page);
  } catch (e) {
    data.adr = {};
    data.adr.adr = "N/A";
    data.adr.damage = "N/A";
    data.adr.rounds = "N/A";
  }

  try {
    data.clutch = await getClutchPanel(page);
  } catch (e) {
    data.clutch = {};
    data.clutch.clutch = "N/A";
    data.clutch.clutches = {};
    data.clutch.clutches[`1`] = {};
    data.clutch.clutches[`2`] = {};
    data.clutch.clutches[`3`] = {};
    data.clutch.clutches[`4`] = {};
    data.clutch.clutches[`5`] = {};
    data.clutch.clutches[`1`].percentage = "N/A";
    data.clutch.clutches[`2`].percentage = "N/A";
    data.clutch.clutches[`3`].percentage = "N/A";
    data.clutch.clutches[`4`].percentage = "N/A";
    data.clutch.clutches[`5`].percentage = "N/A";
    data.clutch.clutches[`1`].raw = "N/A";
    data.clutch.clutches[`2`].raw = "N/A";
    data.clutch.clutches[`3`].raw = "N/A";
    data.clutch.clutches[`4`].raw = "N/A";
    data.clutch.clutches[`5`].raw = "N/A";
  }

  try {
    data.entry = await getEntryPanel(page);
  } catch (e) {
    data.entry = {};
    data.entry.entry = "N/A";
    data.entry.attempts = {};
    data.entry.attempts.combined = "N/A";
    data.entry.attempts.t = "N/A";
    data.entry.attempts.ct = "N/A";
    data.entry.success = {};
    data.entry.success.combined = "N/A";
    data.entry.success.t = "N/A";
    data.entry.success.ct = "N/A";
  }

  return data;
}

async function getWinRatePanel(page) {
  let data = {};
  data = page.evaluate(() => {
    let panel =
      document.querySelector(".col-sm-7").children[3].children[0].children[1];
    let winRate = panel.children[1].textContent.trim();
    winRate = winRate.substring(0, winRate.indexOf("%") + 1);
    let lowerPanel = panel.children[3];
    let played = lowerPanel.children[0].children[1].textContent.trim();
    let won = lowerPanel.children[1].children[1].textContent.trim();
    let lost = lowerPanel.children[2].children[1].textContent.trim();
    let tied = lowerPanel.children[3].children[1].textContent.trim();
    return {
      winRate: winRate,
      played: played,
      won: won,
      lost: lost,
      tied: tied,
    };
  });
  return data;
}

async function getHSPanel(page) {
  let data = {};
  data = page.evaluate(() => {
    let panel =
      document.querySelector(".col-sm-7").children[4].children[0].children[1];
    let hs = panel.children[1].textContent.trim();
    hs = hs.substring(0, hs.indexOf("%") + 1);
    let lowerPanel = panel.children[3];
    let kills = lowerPanel.children[0].children[1].textContent.trim();
    let deaths = lowerPanel.children[1].children[1].textContent.trim();
    let assists = lowerPanel.children[2].children[1].textContent.trim();
    let headshots = lowerPanel.children[3].children[1].textContent.trim();
    return {
      hs: hs,
      kills: kills,
      deaths: deaths,
      assists: assists,
      headshots: headshots,
    };
  });
  return data;
}

async function getADRPanel(page) {
  let data = {};
  data = page.evaluate(() => {
    let panel =
      document.querySelector(".col-sm-7").children[5].children[0].children[1];
    let adr = panel.children[1].textContent.trim();
    if (adr.indexOf("\n") !== -1) adr = adr.substring(0, adr.indexOf("\n"));
    let lowerPanel = panel.children[3];
    let damage = lowerPanel.children[0].children[1].textContent.trim();
    let rounds = lowerPanel.children[1].children[1].textContent.trim();
    return {
      adr: adr,
      damage: damage,
      rounds: rounds,
    };
  });
  return data;
}

async function getClutchPanel(page) {
  let data = {};
  data = page.evaluate(() => {
    let panel =
      document.querySelector(".col-sm-5").children[0].children[0].children[1];
    let clutch = panel.children[0].children[1].textContent.trim();
    let lowerPanel = panel.children[1];
    let clutches = {};
    for (let i = 0; i < 5; i++) {
      clutches[`${i + 1}`] = {
        percentage: lowerPanel.children[i].children[2].textContent.trim(),
        raw: lowerPanel.children[i].children[3].textContent.trim(),
      };
    }
    return { clutch: clutch, clutches: clutches };
  });
  return data;
}

async function getEntryPanel(page) {
  let data = {};
  data = page.evaluate(() => {
    let panel =
      document.querySelector(".col-sm-5").children[0].children[1].children[1];
    let entry = panel.children[0].children[1].textContent.trim();
    let successPanel = panel.children[2];
    let success = {
      combined: successPanel.children[1].textContent.trim(),
      t: successPanel.children[2].textContent.trim(),
      ct: successPanel.children[3].textContent.trim(),
    };
    let attemptPanel = panel.children[3];
    let attempts = {
      combined: attemptPanel.children[1].textContent.trim(),
      t: attemptPanel.children[2].textContent.trim(),
      ct: attemptPanel.children[3].textContent.trim(),
    };
    return { entry: entry, success: success, attempts: attempts };
  });
  return data;
}

// BASIC HELPER FUNCTIONS
async function getTextContent(page, element) {
  let value = await page.evaluate((el) => el.textContent, element);
  value = value.trim();
  return value;
}

async function getSrc(page, element) {
  let value = await page.evaluate((el) => el.src, element);
  value = value.trim();
  return value;
}

async function getHref(page, element) {
  let value = await page.evaluate((el) => el.href, element);
  value = value.trim();
  return value;
}

async function getBackgroundImage(page, element) {
  let value = await page.evaluate(
    (el) => el.style["background-image"],
    element
  );
  value = value.trim();
  return value;
}
