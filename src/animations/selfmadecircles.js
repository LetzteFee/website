const FPS = 5;
const MAX_QUALITY = 10;
let x = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(FPS);
  background(0);
  
  for(let i = 0; i < 10;i++){
    x[i] = {
      x: random(width),
      y: random(height),
      r: random(100),
      q: random(1, MAX_QUALITY),
      R: random(256),
      G: random(256),
      B: random(256)
    }
  }
}

function draw() {
  for(let j = 0; j < x.length;j++){
    stroke(x[j].R, x[j].G, x[j].B);
    drawCircle(x[j].x, x[j].y, x[j].r, x[j].q);
    x[j].r = x[j].r + random(-10, 10);
  }
}
function drawCircle(xPos, yPos, r, quality){
  drawHalfCircle(xPos, yPos, r, 0, quality);
  drawHalfCircle(xPos, yPos, r, 1, quality);
}
function drawHalfCircle(xPos, yPos, r, part, quality) {
  let q = 1 / quality;
  
  if (part == 0) {
    for (let i = xPos - r; i <= xPos + r; i = i + q) {
      let x = i;
      let z = xPos - i;
      let y = yPos - sqrt((r * r) - (z * z));
      point(x, y);
    }
  }
  if (part == 1) {
    for (let i1 = xPos - r; i1 <= xPos + r; i1 = i1 + q) {
      let x1 = i1;
      let z1 = xPos - i1;
      let y1 = yPos + sqrt((r * r) - (z1 * z1));
      point(x1, y1);
    }
  }
}
