const puppeteer = require("puppeteer");
const { resolve } = require("path");
const { sleep } = require("./utils");

const openPage = async (options) => {
  const { device, delay = 5000 } = options;

  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  await page.emulate(puppeteer.devices[device]);

  // cookie  next version

  await page.goto(options.domain, { waitUntil: "networkidle2" });

  page.addScriptTag({
    path: resolve(__dirname, "./script/dist/index.js"),
    type: "module",
  });

  await sleep(delay);

  await page.evaluate(async (options) => {
    await window.SuperSkeleton.genSkeleton(options);
  }, options);

  const { html, styles } = await page.evaluate((options) => {
    return window.SuperSkeleton.getHTMLAndStyle(options);
  }, options);

  let result = `
    <style>${styles.join("\n")}</style>
    ${html}
  `;

  return {
    page,
    browser,
    result,
  };
};

module.exports = openPage;
