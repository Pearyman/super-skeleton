// 高阶函数

import { buttonsHandler, imagesHandler, textsHandler } from "./handlers/index";

window.SuperSkeleton = {
  async genSkeleton(options) {
    let rootElement = document.documentElement;
    let images = [];
    let buttons = [];
    let texts = [];
    (function trav(options) {
      (function preTrav(element) {
        if (element.children && element.children.length > 0) {
          Array.from(element.children).forEach((child) => {
            preTrav(child);
          });
        }
        if (element.tagName == "IMG") {
          images.push(element);
        }
        if (element.tagName == "BUTTON") {
          buttons.push(element);
        }
        if (element.tagName == "P") {
          texts.push(element);
        }
      })(rootElement);

      images.forEach((item) => {
        imagesHandler(item, options);
      });

      buttons.forEach((item) => {
        buttonsHandler(item, options);
      });

      texts.forEach((item) => {
        textsHandler(item, options);
      });
    })(options);
  },
  async getHTMLAndStyle() {
    const styles = Array.from(document.querySelectorAll("style")).map(
      (style) => style.innerHTML || style.innerText
    );

    const html = document.body.innerHTML;

    return { html, styles };
  },
};
