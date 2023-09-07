import getBrowser from "../browser.js";

export async function getMatches() {
  const browser = await getBrowser(`MATCHES`);
  const page = await browser.newPage();
  await page.goto(`https://www.hltv.org/matches`);
  await page.setViewport({ width: 1080, height: 1024 });

  let data = {};
  try {
    data.data = await page.evaluate(() => {
      let days = [];
      let sections = document.querySelectorAll(".upcomingMatchesSection");
      for (let i = 0; i < sections.length; i++) {
        let section = sections[i];
        let sectionData = {};
        let sectionMatches = [];

        sectionData.date = section.children[0].innerText;
        for (let j = 1; j < section.children.length; j++) {
          let match = section.children[j].children[0];
          let matchData = {};

          matchData.link = match.href;
          matchData.time = match.children[0].children[0].innerText;
          matchData.meta = match.children[0].children[2].innerText;

          let placeholder = match.querySelector(".matchInfoEmpty");
          if (placeholder !== null) {
            matchData.placeholder = placeholder.children[0].innerText;
          } else {
            let teams = match.children[1];

            let team1 = teams.children[0];
            let team1Name;
            let team1Img;
            try {
              team1Name = team1.children[1].innerText;
              team1Img = team1.children[0].children[0].src;
            } catch (e) {
              team1Name = team1.children[0].innerText;
              team1Img = "";
            }
            team1 = { name: team1Name, img: team1Img };

            let team2 = teams.children[1];
            let team2Name;
            let team2Img;
            try {
              team2Name = team2.children[1].innerText;
              team2Img = team2.children[0].children[0].src;
            } catch (e) {
              team2Name = team2.children[0].innerText;
              team2Img = "";
            }
            team2 = { name: team2Name, img: team2Img };

            let event = match.children[2];
            let eventName = event.children[1].innerText;
            let eventImg = event.children[0].children[0].src;
            event = { name: eventName, img: eventImg };

            matchData = {
              ...matchData,
              team1: team1,
              team2: team2,
              event: event,
            };
          }

          sectionMatches.push(matchData);
        }
        sectionData.matches = sectionMatches;

        days.push(sectionData);
      }
      return days;
    });
  } catch (e) {
    data = { ...data, error: e.toString() };
  } finally {
    browser.close();
  }

  //   console.log(`Server Side: ${JSON.stringify(data)}`);
  return data;
}
