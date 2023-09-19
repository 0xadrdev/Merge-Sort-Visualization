import { mergeSort } from "./mergeSort.js";
import { createNewListElement } from "./animations.js";

const listContainer = document.querySelector(".list-container");
const sortBtn = document.getElementById("sort-btn");
const unsortBtn = document.querySelector(".unsort-btn");
const errorElement = document.querySelector(".error");

export let sortingArray = false;

function removeDisplayedArray() {
  const elements = document.querySelectorAll(".element");
  elements.forEach(element => {
    element.remove();
  });
}

export function displayArray(array) {
  let pos = 0;
  let newArray = []
  removeDisplayedArray();
  listContainer.style.width = `${array.length * 40}px`; // To center the array. 
  for (const element of array) { 
    let newElement = createNewListElement(element, pos);
    listContainer.append(newElement.element);
    newArray.push(newElement);
    pos += 40;
  }
  return newArray; 
}

function setError(errorText) {
  errorElement.innerText = errorText;
  errorElement.classList.toggle("show");
}

sortBtn.onclick = () => {
  if (sortingArray) setError("Wait until array sorting process finish. ");
  mergeSort(array);
  sortingArray = true;
};

unsortBtn.onclick = () => {
  if (sortingArray) setError("Wait until array sorting process finish. ");
  // createArray("[1,4,21,3]");
};

let array = displayArray([1,4,21,3]);

