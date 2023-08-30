import puppeteer from "puppeteer";

// main function to get all player data
export async function getStats(accNumber) {
  let browser;
  let options = {
    headless: "new",
    args: [
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-sandbox",
    ],
  };
  if (process.env.NODE_ENV === "production")
    options.executablePath = "/usr/bin/chromium-browser"
  browser = await puppeteer.launch(options);

  const page = await browser.newPage();
  await page.goto(`https://csgostats.gg/player/${accNumber}`);
  await page.setViewport({ width: 1080, height: 1024 });

  let data = {};
  try {
    let temp;
    data["username"] = await getTextContent(page, await page.$("#player-name"));
    data["username"] = data["username"].trim();
    data["profPic"] = await getSrc(
      page,
      await page.$(".player-ident-outer > img")
    );
    temp = await getTextContent(page, await page.$("#last-game"));
    data["lastGame"] = temp.trim();
    data["compWins"] = await getTextContent(
      page,
      await page.$("#competitve-wins span")
    );
    data["currRankImg"] = await getSrc(page, await page.$(".player-ranks img"));
    temp = await page.$$(".player-ranks img");
    try {
      data["bestRankImg"] = await getSrc(page, temp[1]);
    } catch (e) {
      data["bestRankImg"] = data["currRankImg"];
    }
    data["kpd"] = await getTextContent(page, await page.$("#kpd span"));
    data["hltv"] = await getTextContent(page, await page.$("#rating span"));
    data["winrate"] = await getCol1Stat(page, "winrate");
    data["winrate"]["winrate"] = data["winrate"]["winrate"].split("\n")[0];
    data["hs%"] = await getCol1Stat(page, "hs%");
    data["adr"] = await getCol1Stat(page, "adr");
    data["clutch"] = await getClutch(page);
    data["entry"] = await getEntry(page);
    data["played"] = await getPlayed(page);
  } catch (e) {
    return { ...data, error: e.toString() };
  } finally {
    await browser.close();
  }

  // console.log(`Server Side: ${JSON.stringify(data)}`);
  return data;
}

// helper functions for getting player stats
async function getTextContent(page, element) {
  let value = await page.evaluate((el) => el.textContent, element);
  return value;
}

async function getSrc(page, element) {
  let value = await page.evaluate((el) => el.src, element);
  return value;
}

// get functions for player stats
async function getCol1Stat(page, type) {
  // types can be "winrate", "hs%", or "adr".
  let data = {};
  let index = 4;
  switch (type) {
    case "hs%":
      index = 5;
      break;
    case "adr":
      index = 6;
      break;
    default:
      index = 4;
  }

  let statPanel = await page.$(
    `.stats-col-1 > div:nth-child(${index}) .stat-panel`
  );
  let element = await statPanel.$("div:nth-child(2) > div:nth-child(2)");
  let text = await getTextContent(page, element);
  data[type] = text.trim();

  element = await statPanel.$("div:nth-child(2) > div:nth-child(4)");
  let labels = await element.$$(".total-stat > .total-label");
  let values = await element.$$(".total-stat > .total-value");
  for (let i = 0; i < values.length; i++) {
    values[i] = await getTextContent(page, values[i]);
  }
  for (let i = 0; i < labels.length; i++) {
    labels[i] = await getTextContent(page, labels[i]);
    data[labels[i]] = values[i];
  }

  return data;
}

async function getClutch(page) {
  let data = {};
  for (let i = 0; i < 5; i++) {
    const clutchPair = await page.evaluate((elementId) => {
      const clutchTitleElement = document.getElementById(elementId);
      if (!clutchTitleElement) return null;
      const clutchContainerElement = clutchTitleElement.parentElement;
      if (!clutchContainerElement) return null;

      return [
        clutchContainerElement.children[1].innerText,
        clutchContainerElement.children[3].innerText,
      ];
    }, `1v${i + 1}-chart-canvas`);
    data[clutchPair[0]] = clutchPair[1];
  }

  return data;
}

async function getEntry(page) {
  let data = {};
  const overallEntrySuccess = await page.evaluate((query) => {
    return document.querySelector(query).innerText;
  }, ".stats-col-2 > .inner-col-1 > :nth-child(2) > :nth-child(2) > :nth-child(1) > :nth-child(2)");
  data.overall = overallEntrySuccess;
  const rates = await page.evaluate(
    (query) => {
      let successRatesContainer = document.querySelector(query[0]);
      let successRates = [];
      let attemptsRatesContainer = document.querySelector(query[1]);
      let attemptsRates = [];
      for (let i = 0; i < 3; i++) {
        successRates.push(successRatesContainer.children[i + 1].innerText);
        attemptsRates.push(attemptsRatesContainer.children[i + 1].innerText);
      }
      return [successRates, attemptsRates];
    },
    [
      ".stats-col-2 > .inner-col-1 > :nth-child(2) > :nth-child(2) > :nth-child(3)",
      ".stats-col-2 > .inner-col-1 > :nth-child(2) > :nth-child(2) > :nth-child(4)",
    ]
  );
  data.success = rates[0];
  data.attempts = rates[1];
  return data;
}

async function getPlayed(page) {
  let data = {};
  const maps = await page.evaluate((query) => {
    let container = document.querySelector(query);
    let maps = [];
    for (let i = 0; i < 4; i++) {
      let row = container.children[i].children[0];
      maps.push([row.children[0].innerText, row.children[1].innerText]);
    }
    return maps;
  }, ".stats-col-3 > .inner-col-2 > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(2)");
  return maps;
}
