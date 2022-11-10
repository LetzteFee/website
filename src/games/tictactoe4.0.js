//TODO: anzahl der siege für jedes team anzeigen; smooth animation fürs ändern des theme
var winner;
var AnzahlDerBelegtenFelder;
var SpielfeldBelegung = [];

var halfWidth;
var halfHeight;
var theme = 0;
var backgroundColor = 0;
var strokeColor = 255;

var aktuellerSpieler = "kreis";
var bereitsGespielteSpiele = 0;

function setup() {
  var FensterBreite = 700;
  var FensterHöhe = 700;

  if (FensterBreite < windowWidth) {
    FensterBreite = windowWidth;
  }
  if (FensterHöhe < windowHeight) {
    FensterHöhe = windowHeight;
  }

  createCanvas(FensterBreite, FensterHöhe);

  for (var i = 0; i < 9; i++) {
    SpielfeldBelegung[i] = {
      state: 0,
      r: 255,
      g: 255,
      b: 255
    }
  }
  noFill();

  halfWidth = width / 2;
  halfHeight = height / 2;
  /*
    if(window.localStorage.getItem("theme")){
      if(Number(window.localStorage.getItem("theme")) == 1){
        changeTheme();
      }
    }else {
      window.localStorage.setItem("theme", 0);
    }*/
}

function draw() {
  drawSpielfeld();

  if (winner) {
    drawEndScreen();
  }
}

function mousePressed() {
  if (winner) {
    resetGame();
  } else {
    if (mouseX > halfWidth - 270 && mouseX < halfWidth - 90 && mouseY > halfHeight - 270 && mouseY < halfHeight - 90 && !SpielfeldBelegung[0].state) {
      SpielfeldBelegung[0].state = aktuellerSpieler;
      changePlayer();
    }
    if (mouseX > halfWidth - 90 && mouseX < halfWidth + 90 && mouseY > halfHeight - 270 && mouseY < halfHeight - 90 && !SpielfeldBelegung[1].state) {
      SpielfeldBelegung[1].state = aktuellerSpieler;
      changePlayer();
    }
    if (mouseX > halfWidth + 90 && mouseX < halfWidth + 270 && mouseY > halfHeight - 270 && mouseY < halfHeight - 90 && !SpielfeldBelegung[2].state) {
      SpielfeldBelegung[2].state = aktuellerSpieler;
      changePlayer();
    }
    if (mouseX > halfWidth - 270 && mouseX < halfWidth - 90 && mouseY > halfHeight - 90 && mouseY < halfHeight + 90 && !SpielfeldBelegung[3].state) {
      SpielfeldBelegung[3].state = aktuellerSpieler;
      changePlayer();
    }
    if (mouseX > halfWidth - 90 && mouseX < halfWidth + 90 && mouseY > halfHeight - 90 && mouseY < halfHeight + 90 && !SpielfeldBelegung[4].state) {
      SpielfeldBelegung[4].state = aktuellerSpieler;
      changePlayer();
    }
    if (mouseX > halfWidth + 90 && mouseX < halfWidth + 270 && mouseY > halfHeight - 90 && mouseY < halfHeight + 90 && !SpielfeldBelegung[5].state) {
      SpielfeldBelegung[5].state = aktuellerSpieler;
      changePlayer();
    }
    if (mouseX > halfWidth - 270 && mouseX < halfWidth - 90 && mouseY > halfHeight + 90 && mouseY < halfHeight + 270 && !SpielfeldBelegung[6].state) {
      SpielfeldBelegung[6].state = aktuellerSpieler;
      changePlayer();
    }
    if (mouseX > halfWidth - 90 && mouseX < halfWidth + 90 && mouseY > halfHeight + 90 && mouseY < halfHeight + 270 && !SpielfeldBelegung[7].state) {
      SpielfeldBelegung[7].state = aktuellerSpieler;
      changePlayer();
    }
    if (mouseX > halfWidth + 90 && mouseX < halfWidth + 270 && mouseY > halfHeight + 90 && mouseY < halfHeight + 270 && !SpielfeldBelegung[8].state) {
      SpielfeldBelegung[8].state = aktuellerSpieler;
      changePlayer();
    }
  }
  checkResult();
}

function keyReleased() {
  changeTheme();
}

function changePlayer() {
  if (aktuellerSpieler == "kreis") {
    aktuellerSpieler = "kreuz";
  } else if (aktuellerSpieler == "kreuz") {
    aktuellerSpieler = "kreis";
  }
}

function checkResult() {
  AnzahlDerBelegtenFelder = 0;
  for (var k = 0; k < 9; k++) {
    if (SpielfeldBelegung[k].state == "kreuz" || SpielfeldBelegung[k].state == "kreis") {
      AnzahlDerBelegtenFelder = AnzahlDerBelegtenFelder + 1;
    }
  }

  //waagerecht für kreis
  if (SpielfeldBelegung[0].state == "kreis" && SpielfeldBelegung[1].state == "kreis" && SpielfeldBelegung[2].state == "kreis") {
    winner = "kreis";
    changeColorToGreen(0, 1, 2);
  }
  if (SpielfeldBelegung[3].state == "kreis" && SpielfeldBelegung[4].state == "kreis" && SpielfeldBelegung[5].state == "kreis") {
    winner = "kreis";
    changeColorToGreen(3, 4, 5);
  }
  if (SpielfeldBelegung[6].state == "kreis" && SpielfeldBelegung[7].state == "kreis" && SpielfeldBelegung[8].state == "kreis") {
    winner = "kreis";
    changeColorToGreen(6, 7, 8);
  }

  //waagerecht für kreuz
  if (SpielfeldBelegung[0].state == "kreuz" && SpielfeldBelegung[1].state == "kreuz" && SpielfeldBelegung[2].state == "kreuz") {
    winner = "kreuz";
    changeColorToGreen(0, 1, 2);
  }
  if (SpielfeldBelegung[3].state == "kreuz" && SpielfeldBelegung[4].state == "kreuz" && SpielfeldBelegung[5].state == "kreuz") {
    winner = "kreuz";
    changeColorToGreen(3, 4, 5);
  }
  if (SpielfeldBelegung[6].state == "kreuz" && SpielfeldBelegung[7].state == "kreuz" && SpielfeldBelegung[8].state == "kreuz") {
    winner = "kreuz";
    changeColorToGreen(6, 7, 8);
  }

  //senkrecht für kreis
  if (SpielfeldBelegung[0].state == "kreis" && SpielfeldBelegung[3].state == "kreis" && SpielfeldBelegung[6].state == "kreis") {
    winner = "kreis";
    changeColorToGreen(0, 3, 6);
  }
  if (SpielfeldBelegung[1].state == "kreis" && SpielfeldBelegung[4].state == "kreis" && SpielfeldBelegung[7].state == "kreis") {
    winner = "kreis";
    changeColorToGreen(1, 4, 7);
  }
  if (SpielfeldBelegung[2].state == "kreis" && SpielfeldBelegung[5].state == "kreis" && SpielfeldBelegung[8].state == "kreis") {
    winner = "kreis";
    changeColorToGreen(2, 5, 8);
  }
  //senkrecht für kreuz
  if (SpielfeldBelegung[0].state == "kreuz" && SpielfeldBelegung[3].state == "kreuz" && SpielfeldBelegung[6].state == "kreuz") {
    winner = "kreuz";
    changeColorToGreen(0, 3, 6);
  }
  if (SpielfeldBelegung[1].state == "kreuz" && SpielfeldBelegung[4].state == "kreuz" && SpielfeldBelegung[7].state == "kreuz") {
    winner = "kreuz";
    changeColorToGreen(1, 4, 7);
  }
  if (SpielfeldBelegung[2].state == "kreuz" && SpielfeldBelegung[5].state == "kreuz" && SpielfeldBelegung[8].state == "kreuz") {
    winner = "kreuz";
    changeColorToGreen(2, 5, 8);
  }
  //diagonal für kreis
  if (SpielfeldBelegung[0].state == "kreis" && SpielfeldBelegung[4].state == "kreis" && SpielfeldBelegung[8].state == "kreis") {
    winner = "kreis";
    changeColorToGreen(0, 4, 8);
  }
  if (SpielfeldBelegung[2].state == "kreis" && SpielfeldBelegung[4].state == "kreis" && SpielfeldBelegung[6].state == "kreis") {
    winner = "kreis";
    changeColorToGreen(2, 4, 6);
  }
  //diagonal für kreuz
  if (SpielfeldBelegung[0].state == "kreuz" && SpielfeldBelegung[4].state == "kreuz" && SpielfeldBelegung[8].state == "kreuz") {
    winner = "kreuz";
    changeColorToGreen(0, 4, 8);
  }
  if (SpielfeldBelegung[2].state == "kreuz" && SpielfeldBelegung[4].state == "kreuz" && SpielfeldBelegung[6].state == "kreuz") {
    winner = "kreuz";
    changeColorToGreen(2, 4, 6);
  }

  if (AnzahlDerBelegtenFelder == 8 && winner == null) {
    for (var i = 0; i <= 8; i++) {
      if (SpielfeldBelegung[i].state == 0) {
        SpielfeldBelegung[i].state = aktuellerSpieler;
        checkResult();
      }
    }
  }

  //falls niemand gewonnen hat
  if (AnzahlDerBelegtenFelder == 9 && winner == null) {
    winner = "Nobody";
  }
}

function drawSpielfeld() {
  background(backgroundColor);
  stroke(strokeColor);
  noFill();
  textSize(20);
  strokeWeight(1);

  //text("[Debug]: " + frameCount, halfWidth - 180, halfHeight + 320);
  if (!winner) {
    text("Current Player: " + aktuellerSpieler, 10, height - 30);
  }
  text("Player Rounds: " + bereitsGespielteSpiele, 10, height - 10);
  text("Press any key to change theme", 10, 20);

  strokeWeight(5);

  line(halfWidth - 270, halfHeight - 90, halfWidth + 270, halfHeight - 90);
  line(halfWidth - 270, halfHeight + 90, halfWidth + 270, halfHeight + 90);
  line(halfWidth - 90, halfHeight - 270, halfWidth - 90, halfHeight + 270);
  line(halfWidth + 90, halfHeight - 270, halfWidth + 90, halfHeight + 270);

  if (SpielfeldBelegung[0].state == "kreuz") {
    stroke(SpielfeldBelegung[0].r, SpielfeldBelegung[0].g, SpielfeldBelegung[0].b);
    line(halfWidth - 100, halfHeight - 100, halfWidth - 260, halfHeight - 260);
    line(halfWidth - 260, halfHeight - 100, halfWidth - 100, halfHeight - 260);
  }
  if (SpielfeldBelegung[0].state == "kreis") {
    stroke(SpielfeldBelegung[0].r, SpielfeldBelegung[0].g, SpielfeldBelegung[0].b);
    ellipse(halfWidth - 180, halfHeight - 180, 150);
  }
  if (SpielfeldBelegung[1].state == "kreuz") {
    stroke(SpielfeldBelegung[1].r, SpielfeldBelegung[1].g, SpielfeldBelegung[1].b);
    line(halfWidth - 80, halfHeight - 100, halfWidth + 80, halfHeight - 260);
    line(halfWidth + 80, halfHeight - 100, halfWidth - 80, halfHeight - 260);
  }
  if (SpielfeldBelegung[1].state == "kreis") {
    stroke(SpielfeldBelegung[1].r, SpielfeldBelegung[1].g, SpielfeldBelegung[1].b);
    ellipse(halfWidth, halfHeight - 180, 150);
  }
  if (SpielfeldBelegung[2].state == "kreuz") {
    stroke(SpielfeldBelegung[2].r, SpielfeldBelegung[2].g, SpielfeldBelegung[2].b);
    line(halfWidth + 100, halfHeight - 100, halfWidth + 260, halfHeight - 260);
    line(halfWidth + 100, halfHeight - 260, halfWidth + 260, halfHeight - 100);
  }
  if (SpielfeldBelegung[2].state == "kreis") {
    stroke(SpielfeldBelegung[2].r, SpielfeldBelegung[2].g, SpielfeldBelegung[2].b);
    ellipse(halfWidth + 180, halfHeight - 180, 150);
  }
  if (SpielfeldBelegung[3].state == "kreuz") {
    stroke(SpielfeldBelegung[3].r, SpielfeldBelegung[3].g, SpielfeldBelegung[3].b);
    line(halfWidth - 100, halfHeight + 80, halfWidth - 260, halfHeight - 80);
    line(halfWidth - 100, halfHeight - 80, halfWidth - 260, halfHeight + 80);
  }
  if (SpielfeldBelegung[3].state == "kreis") {
    stroke(SpielfeldBelegung[3].r, SpielfeldBelegung[3].g, SpielfeldBelegung[3].b);
    ellipse(halfWidth - 180, halfHeight, 150);
  }
  if (SpielfeldBelegung[4].state == "kreuz") {
    stroke(SpielfeldBelegung[4].r, SpielfeldBelegung[4].g, SpielfeldBelegung[4].b);
    line(halfWidth + 80, halfHeight + 80, halfWidth - 80, halfHeight - 80);
    line(halfWidth - 80, halfHeight + 80, halfWidth + 80, halfHeight - 80);
  }
  if (SpielfeldBelegung[4].state == "kreis") {
    stroke(SpielfeldBelegung[4].r, SpielfeldBelegung[4].g, SpielfeldBelegung[4].b);
    ellipse(halfWidth, halfHeight, 150);
  }
  if (SpielfeldBelegung[5].state == "kreuz") {
    stroke(SpielfeldBelegung[5].r, SpielfeldBelegung[5].g, SpielfeldBelegung[5].b);
    line(halfWidth + 260, halfHeight + 80, halfWidth + 100, halfHeight - 80);
    line(halfWidth + 100, halfHeight + 80, halfWidth + 260, halfHeight - 80);
  }
  if (SpielfeldBelegung[5].state == "kreis") {
    stroke(SpielfeldBelegung[5].r, SpielfeldBelegung[5].g, SpielfeldBelegung[5].b);
    ellipse(halfWidth + 180, halfHeight, 150);
  }
  if (SpielfeldBelegung[6].state == "kreuz") {
    stroke(SpielfeldBelegung[6].r, SpielfeldBelegung[6].g, SpielfeldBelegung[6].b);
    line(halfWidth - 100, halfHeight + 260, halfWidth - 260, halfHeight + 100);
    line(halfWidth - 260, halfHeight + 260, halfWidth - 100, halfHeight + 100);
  }
  if (SpielfeldBelegung[6].state == "kreis") {
    stroke(SpielfeldBelegung[6].r, SpielfeldBelegung[6].g, SpielfeldBelegung[6].b);
    ellipse(halfWidth - 180, halfHeight + 180, 150);
  }
  if (SpielfeldBelegung[7].state == "kreuz") {
    stroke(SpielfeldBelegung[7].r, SpielfeldBelegung[7].g, SpielfeldBelegung[7].b);
    line(halfWidth + 80, halfHeight + 260, halfWidth - 80, halfHeight + 100);
    line(halfWidth - 80, halfHeight + 260, halfWidth + 80, halfHeight + 100);
  }
  if (SpielfeldBelegung[7].state == "kreis") {
    stroke(SpielfeldBelegung[7].r, SpielfeldBelegung[7].g, SpielfeldBelegung[7].b);
    ellipse(halfWidth, halfHeight + 180, 150);
  }
  if (SpielfeldBelegung[8].state == "kreuz") {
    stroke(SpielfeldBelegung[8].r, SpielfeldBelegung[8].g, SpielfeldBelegung[8].b);
    line(halfWidth + 260, halfHeight + 260, halfWidth + 100, halfHeight + 100);
    line(halfWidth + 100, halfHeight + 260, halfWidth + 260, halfHeight + 100);
  }
  if (SpielfeldBelegung[8].state == "kreis") {
    stroke(SpielfeldBelegung[8].r, SpielfeldBelegung[8].g, SpielfeldBelegung[8].b);
    ellipse(halfWidth + 180, halfHeight + 180, 150);
  }
}

function drawEndScreen() {
  noStroke();
  stroke(strokeColor);
  strokeWeight(1);
  textSize(35);
  text(winner + " has won", halfWidth - 100, height / 12);
  textSize(20);
  text("CLICK to start a new round", halfWidth - 120, height / 6);
}

function resetColors() {
  if (theme == 0) {
    for (var i = 0; i < 9; i++) {
      SpielfeldBelegung[i].r = 255;
      SpielfeldBelegung[i].g = 255;
      SpielfeldBelegung[i].b = 255;
    }
  }
  if (theme == 1) {
    for (var j = 0; j < 9; j++) {
      SpielfeldBelegung[j].r = 0;
      SpielfeldBelegung[j].g = 0;
      SpielfeldBelegung[j].b = 0;
    }
  }
}

function changeTheme() {
  if (theme == 0) {
    theme = 1;
    backgroundColor = 255;
    strokeColor = 0;
    for (var i = 0; i < 9; i++) {
      if (SpielfeldBelegung[i].r == 255) {
        SpielfeldBelegung[i].r = 0;
        SpielfeldBelegung[i].g = 0;
        SpielfeldBelegung[i].b = 0;
      }
    }
  } else if (theme == 1) {
    theme = 0;
    backgroundColor = 0;
    strokeColor = 255;
    for (var j = 0; j < 9; j++) {
      if (SpielfeldBelegung[j].r == 0) {
        SpielfeldBelegung[j].r = 255;
        SpielfeldBelegung[j].g = 255;
        SpielfeldBelegung[j].b = 255;
      }
    }
  }

  //window.localStorage.setItem("theme", theme);
}

function resetGame() {
  winner = null;

  if (bereitsGespielteSpiele % 2 == 0) {
    aktuellerSpieler = "kreuz";
  } else {
    aktuellerSpieler = "kreis";
  }
  bereitsGespielteSpiele++;

  for (var i = 0; i <= 8; i++) {
    SpielfeldBelegung[i].state = 0;
  }
  resetColors();
}

function changeColorToGreen(x, y, z) {
  SpielfeldBelegung[x].r = 39;
  SpielfeldBelegung[x].g = 174;
  SpielfeldBelegung[x].b = 96;

  SpielfeldBelegung[y].r = 39;
  SpielfeldBelegung[y].g = 174;
  SpielfeldBelegung[y].b = 96;

  SpielfeldBelegung[z].r = 39;
  SpielfeldBelegung[z].g = 174;
  SpielfeldBelegung[z].b = 96;

  // 39, 174, 96
}
