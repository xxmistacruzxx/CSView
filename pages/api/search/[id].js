import { getStats } from "~/data/scrape/csgostats/csgostatsscraper";

export default async function handler(req, res) {
  let { id } = req.query;
  let data;
  try {
    data = await getStats(id);
  } catch (e) {
    return res.status(500).json({ error: e.toString() });
  }

  return res.status(200).json(data);
}
