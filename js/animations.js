import { getAnimationTimeout } from "./menu.js";

const listContainer = document.querySelector(".list-container");

export function createNewListElement(data, pos) {
  let element = Object.assign(document.createElement("div"), {classList: "element", innerText: data});
  element.style.left = pos + "px";
  element.data = data; 
  return {data, element};
}

export function getPosition(element) {
  let listContainerRect = listContainer.getBoundingClientRect();
  var rect = element.getBoundingClientRect();
  return {
    top: rect.top - listContainerRect.top,
    left: rect.left - listContainerRect.left
  };
}

function changeElementColor(element, time) {
  setTimeout(() => {
    element.classList.add("sorted")
  }, time + getAnimationTimeout());
}

export function mergeAnimation(element, top, left, time) {
  setElementToPosition(element, top, left, time);
  changeElementColor(element, time);
}

export function setElementToPosition(element, top, left, time) {
  setTimeout(() => {
    element.style.top = `${top}px`;
    element.style.left = `${left}px`;
  }, time);
}

export function animateArrayDivision(leftArray, rightArray, parentArray) {
  let time = 0;
  let firsElementPosition = getPosition(leftArray[0].element);

  parentArray.style.top = firsElementPosition.top + "px";
  
  leftArray.forEach(({data, element}) => {
    let newObjectElement = createNewListElement(data, firsElementPosition.left);
    let elementPosition = getPosition(element);
    setElementToPosition(element, elementPosition.top + 60, elementPosition.left - 10, time);
    parentArray.append(newObjectElement.element);
    firsElementPosition.left += 40;
  });

  time += getAnimationTimeout();

  rightArray.forEach(({data, element}) => {
    let newElement = createNewListElement(data, firsElementPosition.left);
    let elementPosition = getPosition(element);
    setElementToPosition(element, elementPosition.top + 60, elementPosition.left + 10, time);
    parentArray.append(newElement.element);
    firsElementPosition.left += 40;
  });

  listContainer.append(parentArray);

  return parentArray;
};




