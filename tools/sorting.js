function start_sorting(){
    //gets called by button
    let input = document.getElementById("content").innerHTML;
    doLog("start_sorting()", input);
    input = input.split(" ").map(v => Number(v));
    doLog("start_sorting()", input);
    initSorting(input, updateOutput, 0);

    doLog("start_sorting()", "finished");
}

function updateOutput(input){
    document.getElementById("result").innerHTML = input.join(" ");
}
function getRandomInput(){
    document.getElementById("content").innerHTML = getRandomArray(100, 100).join(" ");
    doLog("getRandomInput()", document.getElementById("content").innerHTML)
}