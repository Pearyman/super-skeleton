const Skeleton = require("./skeleton");
const { resolve } = require("path");
const { readFileSync, writeFileSync } = require("fs");

class SuperSkeleton {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.done.tap("SuperSkeleton", async () => {
      this.skeleton = new Skeleton(this.options);
      await this.skeleton.init();

      const skeletonHTML = await this.skeleton.getHTML(this.options.domain);
      console.log(skeletonHTML);

      // replace
      const originPath = resolve(this.options.staticDir, "index.html");
      const originHTML = await readFileSync(originPath, "utf8");
      const resultHTML = originHTML.replace(
        '<div id="root"></div>',
        skeletonHTML
      );

      await writeFileSync(originPath, resultHTML);

      await this.skeleton.destroy();
    });
  }
}

module.exports = SuperSkeleton;
