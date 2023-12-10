//farben für kreis
var kreisr = 58;
var kreisg = 95;
var kreisb = 205;

//farben für kreuz
var kreuzr = 58;
var kreuzg = 95;
var kreuzb = 205;

//farben für das spielfeld
var r = 58;
var g = 95;
var b = 205;

//hintergrundfarben
var hr = 161;
var hg = 161;
var hb = 161;
var hf;
var t1 = 0;
var t2 = 0;
var t3 = 0;

var zns = 0;
var ergebnis = 0;
var dL: number;
var kD: number;
var relLinienL;
var linienL: number;
var boolKreuzKreis = false;
var kreuz = 0;
var kreis = 0;
var hL1X: number;
var hL1Y: number;
var hL2X;
var hL2Y: number;
var vL1X: number;
var vL1Y: number;
var vL2X: number;
var vL2Y;

var xKlick = 0;
var yKlick = 0;
var numKlick = 0;

var sFBelegung: number[] = [];
var sFKlick = [];

var setup = function () {
    createCanvas(windowWidth, windowHeight);
    spielfeldBerechnen();
    //noprotect
    for (var i = 0; i < 9; i++) {
        sFBelegung[i] = 0;
    }
}

var draw = function () {
    t1 = t1 + 0.015;
    t2 = t2 + 0.01;
    t3 = t3 + 0.01324333233232323;
    hr = noise(t1) * 255;
    hg = noise(t2) * 255;
    hb = noise(t3) * 255;

    //falls nur grau
    //hf = random(100);
    background(hr, hg, hb);

    spielfeldBauen();
    textSize(20);
    noStroke();
    fill(0);
    //text(xKlick, 10, 20);
    //text(yKlick, 10, 50);
    //text(numKlick, 10, 80);
    if (kreuz == 1 || kreis == 1) {
        zns = 1;
    }

    if (
        sFBelegung[0] && sFBelegung[1] && sFBelegung[2] && sFBelegung[3] &&
        sFBelegung[4] && sFBelegung[5] && sFBelegung[6] && sFBelegung[7] &&
        sFBelegung[8]
    ) {
        zns = 1;
    }
    gewinnen();

    zeichneSymbol(vL1X - dL / 2, hL1Y - dL / 2, sFBelegung[0]);
    zeichneSymbol(vL1X + dL / 2, hL1Y - dL / 2, sFBelegung[1]);
    zeichneSymbol(vL2X + dL / 2, hL1Y - dL / 2, sFBelegung[2]);
    zeichneSymbol(vL1X - dL / 2, hL1Y + dL / 2, sFBelegung[3]);
    zeichneSymbol(vL1X + dL / 2, hL1Y + dL / 2, sFBelegung[4]);
    zeichneSymbol(vL2X + dL / 2, hL1Y + dL / 2, sFBelegung[5]);
    zeichneSymbol(vL1X - dL / 2, hL2Y + dL / 2, sFBelegung[6]);
    zeichneSymbol(vL1X + dL / 2, hL2Y + dL / 2, sFBelegung[7]);
    zeichneSymbol(vL2X + dL / 2, hL2Y + dL / 2, sFBelegung[8]);

    if (zns == 1) {
        textSize(30);
        fill(0);
        strokeWeight(2);
        stroke(0);
        text("Zum nächsten Spiel klicken", width / 2 - 150, height / 2);
        ergebnis = 1;
    }

    // wenn kreuz gewinnt
    if (kreuz == 1) {
        kreuzr = 64;
        kreuzg = 169;
        kreuzb = 64;
    }
    //wenn kreis gewinnt
    if (kreis == 1) {
        kreisr = 64;
        kreisg = 169;
        kreisb = 64;
    }
}

function mousePressed() {
    if (ergebnis == 0) {
        xKlick = mouseX;
        yKlick = mouseY;
        if (xKlick > hL1X && xKlick < vL1X && yKlick > vL1Y && yKlick < hL1Y) {
            numKlick = 1;
            if (sFBelegung[0] == 0) {
                if (boolKreuzKreis) {
                    sFBelegung[0] = 1;
                } else {
                    sFBelegung[0] = 2;
                }
                boolKreuzKreis = !boolKreuzKreis;
            }
        }
        if (xKlick > vL1X && xKlick < vL2X && yKlick > vL1Y && yKlick < hL1Y) {
            numKlick = 2;
            if (sFBelegung[1] == 0) {
                if (boolKreuzKreis) {
                    sFBelegung[1] = 1;
                } else {
                    sFBelegung[1] = 2;
                }
                boolKreuzKreis = !boolKreuzKreis;
            }
        }
        if (
            xKlick > vL2X && xKlick < hL1X + linienL && yKlick > vL1Y && yKlick < hL1Y
        ) {
            numKlick = 3;
            if (sFBelegung[2] == 0) {
                if (boolKreuzKreis) {
                    sFBelegung[2] = 1;
                } else {
                    sFBelegung[2] = 2;
                }
                boolKreuzKreis = !boolKreuzKreis;
            }
        }
        if (xKlick > hL1X && xKlick < vL1X && yKlick > hL1Y && yKlick < hL2Y) {
            numKlick = 4;
            if (sFBelegung[3] == 0) {
                if (boolKreuzKreis) {
                    sFBelegung[3] = 1;
                } else {
                    sFBelegung[3] = 2;
                }
                boolKreuzKreis = !boolKreuzKreis;
            }
        }
        if (xKlick > vL1X && xKlick < vL2X && yKlick > hL1Y && yKlick < hL2Y) {
            numKlick = 5;
            if (sFBelegung[4] == 0) {
                if (boolKreuzKreis) {
                    sFBelegung[4] = 1;
                } else {
                    sFBelegung[4] = 2;
                }
                boolKreuzKreis = !boolKreuzKreis;
            }
        }
        if (
            xKlick > vL2X && xKlick < hL1X + linienL && yKlick > hL1Y && yKlick < hL2Y
        ) {
            numKlick = 6;
            if (sFBelegung[5] == 0) {
                if (boolKreuzKreis) {
                    sFBelegung[5] = 1;
                } else {
                    sFBelegung[5] = 2;
                }
                boolKreuzKreis = !boolKreuzKreis;
            }
        }
        if (
            xKlick > hL1X && xKlick < vL1X && yKlick > hL2Y && yKlick < vL1X + linienL
        ) {
            numKlick = 7;
            if (sFBelegung[6] == 0) {
                if (boolKreuzKreis) {
                    sFBelegung[6] = 1;
                } else {
                    sFBelegung[6] = 2;
                }
                boolKreuzKreis = !boolKreuzKreis;
            }
        }
        if (
            xKlick > vL1X && xKlick < vL2X && yKlick > hL2Y && yKlick < vL1X + linienL
        ) {
            numKlick = 8;
            if (sFBelegung[7] == 0) {
                if (boolKreuzKreis) {
                    sFBelegung[7] = 1;
                } else {
                    sFBelegung[7] = 2;
                }
                boolKreuzKreis = !boolKreuzKreis;
            }
        }
        if (
            xKlick > vL2X && xKlick < hL1X + linienL && yKlick > hL2Y &&
            yKlick < vL1X + linienL
        ) {
            numKlick = 9;
            if (sFBelegung[8] == 0) {
                if (boolKreuzKreis) {
                    sFBelegung[8] = 1;
                } else {
                    sFBelegung[8] = 2;
                }
                boolKreuzKreis = !boolKreuzKreis;
            }
        }
    }

    if (ergebnis == 1) {
        sFBelegung[0] = 0;
        sFBelegung[1] = 0;
        sFBelegung[2] = 0;
        sFBelegung[3] = 0;
        sFBelegung[4] = 0;
        sFBelegung[5] = 0;
        sFBelegung[6] = 0;
        sFBelegung[7] = 0;
        sFBelegung[8] = 0;
        ergebnis = 0;
        kreuz = 0;
        kreis = 0;

        //farben für kreis
        kreisr = 58;
        kreisg = 95;
        kreisb = 205;

        //farben für kreuz
        kreuzr = 58;
        kreuzg = 95;
        kreuzb = 205;
        zns = 0;
    }
}

function spielfeldBerechnen() {
    relLinienL = 0.7;
    if (windowHeight >= windowWidth) {
        linienL = windowWidth * relLinienL;
    } else {
        linienL = windowHeight * relLinienL;
    }
    dL = linienL / 3;
    kD = dL * 0.7;
}

function spielfeldBauen() {
    vL1X = windowWidth / 2 - dL / 2;
    vL1Y = windowHeight / 2 - 3 * dL / 2;
    vL2X = windowWidth / 2 + dL / 2;
    vL2Y = vL1Y;
    hL1X = windowWidth / 2 - 3 * dL / 2;
    hL1Y = windowHeight / 2 - dL / 2;
    hL2X = hL1X;
    hL2Y = windowHeight / 2 + dL / 2;
    stroke(r, g, b);
    strokeWeight(20);
    push();
    translate(vL1X, vL1Y);
    line(0, 0, 0, linienL);
    pop();
    push();
    translate(vL2X, vL2Y);
    line(0, 0, 0, linienL);
    pop();
    push();
    translate(hL1X, hL1Y);
    line(0, 0, linienL, 0);
    pop();
    push();
    translate(hL2X, hL2Y);
    line(0, 0, linienL, 0);
    pop();
}

function gewinnen() {
    //kreuz
    if (sFBelegung[0] == 1 && sFBelegung[1] == 1 && sFBelegung[2] == 1) {
        kreuz = 1;
    }
    if (sFBelegung[3] == 1 && sFBelegung[4] == 1 && sFBelegung[5] == 1) {
        kreuz = 1;
    }
    if (sFBelegung[6] == 1 && sFBelegung[7] == 1 && sFBelegung[8] == 1) {
        kreuz = 1;
    }
    if (sFBelegung[0] == 1 && sFBelegung[4] == 1 && sFBelegung[8] == 1) {
        kreuz = 1;
    }
    if (sFBelegung[2] == 1 && sFBelegung[4] == 1 && sFBelegung[6] == 1) {
        kreuz = 1;
    }
    if (sFBelegung[0] == 1 && sFBelegung[3] == 1 && sFBelegung[6] == 1) {
        kreuz = 1;
    }
    if (sFBelegung[1] == 1 && sFBelegung[4] == 1 && sFBelegung[7] == 1) {
        kreuz = 1;
    }
    if (sFBelegung[2] == 1 && sFBelegung[5] == 1 && sFBelegung[8] == 1) {
        kreuz = 1;
    }

    //kreis
    if (sFBelegung[0] == 2 && sFBelegung[1] == 2 && sFBelegung[2] == 2) {
        kreis = 1;
    }
    if (sFBelegung[3] == 2 && sFBelegung[4] == 2 && sFBelegung[5] == 2) {
        kreis = 1;
    }
    if (sFBelegung[6] == 2 && sFBelegung[7] == 2 && sFBelegung[8] == 2) {
        kreis = 1;
    }
    if (sFBelegung[0] == 2 && sFBelegung[4] == 2 && sFBelegung[8] == 2) {
        kreis = 1;
    }
    if (sFBelegung[2] == 2 && sFBelegung[4] == 2 && sFBelegung[6] == 2) {
        kreis = 1;
    }
    if (sFBelegung[0] == 2 && sFBelegung[3] == 2 && sFBelegung[6] == 2) {
        kreis = 1;
    }
    if (sFBelegung[1] == 2 && sFBelegung[4] == 2 && sFBelegung[7] == 2) {
        kreis = 1;
    }
    if (sFBelegung[2] == 2 && sFBelegung[5] == 2 && sFBelegung[8] == 2) {
        kreis = 1;
    }
}

function zeichneSymbol(xKoord: number, yKoord: number, symbolTyp: number) {
    if (symbolTyp == 1) {
        push();
        translate(xKoord, yKoord);
        stroke(kreuzr, kreuzg, kreuzb);
        line(-kD / 2, -kD / 2, kD / 2, kD / 2);
        line(-kD / 2, kD / 2, kD / 2, -kD / 2);
        pop();
    }
    if (symbolTyp == 2) {
        noFill();
        stroke(kreisr, kreisg, kreisb);
        ellipse(xKoord, yKoord, kD, kD);
    }
}
