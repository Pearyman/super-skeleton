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

export default buttonsHandler;
