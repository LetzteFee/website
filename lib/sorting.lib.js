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
