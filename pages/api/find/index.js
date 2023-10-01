import axios from "axios";
import SteamID from "steamid";

export default async function handler(req, res) {
  let { term, type } = req.query;
  term = term.trim();
  type = type.trim();

  let data = {};
  let status = 200;
  let id;
  switch (type) {
    case "URL":
      if (term.startsWith("https://steamcommunity.com/id/")) {
        term = term.split("/id/")[1];
        for (let i = 0; i < term.length; i++) {
          if (term[i].match(/[?/]/)) {
            term = term.substring(0, i);
            break;
          }
        }
        let url = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${process.env.STEAMAPI}&vanityurl=${term}`;
        let options = {
          method: "GET",
          url: url,
          headers: {},
        };
        try {
          let res = await axios.request(options);
          id = res.data.response.steamid;
        } catch (e) {
          data.error = e.toString();
        }
      } else if (term.startsWith("https://steamcommunity.com/profiles/")) {
        term = term.split("/profiles/")[1];
        for (let i = 0; i < term.length; i++) {
          if (term[i].match(/[^0-9]/)) {
            term = term.substring(0, i);
            break;
          }
        }
        id = term;
      } else {
        status = 400;
        data.error = "Invalid URL";
      }
      break;
    case "Username":
      let url = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${process.env.STEAMAPI}&vanityurl=${term}`;
      let options = {
        method: "GET",
        url: url,
        headers: {},
      };
      try {
        let res = await axios.request(options);
        id = res.data.response.steamid;
      } catch (e) {
        data.error = e.toString();
      }
      break;
    case "CommunityID":
      id = term;
      break;
    case "SteamID":
      try {
        let sid = new SteamID(term);
        id = sid.getSteamID64();
      } catch (e) {
        status = 400;
        data.error = `${term} is not a valid SteamID`;
      }
      break;
    default:
      status = 400;
      data.error = `${type} is not a valid type`;
  }

  data.id = id;
  return res.status(status).json(data);
}
