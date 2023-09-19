import {animateArrayDivision, mergeAnimation, getPosition} from './animations.js'

let time = 0;

function arraySplitter(array) {
  let arrayCopy = [...array]
  let middleIndex = Math.ceil(array.length / 2);
  let firstHalf = arrayCopy.splice(0, middleIndex);
  let secondHalf = arrayCopy.splice(-middleIndex);
  return {firstHalf, secondHalf};
}

function createParentArray() {
  return Object.assign(document.createElement("div"), {classList: "container-parent"});
}

function merge(array1, array2, array, parentArray, time) {

  let i = 0;
  let j = 0;
  let pos = 0;
  let tiempo = 0;

  setTimeout(() => {
    let parentArrayNodes = [...parentArray.childNodes];
    while(i < array1.length && j < array2.length) {
      let elementPosition = getPosition(parentArrayNodes[pos]);
      if (array1[i].data > array2[j].data) {
        mergeAnimation(array2[j].element, elementPosition.top, elementPosition.left, tiempo);
        array[pos++] = array2[j++];
      } else { 
        mergeAnimation(array1[i].element, elementPosition.top, elementPosition.left, tiempo);
        array[pos++] = array1[i++];
      }
      tiempo += 1000;
    } 
  
    while(i < array1.length) {
      let elementPosition = getPosition(parentArrayNodes[pos]);
      mergeAnimation(array1[i].element, elementPosition.top, elementPosition.left, tiempo);
      array[pos++] = array1[i++]; 
      tiempo += 1000;
    } 
  
    while(j < array2.length) {
      let elementPosition = getPosition(parentArrayNodes[pos]);
      mergeAnimation(array2[j].element, elementPosition.top, elementPosition.left, tiempo);
      array[pos++] = array2[j++]; 
      tiempo += 1000;
    }

    setTimeout(() => {
      parentArray.remove();
    }, 1000 * parentArrayNodes.length);

  }, time);
}

export function mergeSort(array) {
  if (array.length < 2 ) return; 

  let arrayParent = createParentArray();
  let splittedArray = arraySplitter(array);

  setTimeout(animateArrayDivision, time, [...splittedArray.firstHalf], [...splittedArray.secondHalf], arrayParent);
  time += 2000;

  mergeSort(splittedArray.firstHalf);
  mergeSort(splittedArray.secondHalf);
  merge(splittedArray.firstHalf, splittedArray.secondHalf, array, arrayParent, time);

  time += 1000 * array.length;
}
