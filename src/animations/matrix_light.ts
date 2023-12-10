class MatrixLightString {
  private x: number;
  private y: number;
  private chance: number;
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.chance = MatrixLightString.genChance();
  }
  private static genChance(): number {
    return Math.floor(random(0, 5));
  }
  public run(): void {
    if (random(10) > this.chance) {
      this.move();
      this.draw();
    }
  }
  private move(): void {
    this.y = this.y + 12;
    if (this.y > height) {
      this.reset();
    }
  }
  private draw(): void {
    fill(106, 255, 135);
    text(
      String.fromCharCode(random(0x3400, 0x4dbf)),
      this.x,
      this.y,
    );
  }
  private reset(): void {
    this.y = 0;
    this.x = random(width);
    this.chance = MatrixLightString.genChance();
  }
}

let matrixLight: MatrixLightString[];

var setup = function () {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();
  frameRate(24);

  let numberOfStrings = width / 8;

  matrixLight = [];
  for (let i = 0; i < numberOfStrings; i++) {
    matrixLight.push(new MatrixLightString());
  }
};

var draw = function () {
  background(0, 0, 0, 16);
  for (let i = 0; i < matrixLight.length; i++) {
    matrixLight[i].run();
  }
};
