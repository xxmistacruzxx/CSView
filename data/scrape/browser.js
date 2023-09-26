import puppeteer from "puppeteer";

export default async function getBrowser(reason) {
  let browser;
  let stamp = `${new Date().toLocaleString()} - ${reason} :`;
  if (process.env.BROWSERURL !== "" && process.env.BROWSERURL !== undefined) {
    console.log(`${stamp} Using remote browser...`);
    browser = await puppeteer.connect({
      browserWSEndpoint: `${process.env.BROWSERURL}?stealth`,
    });
  } else {
    console.log(`${stamp} Using local browser...`);
    let options = {
      headless: "new",
      args: [
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--disable-setuid-sandbox",
        "--no-sandbox",
      ],
    };
    if (process.env.NODE_ENV === "production") {
      console.log("^ Using production settings...");
      options.executablePath = "/usr/bin/chromium-browser";
    }
    browser = await puppeteer.launch(options);
  }
  return browser;
}
