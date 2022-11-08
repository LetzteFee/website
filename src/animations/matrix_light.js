//konstante Werte
let backgroundColor = 0;
let lineDistance = 12;
let ni = 5;
let rangeMin = 0x3400;
let rangeMax = 0x4dbf;
let mColor;

let matrix = [];

// values that are set by the system
let numberOfStrings;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(backgroundColor);
  frameRate(24);

  mColor = color(106, 255, 135);
  numberOfStrings = width / ni;

  for (let i = 0; i < numberOfStrings; i++) {
    matrix[i] = {
      x: random(width),
      y: random(height),
      chance: int(random(11)),
    };
  }
}

function draw() {
  background(0, 0, 0, 16);
  for (let j = 0; j < matrix.length; j++) {
    if (random(11) > matrix[j].chance) {
      noStroke();
      fill(mColor);
      text(
        String.fromCharCode(random(rangeMin, rangeMax)),
        matrix[j].x,
        matrix[j].y
      );

      if (matrix[j].y > height) {
        matrix[j].y = 0;
        matrix[j].x = random(width);
        matrix[j].chance = int(random(5, 11));

        noStroke();
        fill(0, 0, 0, 128);
        //rect(matrix[j].x - 20, matrix[j].y, 40, height);
      } else {
        matrix[j].y = matrix[j].y + lineDistance;
      }
    }
  }
}
