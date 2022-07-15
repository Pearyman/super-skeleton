export function setAttributes(element, attrs) {
  Object.keys(attrs).forEach((key) => {
    element.setAttribute(key, attrs[key]);
  });
}
