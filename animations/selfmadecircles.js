//noprotect

var x = new Array();

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(5);
  background(0);
  
  for(var i = 0; i < 10;i++){
    x[i] = {
      x: random(width),
      y: random(height),
      r: random(100),
      q: random(1, 10),
      R: random(255),
      G: random(255),
      B: random(255)
    }
  }
}

function draw() {
  //background(0);
  for(var j = 0; j < x.length;j++){
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
  var q = 1 / quality;
  
  if (part == 0) {
    for (var i = xPos - r; i <= xPos + r; i = i + q) {
      var x = i;
      var z = xPos - i;
      var y = yPos - sqrt((r * r) - (z * z));
      point(x, y);
    }
  }
  if (part == 1) {
    for (var i1 = xPos - r; i1 <= xPos + r; i1 = i1 + q) {
      var x1 = i1;
      var z1 = xPos - i1;
      var y1 = yPos + sqrt((r * r) - (z1 * z1));
      point(x1, y1);
    }
  }
}