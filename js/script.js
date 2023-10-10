import { mergeSort, resetTime } from "./mergeSort.js";
import { createNewListElement } from "./animations.js";

const listContainer = document.querySelector(".list-container");
const sortBtn = document.getElementById("sort-btn");
const unsortBtn = document.querySelector(".unsort-btn");
const errorElement = document.querySelector(".error");

let array; 
let unsortedArray;
let sortingArray = false;

displayArray([1,4,21,3]);


function removeDisplayedArray() {
  const elements = document.querySelectorAll(".element");
  elements.forEach(element => {
    element.remove();
  });
}

export function displayArray(array) {
  let pos = 0;
  let newArray = [];
  removeDisplayedArray();
  listContainer.style.width = `${array.length * 40}px`; // To center the array. 
  for (const element of array) { 
    let newElementObject = createNewListElement(element, pos);
    listContainer.append(newElementObject.element);
    newArray.push(newElementObject);
    pos += 40;
  }
  setArray(newArray);
}

function getArray() {
  return array;
}

function setArray(newArray) {
  array = newArray;
}

function setError(errorText) {
  errorElement.innerText = errorText;
  errorElement.classList.add("show");
}

function removeError() {
  errorElement.classList.remove("show");
}

function arrayIsSorted() {
  let array = getArray();
  for (const elementObject of array) {
    if (elementObject.element.classList.contains("sorted")) return true;
  }
  return false;
}

sortBtn.onclick = () => {
  if (sortingArray) return setError("Wait until array sorting process finish. ");
  if (arrayIsSorted()) return setError("Already sorted. ");

  resetTime();

  unsortedArray = [...getArray()]

  let animationDuration = mergeSort(getArray());
  
  removeError();
  sortingArray = true;

  setTimeout(() => {
    sortingArray = false;
    removeError();
  }, animationDuration);
};

unsortBtn.onclick = () => {
  if (sortingArray) return setError("Wait until array sorting process finish. ");
  if (!arrayIsSorted()) return setError("Already unsorted. ");

  let newArr = [];

  unsortedArray.forEach(elementObject => {
    newArr.push(elementObject.data);
  })

  displayArray(newArr);
};


