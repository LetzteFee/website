function start_sorting(){
    //gets called by button
    let arr = document.getElementById("content").innerHTML.split(" ").map(v => Number(v));
    bubble_sort(arr, updateOutput);

    doLog("start_sorting()", "finished")
}

function updateOutput(arr, i){
    return;
    if(i % 100 != 0){return}
    document.getElementById("result").innerHTML = arr.join(" ");
    console.log(arr)
}
function getRandomInput(){
    document.getElementById("content").innerHTML = getRandomArray(100, 100).join(" ");
}
