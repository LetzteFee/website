let arr = {originalArray: null, targetArray: null};
let callback = () => {throw "Error: Callback function undefined"};
let doOneCycle = () => {throw "Error: doOneCycle function undefined"};

function initSorting(input_arr, input_callback, algo) {
  arr.originalArray = input_arr;
  callback = input_callback;
  switch(algo){
    case 0:
      doOneCycle = bubble_sort_doOneCycle;
      arr.targetArray = arr.originalArray;
      break;
    default:
      throw "Error: Unknown Algo";
  }

  step_by_step_sort();
}

function isSorted() {
  for (let i = 1; i < arr.targetArray.length; i++) {
    if (arr.targetArray[i - 1] > arr.targetArray[i]) {
      return false;
    }
  }
  return true;
}
function bubble_sort_doOneCycle() {
  let tmp = null;
  for (let j = 0; j < arr.targetArray.length - 1; j++) {
    if (arr.targetArray[j] > arr.targetArray[j + 1]) {
      tmp = arr.targetArray[j];
      arr.targetArray[j] = arr.targetArray[j + 1];
      arr.targetArray[j + 1] = tmp;
    }
  }
}

function step_by_step_sort() {
  if (isSorted()) {
    return;
  }
  doLog("here")
  doOneCycle();

  callback(arr.targetArray);
  setTimeout(step_by_step_sort, 50);
}