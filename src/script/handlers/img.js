import { setAttributes } from "../utils";
import { IMAGE_BASE64 } from "../constants";
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

export default imagesHandler;
