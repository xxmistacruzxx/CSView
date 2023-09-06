import puppeteer from "puppeteer";

export default async function getBrowser() {
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
    options.executablePath = "/usr/bin/chromium-browser";
  return (browser = await puppeteer.launch(options));
}
