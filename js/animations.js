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

function changeElementColor(element) {
  setTimeout(() => {
    element.classList.add("sorted")
  }, getAnimationTimeout());
}

function setElementToPosition(element, top, left) {
  element.style.top = `${top}px`;
  element.style.left = `${left}px`;
}

function setArrayToPosition(array, dir) {
  return new Promise(resolve => {
    for (const {element} of array) {
      let elementPosition = getPosition(element);
      let leftPosition = dir == "-" ? elementPosition.left - 10 : elementPosition.left + 10;
      setElementToPosition(element, elementPosition.top + 60, leftPosition);
    }
    setTimeout(resolve, getAnimationTimeout());
  }); 
}

export function mergeAnimation(element, top, left) {
  return new Promise(resolve => {
    setElementToPosition(element, top, left);
    changeElementColor(element);
    setTimeout(resolve, getAnimationTimeout());
  });
}

export async function animateArrayDivision(leftArray, rightArray, parentArrayContainer) {
  let firsElementPosition = getPosition(leftArray[0].element);
  let draftArrayParent = [...leftArray, ...rightArray];

  parentArrayContainer.style.top = firsElementPosition.top + "px";
  
  for (const {data} of draftArrayParent) {
    let newElementObject = createNewListElement(data, firsElementPosition.left);
    parentArrayContainer.append(newElementObject.element);
    firsElementPosition.left += 40;
  }

  listContainer.append(parentArrayContainer);

  await setArrayToPosition(leftArray, "-");
  await setArrayToPosition(rightArray, "+");
};




