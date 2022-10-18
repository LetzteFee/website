let bubble_sort = (arr, callback_function) => {
    let tmp = null;
    let finished = null;
    for(let i = 0; i < arr.length - 1;i++){
        finished = true;
        for(let j = 0; j < arr.length - 1 - i;j++){
            if(arr[j] > arr[j + 1]){
                tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
                finished = false;
            }
        }
        callback_function(arr, i);
        if(finished){break}
    }
    return arr;
}
/*
let arr = [];

function isSorted() {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) {
      return false;
    }
  }
  return true;
}
function sortPartially() {
  let tmp = null;
  for (let j = 0; j < arr.length - 1; j++) {
    if (arr[j] > arr[j + 1]) {
      tmp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = tmp;
    }
  }
}

function a() {
  if (isSorted()) {
    return;
  }

  sortPartially();

  document.getElementById("01").innerHTML = arr.join(" ");
  setTimeout(a, 500);
}
arr = [34, 187,0, 10, 5, 2, 6, 3, 1, 0, 122, 0];
console.log(arr);
a();
*/