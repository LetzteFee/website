function start_sorting() {
  //gets called by button
  let input: any = document.getElementById("content").innerHTML;
  //doLog("start_sorting()", input);
  input = input.split(" ").map(function (v: string) {
    return Number(v);
  });
  //doLog("start_sorting()", input);
  // @ts-expect-error
  let algo: any = document.getElementById("select_algorithm").value;
  // @ts-expect-error
  initSorting(input, updateOutput, updateCounter, algo);

  doLog("start_sorting()", "finished");
}

function updateOutput(input: number[]) {
  document.getElementById("result").innerHTML = input.join(" ");
}
function updateCounter(input: number) {
  document.getElementById("counter").innerHTML = String(input);
}
function getRandomInput(): void {
  let str: string = getRandomArray(100, 100).join(" ");
  document.getElementById("content").innerHTML = str;
  doLog(
    "getRandomInput()",
    document.getElementById("content").innerHTML,
  );
}
