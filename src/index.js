// const Skeleton = require("./skeleton");
const { resolve } = require("path");
const { readFileSync, writeFileSync } = require("fs");
const openPage = require("./openPage");

class SuperSkeleton {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.done.tap("SuperSkeleton", async () => {
      const { page, browser, result } = await openPage(this.options);
      // await this.skeleton.init();

      // const skeletonHTML = await this.skeleton.getHTML(this.options.domain);
      console.log(result);

      // replace
      const originPath = resolve(this.options.staticDir, "index.html");
      const originHTML = await readFileSync(originPath, "utf8");
      const resultHTML = originHTML.replace('<div id="root"></div>', result);

      await writeFileSync(originPath, resultHTML);

      // Close the browser
      // await browser.close();
    });
  }
}

module.exports = SuperSkeleton;
