class binaryTree {
  public value: Buchstabe;
  public links: binaryTree;
  public rechts: binaryTree;
  constructor(
    value: Buchstabe,
    nodeA: binaryTree = null,
    nodeB: binaryTree = null,
  ) {
    this.value = value;
    this.links = nodeA;
    this.rechts = nodeB;
  }
  public maxDepth(): number {
    if (this.links == null && this.links == null) return 0;
    let a: number = this.links.maxDepth();
    let b: number = this.rechts.maxDepth();
    let c = a > b ? a : b;
    return c + 1;
  }
  public calcCodesStr(): string[] {
    let c: string[] = this.calcCodesArr().map(function (v: string[]): string {
      return v[0] + ": " + v[1];
    });

    c.sort();
    c.sort((a1: string, b2: string): number => a1.length - b2.length);
    return c;
  }
  public calcCodesArr(bisherigerCode: string = ""): string[][] {
    if (this.value.v != null) return [[this.value.v, bisherigerCode]];
    let a: string[][] = this.links.calcCodesArr(bisherigerCode + "0");
    let b: string[][] = this.rechts.calcCodesArr(bisherigerCode + "1");
    let c: string[][] = a.concat(b);
    return c;
  }
  public calcCodesMap(): Map<string, string> {
    let m: Map<string, string> = new Map();
    let arr: string[][] = this.calcCodesArr();
    for (let i: number = 0; i < arr.length; i++) {
      m.set(arr[i][0], arr[i][1]);
    }
    return m;
  }
  public origToCodedArr(original_string: string): string[] {
    let encoded_map: Map<string, string> = this.calcCodesMap();
    return original_string.split("").map(
      function (v: string): string {
        return encoded_map.get(v);
      },
    );
  }
  public displayOverlay(original_string: string): void {
    this.displayCodecTable();

    let encoded_arr: string[] = this.origToCodedArr(original_string);
    //@ts-ignore
    textAlign(LEFT);
    //@ts-ignore
    text(`Huf: ${encoded_arr.join("|")}`, width / 2 + 50, 20);

    //@ts-ignore
    textAlign(RIGHT);
    //@ts-ignore
    text(
      `Orig Bit länge (ASCII): ${original_string.length * 8}`,
      width - 10,
      height - 40,
    );
    //@ts-ignore
    text(
      `Huf Bit länge: ${encoded_arr.join("").length}`,
      width - 10,
      height - 80,
    );
    //@ts-ignore
    text(
      `Max Depth: ${this.maxDepth()}`,
      width - 10,
      height - 120,
    );
  }
  public displayCodecTable(): void {
    //@ts-ignore
    textAlign(LEFT);

    let arr: string[] = this.calcCodesStr();

    for (let i = 0; i < arr.length; i++) {
      //@ts-ignore
      fill(255);
      //@ts-ignore
      text(arr[arr.length - 1 - i], 10, height - 15 - 15 * i);
    }
  }
  public render(x: number, y: number, scale: number = 1): void {
    //@ts-ignore
    textAlign(CENTER);

    let new_scale = scale * 0.5;

    if (this.links != null) {
      //@ts-ignore
      let new_x_links = x - (width / 4) * scale;
      //@ts-ignore
      let new_y_links = y + (height - 20 - y) / (this.links.maxDepth() + 1);
      //@ts-ignore
      stroke(255);
      //@ts-ignore
      line(x, y, new_x_links, new_y_links);
      this.links.render(new_x_links, new_y_links, new_scale);
    }
    if (this.rechts != null) {
      //@ts-ignore
      let new_y_rechts = y + (height - 20 - y) / (this.rechts.maxDepth() + 1);
      //@ts-ignore
      let new_x_rechts = x + (width / 4) * scale;
      //@ts-ignore
      stroke(255);
      //@ts-ignore
      line(x, y, new_x_rechts, new_y_rechts);
      this.rechts.render(new_x_rechts, new_y_rechts, new_scale);
    }
    //@ts-ignore
    noStroke();
    //@ts-ignore
    fill(255);
    //@ts-ignore
    ellipse(x, y, 30);
    //@ts-ignore
    fill(0);
    //@ts-ignore
    text(this.value.display(), x, y + 2);
  }
  public print(inp: string): void {
    console.log(this.calcCodesMap());
    console.log(`Max Depth: ${this.maxDepth()}`);
    console.log(`Encoded String: ${this.origToCodedArr(inp).join("|")}`);
    console.log(`Originale Bitanzahl (ASCII): ${inp.length * 8}`);
    console.log(`Huf Bitanzahl: ${this.origToCodedArr(inp).join('').length}`);
  }
}

class Buchstabe {
  public n: number;
  public v: string;
  constructor(anzahl = 1, zeichen: string = null) {
    this.n = anzahl;
    this.v = zeichen;
  }
  public display(): string {
    if (this.v != null && this.n > 1) return `${this.v}(${this.n})`;
    if (this.v != null) return this.v;
    if (this.n != null) return this.n.toString();
    return "Node has no valid values";
  }
}

let inp_field: any;

function renderNewFrame(): void {
  //@ts-ignore
  background(0);

  let inp = inp_field.value();
  if (inp == null || inp == "" || typeof inp != "string") return;

  let main = huffman(String(inp));

  main.render(width / 2, 20);
  //main.displayOverlay(inp);
  main.print(inp);
}

//@ts-ignore
function setup(): void {
  //@ts-ignore
  createCanvas(windowWidth, windowHeight);
  //@ts-ignore
  textFont("monospace", 10);

  //@ts-ignore
  inp_field = createInput("abcdefghijklmnopqrstuvwxyz");
  inp_field.position(2, 2);
  inp_field.size(300);
  inp_field.input(renderNewFrame);

  renderNewFrame();
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

  inp.sort(function (a1: binaryTree, b1: binaryTree): number {
    return a1.value.n - b1.value.n;
  });

  let a: binaryTree = inp[0];
  let b: binaryTree = inp[1];
  inp.splice(0, 1);
  inp[0] = new binaryTree(new Buchstabe(a.value.n + b.value.n), a, b);

  return createTree(inp);
}
