function calc() {
  function calc(id: string, x2: boolean) {
    //@ts-ignore
    let str: string = document.getElementById(id).value;
    if (str == "") return;
    let n: number = Number(str);
    Summe += n;
    SummeGewichtung += n;
    Count++;
    CountGewichtet++;
    if (x2) {
      CountGewichtet++;
      SummeGewichtung += n;
    }
  }
  function note(p: number): number {
    return 6 - (p + 1) * (1 / 3);
  }

  let SummeGewichtung: number = 0;
  let Summe: number = 0;
  let Count: number = 0;
  let CountGewichtet: number = 0;

  calc("p1", true);
  calc("p2", true);
  calc("p3", false);
  calc("p4", false);
  calc("p5", false);
  calc("a1", false);
  calc("a2", false);
  calc("a3", false);
  calc("sf", false);
  calc("sp", false);

  let durchschnittGewichtung: number = SummeGewichtung / CountGewichtet;
  let durchschnitt: number = Summe / Count;
  let out = `Summe: ${Summe}<br>`;
  out += `Summe mit Gewichtung: ${SummeGewichtung}<br>`;
  out += `Durchschnitt: ${durchschnitt}P = ${note(durchschnitt)}<br>`;
  out += `Durchschnitt mit Gewichtung: ${durchschnittGewichtung}P = ${
    note(durchschnittGewichtung)
  }`;
  // @ts-ignore
  document.getElementById("output").innerHTML = out;
}
