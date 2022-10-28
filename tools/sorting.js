function start_sorting(){
    //gets called by button
    let input = document.getElementById("content").innerHTML;
    //doLog("start_sorting()", input);
    input = input.split(" ").map(v => Number(v));
    //doLog("start_sorting()", input);
    let algo = document.getElementById("select_algorithm").value;
    initSorting(input, updateOutput, updateCounter, algo);

    doLog("start_sorting()", "finished");
}

function updateOutput(input){
    document.getElementById("result").innerHTML = input.join(" ");
}
function updateCounter(input){
    document.getElementById("counter").innerHTML = Number(input);
}
function getRandomInput(){
    document.getElementById("content").innerHTML = getRandomArray(100, 100).join(" ");
    doLog("getRandomInput()", document.getElementById("content").innerHTML)
}
