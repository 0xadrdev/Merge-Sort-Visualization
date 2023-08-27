const unsortedArray = [1,8,5,3,2,-10,20];

function arraySplitter(array) {
  let arrayCopy = [...array]
  let middleIndex = Math.ceil(array.length / 2);
  let firstHalf = arrayCopy.splice(0, middleIndex);
  let secondHalf = arrayCopy.splice(-middleIndex);
  return {firstHalf, secondHalf};
}

function merge(array1, array2, array) {
  let i = 0;
  let j = 0;
  let pos = 0;

  while(i < array1.length && j < array2.length) {
    if (array1[i] > array2[j]) {
      array[pos++] = array2[j++];
    } else { 
      array[pos++] = array1[i++];
    }
  } 

  while(i < array1.length) {
    array[pos++] = array1[i++]; 
  } 

  while(j < array2.length) {
    array[pos++] = array2[j++]; 
  }
}

function mergeSort(array) {
  if (array.length < 2 ) return; 
  let splitArray = arraySplitter(array);
  mergeSort(splitArray.firstHalf);
  mergeSort(splitArray.secondHalf);
  merge(splitArray.firstHalf, splitArray.secondHalf, array);
}

mergeSort(unsortedArray);


