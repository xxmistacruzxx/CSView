import axios from "axios";
import SteamID from "steamid";
import { getStats } from "~/data/scrape/csgostats/csgostatsscraper";

export default async function handler(req, res) {
  let { statusText } = req.body;
  if (!statusText)
    return res.status(400).json({ error: `You must provide a statusText.` });
  if (typeof statusText !== "string")
    return res.status(400).json({ error: "statusText must be a string." });

  let data = {};

  let ids;
  try {
    statusText = statusText.split("\n");
    ids = [];
    for (let line of statusText) {
      if (line.includes("STEAM_")) {
        line = line.split(" ");
        for (let fragment of line) {
          if (fragment.includes("STEAM_")) {
            ids.push(fragment);
            break;
          }
        }
      }
    }
  } catch (e) {
    console.log(`error: ${e.toString()}`);
    return res.status(400).json({
      error: `Unable to parse through statusText. Please make sure your input is a valid status with 10 SteamIDs.`,
    });
  }

  if (ids.length < 10)
    return res.status(400).json({
      error: `Unable to find 10 SteamIDs. Please check your statusText and try again.`,
    });

  let tasks = [];
  for (let i = 0; i < ids.length; i++) {
    let sid = new SteamID(ids[i]).getSteamID64();
    tasks.push(
      getStats(sid).then((val) => {
        ids[i] = val;
      })
    );
  }

  await Promise.all(tasks);

  data.data = ids;
  return res.status(200).json(data);
}
