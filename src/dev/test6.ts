function calc() {
    let inp: string;
    // @ts-ignore
    inp = document.getElementById("text_input").value;
    let out: string = "";

    inp = inp.replace(/,/g, " ");
    //console.log(inp);
    let arr: number[] = inp.split(" ").map(function(v: string): number{return Number(v)});
    //console.log(arr);
    let SummeGewichtung: number = 0;
    let Summe: number = 0;
    for (let i: number = 0; i < arr.length; i++) {
        SummeGewichtung += arr[i];
        Summe += arr[i];
        if (i < 2) SummeGewichtung += arr[i];
    }
    let durchschnittGewichtung: number = SummeGewichtung / (arr.length + 2);
    let durchschnitt: number = Summe / arr.length;
    out  = `Summe: ${Summe}<br>`;
    out += `Summe mit Gewichtung: ${SummeGewichtung}<br>`;
    out += `Anzahl Fächer: ${arr.length}<br>`;
    out += `Anzahl mit Gewichtung: ${arr.length + 2}<br>`;
    out += `Durchschnitt: ${durchschnitt}<br>`;
    out += `Durchschnitt mit Gewichtung: ${durchschnittGewichtung}`;
    //console.log(out);
    // @ts-ignore
    document.getElementById("output").innerHTML = out;
}
