//noprotect
var m = 80; //maßstab
var hz = m / 2; //hälfte von m

function Sechseck(x, y) {
  //siehe Bild.jpg

  stroke(random(255), random(255), random(255));

  line(x, y, x - m, y + hz); //linie 1
  line(x, y, x + m, y + hz); //linie 2

  line(x - m, y + hz, x - m, y + hz + m); //linie 3
  line(x + m, y + hz, x + m, y + hz + m); //linie 4

  line(x + m, y + hz + m, x, y + m + m); //linie 5
  line(x - m, y + hz + m, x, y + m + m); //inie 6
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  //m = random(100); //Diese Zeile ist nur für die Web Edition
  //hz = m / 2; //Diese Zeile ist nur für die Web Edition

  for (var i = 0; i < height; i = i + m * 3 + 2) { //vertikale
    for (var j = m; j < width; j = j + m * 2 + 2) { //horizontale
      Sechseck(j, i);
    }
  }

  for (var k = m + hz + 2; k < height; k = k + m * 3 + 2) { //vertikale
    for (var l = 0; l < width; l = l + m * 2 + 2) { //horizontale
      Sechseck(l, k);
    }
  }
}
