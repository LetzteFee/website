class Flake {
  private readonly x: number;
  private currentY: number;
  private readonly targetY: number;
  private readonly width: number;
  private readonly height: number;
  constructor(inp_target: null | number = null, inp_current: number = 0) {
    this.width = getRandomInt(0, 20);
    this.height = getRandomInt(0, 20);

    // @ts-ignore
    this.x = getRandomInt(0 + this.width / 2, width - this.width / 2);
    if (inp_target == null) {
      // @ts-ignore
      this.targetY = getRandomInt(
        0 + this.height / 2,
        height - this.height / 2,
      );
    } else {
      this.targetY = inp_target;
    }
    this.currentY = inp_current;
  }
  public move(): void {
    this.currentY++;
  }
  private color(): number {
    return Number(DARKMODE) * 255 -
      this.currentY / this.targetY * 255 * (1 - Number(!DARKMODE) * 2);
  }
  public check(): boolean {
    return this.currentY > this.targetY;
  }
  public draw(): void {
    fill(this.color());
    ellipse(this.x, this.currentY, this.width, this.height);
  }
}
let objekt: Flake[] = [];
let DARKMODE: boolean = false;

var setup = function (): void {
  createCanvas(windowWidth, windowHeight);
  fill(255);
  noStroke();
  for (let i = 0; i < 256; i++) {
    let h = getRandomInt(0, height);
    objekt[i] = new Flake(h, getRandomInt(0, h));
  }
};

var draw = function () {
  background(Number(!DARKMODE) * 255);
  for (let i = 0; i < objekt.length; i++) {
    objekt[i].move();
    objekt[i].draw();
    if (objekt[i].check()) {
      objekt[i] = new Flake();
    }
  }
};
