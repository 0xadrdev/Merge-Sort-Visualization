
import { mergeSort, mergeSortNew } from "./mergeSort.js";

const sortBtn = document.querySelector(".sort-btn");
const unsortBtn = document.querySelector(".unsort-btn");
const elements = document.querySelectorAll(".element");

sortBtn.onclick = () => {
  // console.log(mergeSort([1,2,3,4,5,6,7,8]));
  mergeSortNew(elements);
  // mergeSor(elements);
};

