(function () {
  'use strict';

  function buttonsHandler(element, options) {
    const { width, height } = getComputedStyle(element);
    const defaultColor = options.color;

    element.style.backgroundColor = defaultColor;
    element.style.color = defaultColor;
    element.style.width = width;
    element.style.height = height;
    element.style.border = "none";
    element.style.boxShadow = "none";
    element.style.outline = "none";

    element.innerHTML = "";
  }

  function setAttributes(element, attrs) {
    Object.keys(attrs).forEach((key) => {
      element.setAttribute(key, attrs[key]);
    });
  }

  const IMAGE_BASE64 =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  function imagesHandler(element, options) {
    const { width, height } = getComputedStyle(element);
    const defaultColor = options.color;
    const attrs = {
      width,
      height,
      src: IMAGE_BASE64,
    };
    setAttributes(element, attrs);

    element.style.backgroundColor = defaultColor;
  }

  function textsHandler(element, options) {
    const { width, height } = getComputedStyle(element);
    const defaultColor = options.color;

    const attrs = {
      width,
      height,
    };

    setAttributes(element, attrs);

    element.style.color = defaultColor;
    element.style.backgroundColor = defaultColor;
  }

  // 高阶函数

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
      console.log(options);
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

})();
