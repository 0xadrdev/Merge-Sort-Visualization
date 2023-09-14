const listContainer = document.querySelector(".list-container");

function createNewListElement(data, pos) {
  let element = Object.assign(document.createElement("div"), {classList: "element element-new", innerText: data});
  element.style.left = pos + "px";
  element.data = data; 
  return {data, element};
}

function getPosition(element) {
const listContainer = document.querySelector(".list-container");
  let listContainerRect = listContainer.getBoundingClientRect();
  var rect = element.getBoundingClientRect();
  return {
    top: rect.top - listContainerRect.top,
    left: rect.left - listContainerRect.left
  };
}

// function setElementToPosition(element, top, left) {
//   element.style.top = `${top}px`;
//   element.style.left = `${left}px`;
// }

function setElementToPosition(element, top, left, time) {
  setTimeout(() => {
    element.style.top = `${top}px`;
    element.style.left = `${left}px`;
  }, time);
}


export function animateArrayDivision(leftArray, rightArray, parentArray) {
  let firsElementPosition = getPosition(leftArray[0].element);
  let time = 0;

  parentArray.style.top = firsElementPosition.top + "px";
  
  leftArray.forEach(elementObject => {
    let newObjectElement = createNewListElement(elementObject.data, firsElementPosition.left);
    let elementPosition = getPosition(elementObject.element);
    setElementToPosition(elementObject.element, elementPosition.top + 60, elementPosition.left - 10, time);
    parentArray.append(newObjectElement.element);
    firsElementPosition.left += 40;
  });

  time += 1000;

  rightArray.forEach(element => {
    let newElement = createNewListElement(element.data, firsElementPosition.left);
    let elementPosition = getPosition(element.element);
    setElementToPosition(element.element, elementPosition.top + 60, elementPosition.left + 10, time);
    parentArray.append(newElement.element);
    firsElementPosition.left += 40;
  });

  listContainer.append(parentArray);

  return parentArray;
};




