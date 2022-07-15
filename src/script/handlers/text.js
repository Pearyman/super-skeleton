import { setAttributes } from "../utils";
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

export default textsHandler;
