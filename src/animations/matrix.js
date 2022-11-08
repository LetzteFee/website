//konstante Werte
let backgroundColor = 0;
let lineDistance = 18;
let ni = 5;
let ChanceLetterChange = 10;
let rangeMin = 0x3400;
let rangeMax = 0x4dbf;

let missingLetter = "null";
let hx = 0;

// values that are set by the system
let numberOfStrings;
let matrix = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  numberOfStrings = width / ni;

  //generating first Strings
  for (let i = 0; i < numberOfStrings; i++) {
    newMatrix(i, 0);
  }
}

function draw() {
  background(backgroundColor);

  for (let j = 0; j < matrix.length; j++) {
    for (let l = 0; l < matrix[j].c.length; l++) {
      stroke(0, 128, 0, matrix[j].c[l].alpha);
      fill(146, 232, 185, matrix[j].c[l].alpha);
      text(matrix[j].c[l].c, matrix[j].x, matrix[j].y + l * lineDistance);
      newLetter(j, l);
    }

    //checking if letters have reached bottom
    if (matrix[j].y < height) {
      matrix[j].y = matrix[j].y + matrix[j].a;
    } else {
      newMatrix(j, 1);
    }
  }
}
function newMatrix(i, yMin) {
  let length = int(random(4, 15));
  let c = [];
  for (let k = 0; k < length; k++) {
    c[k] = {
      c: String.fromCharCode(random(rangeMin, rangeMax)),
          alpha: random(32, 255)
    };
  }


  //at programmstart strings should be able to spawn at every y value
  if (yMin == 0) {
    y = random(height);
  } else if (yMin == 1) {
    y = 0 - c.length * lineDistance;
  }

  matrix[i] = {
    x: int(random(width)),
    y: y,
    a: random(1, 5),
    c: c,
  };
}
function newLetter(a1, a2){
  var a0 = int(random(0, ChanceLetterChange));
  if(a0 == 0 && hx == 0){
    matrix[a1].c[a2].c = String.fromCharCode(random(rangeMin, rangeMax));
  }else if(a0 < ChanceLetterChange / 2 && hx == 1){
      matrix[a1].c[a2].c = missingLetter;
  }
}
