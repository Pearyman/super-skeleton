import { setAttributes } from "../utils";
import { IMAGE_BASE64 } from "../constants";
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

export default imagesHandler;
