const listContainer = document.querySelector(".list-container");

function createNewListElement(data) {
  return Object.assign(document.createElement("div"), {classList: "element element-new", innerText: data});
}

function getTranslateValue(element) {
  let matrix = new WebKitCSSMatrix(getComputedStyle(element).transform);
  return {top: matrix.f, left: matrix.e}
};

function getPosition(element) {
  let listContainerRect = listContainer.getBoundingClientRect();
  var rect = element.getBoundingClientRect();
  return {
    top: rect.top - listContainerRect.top,
    left: rect.left - listContainerRect.left
  };
}

export function animateArrayDivision(leftArray, rightArray) {
  let newContainer = Object.assign(document.createElement("div"), {classList: "container-test"});
  let firsElementPosition = leftArray[0];

  newContainer.style.cssText = `transform: translate(${getPosition(firsElementPosition).left}px, ${getPosition(firsElementPosition).top}px);`;
  
  leftArray.forEach((element, i) => {
    let newElement = createNewListElement(element.innerText);
    element.style.setProperty("transform", `translate(${getTranslateValue(element).left - 10}px, ${getTranslateValue(element).top + 60}px)`)
    newContainer.append(newElement);
  });

  rightArray.forEach((element, i) => {
    let newElement = createNewListElement(element.innerText);
    element.style.setProperty("transform", `translate(${getTranslateValue(element).left + 10}px, ${getTranslateValue(element).top + 60}px)`)
    newContainer.append(newElement);
  });

  listContainer.append(newContainer);
  return newContainer;
};




