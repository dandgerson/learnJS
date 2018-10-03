export function createElementFromHtml(html) {
  const element = document.createElement('div');
  element.insertAdjacentHTML('afterBegin', html.trim());
  return element.firstElementChild;
}