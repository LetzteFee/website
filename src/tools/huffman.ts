class binaryTree {
  public value: Buchstabe;
  public links: binaryTree | null;
  public rechts: binaryTree | null;
  constructor(
    value: Buchstabe,
    nodeA: binaryTree = null,
    nodeB: binaryTree = null,
  ) {
    this.value = value;
    this.links = nodeA;
    this.rechts = nodeB;
  }
  private calcCodes(bisherigerCode: string = ""): string[] {
    if (this.value.v != null) return [this.value.v + ": " + bisherigerCode];
    let a: string[] = this.links.calcCodes(bisherigerCode + "0");
    let b: string[] = this.rechts.calcCodes(bisherigerCode + "1");
    let c: string[] = a.concat(b);
    c.sort();
    c.sort((a1: string, b2: string) => a1.length - b2.length);
    return c;
  }

  public displayCodecs(): void {
    //@ts-expect-error
    textAlign(LEFT);

    let arr: string[] = this.calcCodes();

    for (let i = 0; i < arr.length; i++) {
      //@ts-ignore
      fill(255);
      //@ts-expect-error
      text(arr[arr.length - 1 - i], 10, height - 15 - 15 * i);
    }
  }
  public render(x: number, y: number, scale: number = 1): void {
    //@ts-expect-error
    textAlign(CENTER);

    let new_scale = scale * 0.5;
    let new_y = y + 80;
    //@ts-ignore
    let new_x_links = x - (width / 4) * scale;
    //@ts-ignore
    let new_x_rechts = x + (width / 4) * scale;

    if (this.links != null) {
      //@ts-ignore
      stroke(255);
      //@ts-ignore
      line(x, y, new_x_links, new_y);
      this.links.render(new_x_links, new_y, new_scale);
    }
    if (this.rechts != null) {
      //@ts-ignore
      stroke(255);
      //@ts-ignore
      line(x, y, new_x_rechts, new_y);
      this.rechts.render(new_x_rechts, new_y, new_scale);
    }
    //@ts-ignore
    noStroke();
    //@ts-ignore
    fill("white");
    //@ts-ignore
    ellipse(x, y, 25);
    //@ts-ignore
    fill("black");
    //@ts-ignore
    text(this.value.display(), x, y + 2);
  }
}

class Buchstabe {
  public n: number;
  public v: string | null;
  constructor(anzahl = 1, zeichen: string = null) {
    this.n = anzahl;
    this.v = zeichen;
  }
  public display(): string {
    if (this.v != null && this.n > 1) return `${this.v} (${this.n})`;
    if (this.v != null) return this.v;
    if (this.n != null) return this.n.toString();
    return "Node has no valid values";
  }
}

let inp_field: any;

//@ts-ignore
function setup() {
  createCanvas(windowWidth, windowHeight);
  //@ts-expect-error
  textSize(10);
  //@ts-expect-error
  frameRate(2);

  //@ts-expect-error
  inp_field = createInput("abcdefghijklmnopqrstuvwxyz");
  inp_field.position(1, 1);
}
//@ts-ignore
function draw() {
  background(0);

  let inp = inp_field.value();
  if (inp == null) return;

  let main = huffman(String(inp));

  main.render(width / 2, 20);
  main.displayCodecs();
}

function countLetters(str: string): Buchstabe[] {
  let arr: string[] = str.split("");
  arr.sort();

  let output: Buchstabe[] = [new Buchstabe(1, arr[0])];
  for (let i: number = 1; i < arr.length; i++) {
    if (arr[i] === output[output.length - 1].v) {
      output[output.length - 1].n++;
    } else {
      output[output.length] = new Buchstabe(1, arr[i]);
    }
  }
  return output;
}

function huffman(str: string): binaryTree {
  let buchstaben_arr: Buchstabe[] = countLetters(str);
  let arr: binaryTree[] = [];
  for (let i: number = 0; i < buchstaben_arr.length; i++) {
    arr[i] = new binaryTree(buchstaben_arr[i]);
  }
  return createTree(arr);
}
function createTree(inp: binaryTree[]): binaryTree {
  if (inp.length <= 1) return inp[0];

  //niedrigsten Node raussuchen, in Variable speichern und Eintrag löschen
  //wieder niedrigsten Node raussuchen, in Varable speichern und index speichern
  //Nodes kombinieren und im index speichern

  let index;

  let a = inp[0];
  index = 0;
  for (let i = 1; i < inp.length; i++) {
    if (inp[i].value.n < a.value.n) {
      a = inp[i];
      index = i;
    }
  }
  inp.splice(index, 1);

  let b = inp[0];
  index = 0;
  for (let i = 1; i < inp.length; i++) {
    if (inp[i].value.n < b.value.n) {
      b = inp[i];
      index = i;
    }
  }
  inp[index] = new binaryTree(new Buchstabe(a.value.n + b.value.n), a, b);

  return createTree(inp);
}
