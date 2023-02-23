class binaryTree {
    constructor(value, nodeA = null, nodeB = null) {
      this.value = value;
      this.links = nodeA;
      this.rechts = nodeB;
    }
    render(x, y, scale = 1) {
      textAlign(CENTER);
  
      let display_text;
      if (this.value.v != null && this.value.n != null) {
        display_text = `${this.value.v} (${this.value.n})`;
      } else if (this.value.v != null) {
        display_text = this.value.v;
      } else if (this.value.n != null) {
        display_text = this.value.n;
      } else {
        display_text = "Node has no valid values";
      }
  
      let new_scale = scale * 0.5;
      let new_y = y + 80;
      let new_x_links = x - (width / 4) * scale;
      let new_x_rechts = x + (width / 4) * scale;
  
      if (this.links != null) {
        stroke("white");
        line(x, y, new_x_links, new_y);
        this.links.render(new_x_links, new_y, new_scale);
      }
      if (this.rechts != null) {
        stroke("white");
        line(x, y, new_x_rechts, new_y);
        this.rechts.render(new_x_rechts, new_y, new_scale);
      }
  
      noStroke();
      fill("white");
      ellipse(x, y, 25);
      fill("black");
      text(display_text, x, y + 2);
    }
  }
  
  class Buchstabe {
    constructor(anzahl = 1, zeichen = null) {
      this.n = anzahl;
      this.v = zeichen;
    }
  }
  
  let main;
  let codes;
  let inp_field;
  
  function setup() {
    createCanvas(windowWidth, windowHeight);
    textSize(10);
    frameRate(2);
    
    inp_field = createInput("abcdefghijklmnopqrstuvwxyz");
    inp_field.position(1, 1);
  }
  function draw() {
    background("black");
  
    let inp = inp_field.value();
    if(inp == null) return;
    main = huffman(String(inp));
    codes = calcCodes(main);
  
    main.render(width / 2, 20);
    textArray(codes);
  }
  
  function countLetters(str) {
    str = str.split("");
    str.sort();
  
    let output = [new Buchstabe(1, str[0])];
    for (let i = 1; i < str.length; i++) {
      if (str[i] === output[output.length - 1].v) {
        output[output.length - 1].n++;
      } else {
        output[output.length] = new Buchstabe(1, str[i]);
      }
    }
    return output;
  }
  
  function huffman(str) {
    str = countLetters(str);
    for (let i = 0; i < str.length; i++) {
      str[i] = new binaryTree(str[i]);
    }
    return createTree(str);
  }
  function createTree(inp) {
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
  function calcCodes(inp, bisherigerCode = "") {
    if(inp == null) return [];
    if (inp.value.v != null) return [inp.value.v + ": " + bisherigerCode];
    let a = calcCodes(inp.links, bisherigerCode + "0");
    let b = calcCodes(inp.rechts, bisherigerCode + "1");
    let c = a.concat(b);
    c.sort();
    c.sort((a1, b2) => a1.length - b2.length);
    return c;
  }
  function textArray(arr) {
    textAlign(LEFT);
  
    for (let i = 0; i < arr.length; i++) {
      fill('white')
      text(arr[arr.length - 1 - i], 10, height - 15 - 15 * i);
    }
  }
  