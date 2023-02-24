let objekt = [];
let x = -1;
const maxNumberObjects = 1000;
let backgroundColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES);

  backgroundColor = color("DarkSlateBlue");
}

function draw() {
  background(backgroundColor);

  if (x >= maxNumberObjects && frameCount % 100 == 0) {
    checkIfEnded();
  }

  if (x <= maxNumberObjects) {
    x = x + 1;
    newObjekt(x);
    if (x % 50 == 0) {
      print("[" + frameCount + "] " + "Objekt Nr. " + x + " erstellt.");
    }
  }

  for (var i = 0; i <= x; i++) {
    switch (objekt[i].type) {
      case 0:
        noFill();
        strokeWeight(10);
        stroke(objekt[i].color);
        point(objekt[i].x, objekt[i].currentY);
        break;
      case 1:
        noFill();
        strokeWeight(2);
        stroke(objekt[i].color);
        ellipse(
          objekt[i].x,
          objekt[i].currentY,
          objekt[i].width,
          objekt[i].height
        );
        break;
      case 2:
        noFill();
        strokeWeight(2);
        stroke(objekt[i].color);
        rect(objekt[i].x, objekt[i].currentY, 30, 30);
        break;
      case 3:
        noFill();
        strokeWeight(2);
        stroke(objekt[i].color);
        triangle(
          objekt[i].x,
          objekt[i].currentY,
          objekt[i].x + objekt[i].width,
          objekt[i].currentY + objekt[i].height / 2,
          objekt[i].x,
          objekt[i].currentY + objekt[i].height
        );
        break;
    }

    movement(i);
  }
}
function movement(i) {
  if (objekt[i].currentY != objekt[i].y) {
    objekt[i].currentY = objekt[i].currentY + 1;
  }
}
function newObjekt(x1) {
  let a = int(random(5, 20));
  let b = int(random(5, 20));

  objekt[x1] = {
    type: int(random(0, 4)),
    width: a,
    height: b,
    x: int(random(width - a)),
    y: int(random(height - b)),
    currentY: 0,
    color: color(frameCount % 256, 255, 255, 0.5),
  };
}
function checkIfEnded() {
  let programmEnded = true;
  for (var i = 0; i <= x; i++) {
    if (objekt[i].currentY != objekt[i].y) {
      programmEnded = false;
    }
  }
  if (programmEnded) {
    print("[" + frameCount + "] " + "Programm ist fertig und wurde gestoppt");
    noLoop();
  } else {
    print(
      "[" + frameCount + "] " +
        "Programm ist noch nicht fertig und wird nicht gestoppt."
    );
  }
}
