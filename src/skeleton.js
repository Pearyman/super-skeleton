// start puppeteer, script.js() -> tamplate
const puppeteer = require("puppeteer");
const { resolve } = require("path");
const { sleep } = require("./utils");

class Skeleton {
  constructor(options) {
    this.options = options;
  }

  async init() {
    this.browser = await puppeteer.launch({
      headless: false,
    });
  }

  async createNewPage() {
    let { device } = this.options;
    let page = await this.browser.newPage(); // puppeteer api
    await page.emulate(puppeteer.devices[device]);
    return page;
  }

  async getHTML(domain) {
    // let page = await this.createNewPage();
    let page = await this.browser.newPage();
    let response = await page.goto(domain, { waitUntil: "networkidle2" });

    if (response && !response.ok) {
      throw new Error(`can't find the page`);
    }

    await this.makeSkeleton(page);

    // todo  要把代码组合起来 style html
    const { html, styles } = await page.evaluate(() => {
      return window.SuperSkeleton.getHTMLAndStyle();
    });

    let result = `
      <style>${styles.join("\n")}</style>
      ${html}
    `;

    return result;
  }

  async makeSkeleton(page) {
    const { delay = 5000 } = this.options;

    page.addScriptTag({
      path: resolve(__dirname, "./script/dist/index.js"),
      type: "module",
    });

    await sleep(delay);

    await page.evaluate((options) => {
      window.SuperSkeleton.genSkeleton(options);
    }, this.options);
  }

  async destroy() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}

module.exports = Skeleton;
