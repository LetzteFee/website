let arr = {originalArray: null, targetArray: null};
let callback = () => {throw "Error: Callback function undefined"};
let doOneCycle = () => {throw "Error: doOneCycle function undefined"};

function initSorting(input_arr, input_callback, algo) {
  arr.originalArray = input_arr;
  callback = input_callback;
  switch(algo){
    case "bubble":
      doOneCycle = bubble_sort_doOneCycle;
      arr.targetArray = arr.originalArray;
      break;
    case "selection":
      doOneCycle = selection_sort_doOneCycle;
      arr.counter = 0;
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
function selection_sort_doOneCycle() {
	let index_low = arr.counter;
	for(let i = arr.counter + 1; i < arr.targetArray.length; i++){
		if(arr.targetArray[i] < arr.targetArray[index_low]){
			index_low = i;
		}
	}
	if(index_low == arr.counter){
		arr.counter++;
		return
	}	
	let tmp = arr.targetArray[arr.counter];
	arr.targetArray[arr.counter] = arr.targetArray[index_low];
	arr.targetArray[index_low] = tmp;
	arr.counter++;
}
function step_by_step_sort() {
  if (isSorted()) {
    return;
  }
  doLog("step_by_step_sort()", "still running")
  doOneCycle();

  callback(arr.targetArray);
  setTimeout(step_by_step_sort, 50);
}
