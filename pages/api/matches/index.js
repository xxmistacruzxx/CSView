import { getMatches } from "~/data/scrape/hltv/matchesscraper";

export default async function handler(req, res) {
  let data;
  try {
    data = await getMatches();
  } catch (e) {
    return res.status(500).json({ error: e.toString() });
  }

  return res.status(200).json(data);
}
