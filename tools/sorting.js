function start_sorting(){
    let arr = document.getElementById("content").innerHTML.split(" ").map(v => Number(v));
    let str = bubble_sort(arr, updateOutput).join(" ");

    document.getElementById("result").innerHTML = str;
    doLog("start_sorting()", "finished")
}

function updateOutput(arr, i){
    return;
    if(i % 100 != 0){return}
    document.getElementById("result").innerHTML = arr.join(" ");
    console.log(arr)
}
function getRandomInput(){
    document.getElementById("content").innerHTML = getRandomArray(10000, 1000).join(" ");
}