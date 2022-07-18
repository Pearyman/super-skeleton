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
  animationStyle(options) {
    let { color, animationTime = 1 } = options;
    let style = `  
      img,
      p,
      button {
        background-color: ${color};
        background: linear-gradient(
          100deg,
          rgba(255, 255, 255, 0) 40%,
          rgba(255, 255, 255, .5) 50%,
          rgba(255, 255, 255, 0) 60%
        ) ${color};
        background-size: 200% 100%;
        background-position-x: 180%;
        animation: ${animationTime}s loading ease-in-out infinite;
      }

      @keyframes loading {
        to {
          background-position-x: -20%;
        }
      }
    `;
    return style;
  },
  async getHTMLAndStyle(options) {
    const styles = Array.from(document.querySelectorAll("style")).map(
      (style) => style.innerHTML || style.innerText
    );

    if (options.isAnimation) {
      const animationStyle = this.animationStyle(options);
      const _loadingStyle = document.createElement("style");
      _loadingStyle.innerHTML = animationStyle;
      document.querySelector("#root").appendChild(_loadingStyle);
    }

    const html = document.body.innerHTML;

    return { html, styles };
  },
};
