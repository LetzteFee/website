let arr = [];
let callback = function(){throw "Callback function undefined"};
let bubble_sort = (input_arr, input_callback) => {
	arr = input_arr;
	callback = input_callback;
	step_by_step_sort();
}

function isSorted() {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) {
      return false;
    }
  }
  return true;
}
function doOneCycle() {
  let tmp = null;
  for (let j = 0; j < arr.length - 1; j++) {
    if (arr[j] > arr[j + 1]) {
      tmp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = tmp;
    }
  }
}

function step_by_step_sort() {
  if (isSorted()) {
    return;
  }

  doOneCycle();

  document.getElementById("content").innerHTML = arr.join(" ");
  setTimeout(step_by_step_sort, 500);
}
