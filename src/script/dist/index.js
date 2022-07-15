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
    const attrs = {
      width,
      height,
      src: IMAGE_BASE64,
    };
    setAttributes(element, attrs);

    element.style.backgroundColor = options.images.color;
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
    async getHTMLAndStyle() {
      const styles = Array.from(document.querySelectorAll("style")).map(
        (style) => style.innerHTML || style.innerText
      );

      const html = document.body.innerHTML;

      return { html, styles };
    },
  };

})();
