
import { mergeSort } from "./mergeSort.js";

const listContainer = document.querySelector(".list-container");
const sortBtn = document.querySelector(".sort-btn");
const unsortBtn = document.querySelector(".unsort-btn");

// function createNewListElement(data, pos) {
//   let newListElement = Object.assign(document.createElement("div"), {classList: "element element-new", innerText: data});
//   newListElement.style.left = pos + "px";
//   return newListElement;
// }

function createNewListElement(data, pos) {
  let element = Object.assign(document.createElement("div"), {classList: "element element-new", innerText: data});
  element.style.left = pos + "px";
  element.data = data; 
  // return element;
  return {data, element};
}

function createArray(array) {
  let pos = 0;
  let newArray = []
  listContainer.style.width = `${array.length * 40}px`;
  for (const element of array) {
    let newElement = createNewListElement(element, pos);
    listContainer.append(newElement.element);
    newArray.push(newElement);
    pos += 40;
  }
  return newArray; 
}

sortBtn.onclick = () => {
  const elements = document.querySelectorAll(".element");
  mergeSort(array);
  // mergeSort(elements);
  // console.log(mergeSort(elements));
  // mergeSort([4,3,2,1]);
  // console.log(mergeSort([4,3,2,1]));
};

let array = createArray([4,3,2,1]);

