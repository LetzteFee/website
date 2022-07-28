var objekt = new Array();
var x = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  fill(255);

  //Absicherungsdefinitionen
  newObjekt(0);
  newObjekt(1);
  newObjekt(2);
}

function newObjekt(x1) {
  var a = int(random(5, 20));
  var b = int(random(5, 20));

  objekt[x1] = {
    width: a,
    height: b,
    x: int(random(width - a)),
    y: int(random(height - b)),
    currentY: 0,
    color: 0,
  };
  print("Objekt " + x + " wurde neu definiert");
}

function draw() {
  background(0);
  noStroke();

  newObjekt(x);
  if (x == 100) {
    x = 0;
  } else {
    x = x + 1;
  }

  for (var i = 0; i <= x; i++) {
    print("start drawing");
    fill(objekt[i].color);
    ellipse(objekt[i].x, objekt[i].currentY, objekt[i].width, objekt[i].height);
    if (objekt[i].currentY != objekt[i].y) {
      objekt[i].currentY = objekt[i].currentY + 1;
    }
    if (objekt[i].color != 255) {
      objekt[i].color = (objekt[i].currentY / objekt[i].y) * 255;
    }
  }

  stroke(0);
  fill(255);
  //text("Anzahl der Objekte: " + x, 10, 10);
}

function newObjekt(i) {
  var a = int(random(5, 20));
  var b = int(random(5, 20));

  objekt[i] = {
    width: a,
    height: b,
    x: int(random(width - a)),
    y: int(random(height - b)),
    currentY: 0,
    color: 0,
  };
  print("Objekt Nr. " + i + " wurde neu definiert");
}
