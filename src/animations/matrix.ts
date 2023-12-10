class MatrixHeavySymbol {
  private char: string = MatrixHeavySymbol.genChar();
  private alpha: number = random(32, 255);
  private static genChar(): string {
    let rangeMin = 0x3400;
    let rangeMax = 0x4dbf;
    return String.fromCharCode(random(rangeMin, rangeMax));
  }
  public draw(x: number, y: number): void {
    stroke(0, 128, 0, this.alpha);
    fill(146, 232, 185, this.alpha);
    text(this.char, x, y);
  }
  public reset(): void {
    this.char = MatrixHeavySymbol.genChar();
    this.alpha = random(32, 255);
  }
}
class MatrixHeavyString {
  private string: MatrixHeavySymbol[] = [];
  private x: number = random(width);
  private y: number = random(height);
  private speed: number = random(1, 5);
  constructor() {
    let length = random(4, 15);
    for (let i = 0; i < length; i++) {
      this.string.push(new MatrixHeavySymbol());
    }
  }
  public run(): void {
    this.draw();
    this.move();
    this.newLetter();
  }
  private draw(): void {
    let lineDistance = 18;
    for (let i = 0; i < this.string.length; i++) {
      this.string[i].draw(this.x, this.y + i * lineDistance);
    }
  }
  private move(): void {
    this.y += this.speed;
    if (this.y > height) {
      this.reset();
    }
  }
  private reset(): void {
    this.x = random(width);
    this.y = 0;
    this.speed = random(1, 5);

    for (let i = 0; i < this.string.length; i++) {
      this.string[i].reset();
    }
  }
  private newLetter(): void {
    if (Math.round(random(0, 10)) == 0) {
      this.string[Math.floor(random(this.string.length))].reset();
    }
  }
}

let matrixHeavy: MatrixHeavyString[] = [];

var setup = function () {
  createCanvas(windowWidth, windowHeight);

  let numberOfStrings = width / 50;
  for (let i = 0; i < numberOfStrings; i++) {
    matrixHeavy.push(new MatrixHeavyString());
  }
};

var draw = function () {
  background(0);
  for (let i = 0; i < matrixHeavy.length; i++) {
    matrixHeavy[i].run();
  }
};
