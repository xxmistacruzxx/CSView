import { getStats } from "~/data/scrape/csgostats/csgostatsscraper";

export default async function handler(req, res) {
  let { id } = req.query;
  let data = await getStats(id);

  res.status(200).json(data);
}
