import {animateArrayDivision, mergeAnimation, getPosition} from './animations.js'

function arraySplitter(array) {
  let arrayCopy = [...array];
  let middleIndex = Math.ceil(array.length / 2);
  let firstHalf = arrayCopy.splice(0, middleIndex);
  let secondHalf = arrayCopy.splice(-middleIndex);
  return {firstHalf, secondHalf};
}

function createParentArray() {
  return Object.assign(document.createElement("div"), {classList: "container-parent"});
}

async function merge(array1, array2, array, parentArray, time) {

  let i = 0;
  let j = 0;
  let pos = 0;
  let parentArrayNodes = [...parentArray.childNodes];

  while(i < array1.length && j < array2.length) {
    let parentPosition = getPosition(parentArrayNodes[pos]);
    if (array1[i].data > array2[j].data) {
      await mergeAnimation(array2[j].element, parentPosition.top, parentPosition.left);
      array[pos++] = array2[j++];
    } else { 
      await mergeAnimation(array1[i].element, parentPosition.top, parentPosition.left);
      array[pos++] = array1[i++];
    }
  } 

  while(i < array1.length) {
    let parentPostion = getPosition(parentArrayNodes[pos]);
    await mergeAnimation(array1[i].element, parentPostion.top, parentPostion.left);
    array[pos++] = array1[i++]; 
  } 

  while(j < array2.length) {
    let parentPostion = getPosition(parentArrayNodes[pos]);
    await mergeAnimation(array2[j].element, parentPostion.top, parentPostion.left);
    array[pos++] = array2[j++]; 
  }
  parentArray.remove();
}

export async function mergeSort(array) {
  if (array.length < 2 ) return; 
  
  let arrayParentContainer = createParentArray();
  let splittedArray = arraySplitter(array);

  await animateArrayDivision(splittedArray.firstHalf, splittedArray.secondHalf, arrayParentContainer);

  await mergeSort(splittedArray.firstHalf);
  await mergeSort(splittedArray.secondHalf);

  await merge(splittedArray.firstHalf, splittedArray.secondHalf, array, arrayParentContainer);
}
