class statRect {
  xPos: number;
  yPos: number;
  xSize: number;
  ySize: number;
  constructor(xPos: number, yPos: number, xSize: number, ySize: number) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.xSize = xSize;
    this.ySize = ySize;
  }
  render() {
  }
  move() {}
  isOutsideScreen() {
    return false;
  }
}
class sinRect {
  xPos: number;
  yPos: number;
  xSize: number;
  ySize: number;
  xSin: number;
  ySin: number;
  xSinMovement: boolean;
  ySinMovement: boolean;
  constructor(xPos: number, yPos: number, xSize: number, ySize: number) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.xSize = xSize;
    this.ySize = ySize;
    this.xSin = random(2 * PI);
    this.ySin = random(2 * PI);
    this.xSinMovement = getRandomBoolean();
    this.ySinMovement = getRandomBoolean();
  }
  render() {
    rect(this.xPos, this.yPos, this.xSize, this.ySize);
  }
  move() {
    //doLog("move()", JSON.stringify(this));

    this.yPos++;

    if (this.ySinMovement) {
      this.yPos = this.yPos + sin(this.ySin);
      this.ySin = this.ySin + 0.1;
    }

    if (this.xSinMovement) {
      if (
        this.xPos + sin(this.xSin) > 0 &&
        this.xPos + this.xSize + sin(this.xSin) < width
      ) {
        this.xPos = this.xPos + sin(this.xSin);
      }
      this.xSin = this.xSin + 0.1;
    }

    this.checkIfOutsideScreen();
  }
  checkIfOutsideScreen() {
    if (this.yPos > height) {
      this.xPos = getRandomInt(0, width - this.xSize);
      this.yPos = 0;
      this.xSin = random(2 * PI);
      this.ySin = random(2 * PI);
      this.xSinMovement = getRandomBoolean();
      this.ySinMovement = getRandomBoolean();
    }
  }
}

var objects: sinRect[] = [];

var setup = function () {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  for (let i = 0; i < 100; i++) {
    objects[i] = new sinRect(
      getRandomInt(0, width - 30),
      getRandomInt(0, height),
      30,
      10,
    );
  }
};

var draw = function () {
  background(0);
  for (let i = 0; i < objects.length; i++) {
    objects[i].render();
    objects[i].move();
  }
};
