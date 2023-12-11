enum Spieler {
    Kreuz,
    Kreis,
    null
}
class Spielfeld {
    public state: Spieler = Spieler.null;
    public r: number = 255;
    public g: number = 255;
    public b: number = 255;
    public alreadyInUse(): boolean {
        return this.state != Spieler.null;
    }
}

//TODO: anzahl der siege für jedes team anzeigen; smooth animation fürs ändern des theme
var winner: Spieler = Spieler.null;
var AnzahlDerBelegtenFelder;
var SpielfeldBelegung: Spielfeld[] = [];

var halfWidth: number;
var halfHeight: number;
var theme = 0;
var backgroundColor = 0;
var strokeColor = 255;

var aktuellerSpieler = Spieler.Kreis;
var bereitsGespielteSpiele = 0;

var setup = function () {
    createCanvas(Math.max(700, windowWidth), Math.max(700, windowHeight));
    noFill();

    for (var i = 0; i < 9; i++) {
        SpielfeldBelegung.push(new Spielfeld);
    }

    halfWidth = width / 2;
    halfHeight = height / 2;
}

var draw = function () {
    drawSpielfeld();

    if (winner !== Spieler.null) {
        drawEndScreen();
    }
}

function mousePressed() {
    if (winner != Spieler.null) {
        resetGame();
        return;
    }
    if (
        mouseX > halfWidth - 270 && mouseX < halfWidth - 90 &&
        mouseY > halfHeight - 270 && mouseY < halfHeight - 90 &&
        !SpielfeldBelegung[0].alreadyInUse()
    ) {
        SpielfeldBelegung[0].state = aktuellerSpieler;
        changePlayer();
    }
    if (
        mouseX > halfWidth - 90 && mouseX < halfWidth + 90 &&
        mouseY > halfHeight - 270 && mouseY < halfHeight - 90 &&
        !SpielfeldBelegung[1].alreadyInUse()
    ) {
        SpielfeldBelegung[1].state = aktuellerSpieler;
        changePlayer();
    }
    if (
        mouseX > halfWidth + 90 && mouseX < halfWidth + 270 &&
        mouseY > halfHeight - 270 && mouseY < halfHeight - 90 &&
        !SpielfeldBelegung[2].alreadyInUse()
    ) {
        SpielfeldBelegung[2].state = aktuellerSpieler;
        changePlayer();
    }
    if (
        mouseX > halfWidth - 270 && mouseX < halfWidth - 90 &&
        mouseY > halfHeight - 90 && mouseY < halfHeight + 90 &&
        !SpielfeldBelegung[3].alreadyInUse()
    ) {
        SpielfeldBelegung[3].state = aktuellerSpieler;
        changePlayer();
    }
    if (
        mouseX > halfWidth - 90 && mouseX < halfWidth + 90 &&
        mouseY > halfHeight - 90 && mouseY < halfHeight + 90 &&
        !SpielfeldBelegung[4].alreadyInUse()
    ) {
        SpielfeldBelegung[4].state = aktuellerSpieler;
        changePlayer();
    }
    if (
        mouseX > halfWidth + 90 && mouseX < halfWidth + 270 &&
        mouseY > halfHeight - 90 && mouseY < halfHeight + 90 &&
        !SpielfeldBelegung[5].alreadyInUse()
    ) {
        SpielfeldBelegung[5].state = aktuellerSpieler;
        changePlayer();
    }
    if (
        mouseX > halfWidth - 270 && mouseX < halfWidth - 90 &&
        mouseY > halfHeight + 90 && mouseY < halfHeight + 270 &&
        !SpielfeldBelegung[6].alreadyInUse()
    ) {
        SpielfeldBelegung[6].state = aktuellerSpieler;
        changePlayer();
    }
    if (
        mouseX > halfWidth - 90 && mouseX < halfWidth + 90 &&
        mouseY > halfHeight + 90 && mouseY < halfHeight + 270 &&
        !SpielfeldBelegung[7].alreadyInUse()
    ) {
        SpielfeldBelegung[7].state = aktuellerSpieler;
        changePlayer();
    }
    if (
        mouseX > halfWidth + 90 && mouseX < halfWidth + 270 &&
        mouseY > halfHeight + 90 && mouseY < halfHeight + 270 &&
        !SpielfeldBelegung[8].alreadyInUse()
    ) {
        SpielfeldBelegung[8].state = aktuellerSpieler;
        changePlayer();
    }
    checkResult();
}

function keyReleased() {
    changeTheme();
}

function changePlayer() {
    if (aktuellerSpieler == Spieler.Kreis) {
        aktuellerSpieler = Spieler.Kreuz;
    } else if (aktuellerSpieler == Spieler.Kreuz) {
        aktuellerSpieler = Spieler.Kreis;
    }
}

function checkResult() {
    AnzahlDerBelegtenFelder = 0;
    for (var k = 0; k < 9; k++) {
        if (
            SpielfeldBelegung[k].state == Spieler.Kreuz ||
            SpielfeldBelegung[k].state == Spieler.Kreis
        ) {
            AnzahlDerBelegtenFelder = AnzahlDerBelegtenFelder + 1;
        }
    }

    //waagerecht für kreis
    if (
        SpielfeldBelegung[0].state == Spieler.Kreis &&
        SpielfeldBelegung[1].state == Spieler.Kreis &&
        SpielfeldBelegung[2].state == Spieler.Kreis
    ) {
        winner = Spieler.Kreis;
        changeColorToGreen(0, 1, 2);
    }
    if (
        SpielfeldBelegung[3].state == Spieler.Kreis &&
        SpielfeldBelegung[4].state == Spieler.Kreis &&
        SpielfeldBelegung[5].state == Spieler.Kreis
    ) {
        winner = Spieler.Kreis;
        changeColorToGreen(3, 4, 5);
    }
    if (
        SpielfeldBelegung[6].state == Spieler.Kreis &&
        SpielfeldBelegung[7].state == Spieler.Kreis &&
        SpielfeldBelegung[8].state == Spieler.Kreis
    ) {
        winner = Spieler.Kreis;
        changeColorToGreen(6, 7, 8);
    }

    //waagerecht für kreuz
    if (
        SpielfeldBelegung[0].state == Spieler.Kreuz &&
        SpielfeldBelegung[1].state == Spieler.Kreuz &&
        SpielfeldBelegung[2].state == Spieler.Kreuz
    ) {
        winner = Spieler.Kreuz;
        changeColorToGreen(0, 1, 2);
    }
    if (
        SpielfeldBelegung[3].state == Spieler.Kreuz &&
        SpielfeldBelegung[4].state == Spieler.Kreuz &&
        SpielfeldBelegung[5].state == Spieler.Kreuz
    ) {
        winner = Spieler.Kreuz;
        changeColorToGreen(3, 4, 5);
    }
    if (
        SpielfeldBelegung[6].state == Spieler.Kreuz &&
        SpielfeldBelegung[7].state == Spieler.Kreuz &&
        SpielfeldBelegung[8].state == Spieler.Kreuz
    ) {
        winner = Spieler.Kreuz;
        changeColorToGreen(6, 7, 8);
    }

    //senkrecht für kreis
    if (
        SpielfeldBelegung[0].state == Spieler.Kreis &&
        SpielfeldBelegung[3].state == Spieler.Kreis &&
        SpielfeldBelegung[6].state == Spieler.Kreis
    ) {
        winner = Spieler.Kreis;
        changeColorToGreen(0, 3, 6);
    }
    if (
        SpielfeldBelegung[1].state == Spieler.Kreis &&
        SpielfeldBelegung[4].state == Spieler.Kreis &&
        SpielfeldBelegung[7].state == Spieler.Kreis
    ) {
        winner = Spieler.Kreis;
        changeColorToGreen(1, 4, 7);
    }
    if (
        SpielfeldBelegung[2].state == Spieler.Kreis &&
        SpielfeldBelegung[5].state == Spieler.Kreis &&
        SpielfeldBelegung[8].state == Spieler.Kreis
    ) {
        winner = Spieler.Kreis;
        changeColorToGreen(2, 5, 8);
    }
    //senkrecht für kreuz
    if (
        SpielfeldBelegung[0].state == Spieler.Kreuz &&
        SpielfeldBelegung[3].state == Spieler.Kreuz &&
        SpielfeldBelegung[6].state == Spieler.Kreuz
    ) {
        winner = Spieler.Kreuz;
        changeColorToGreen(0, 3, 6);
    }
    if (
        SpielfeldBelegung[1].state == Spieler.Kreuz &&
        SpielfeldBelegung[4].state == Spieler.Kreuz &&
        SpielfeldBelegung[7].state == Spieler.Kreuz
    ) {
        winner = Spieler.Kreuz;
        changeColorToGreen(1, 4, 7);
    }
    if (
        SpielfeldBelegung[2].state == Spieler.Kreuz &&
        SpielfeldBelegung[5].state == Spieler.Kreuz &&
        SpielfeldBelegung[8].state == Spieler.Kreuz
    ) {
        winner = Spieler.Kreuz;
        changeColorToGreen(2, 5, 8);
    }
    //diagonal für kreis
    if (
        SpielfeldBelegung[0].state == Spieler.Kreis &&
        SpielfeldBelegung[4].state == Spieler.Kreis &&
        SpielfeldBelegung[8].state == Spieler.Kreis
    ) {
        winner = Spieler.Kreis;
        changeColorToGreen(0, 4, 8);
    }
    if (
        SpielfeldBelegung[2].state == Spieler.Kreis &&
        SpielfeldBelegung[4].state == Spieler.Kreis &&
        SpielfeldBelegung[6].state == Spieler.Kreis
    ) {
        winner = Spieler.Kreis;
        changeColorToGreen(2, 4, 6);
    }
    //diagonal für kreuz
    if (
        SpielfeldBelegung[0].state == Spieler.Kreuz &&
        SpielfeldBelegung[4].state == Spieler.Kreuz &&
        SpielfeldBelegung[8].state == Spieler.Kreuz
    ) {
        winner = Spieler.Kreuz;
        changeColorToGreen(0, 4, 8);
    }
    if (
        SpielfeldBelegung[2].state == Spieler.Kreuz &&
        SpielfeldBelegung[4].state == Spieler.Kreuz &&
        SpielfeldBelegung[6].state == Spieler.Kreuz
    ) {
        winner = Spieler.Kreuz;
        changeColorToGreen(2, 4, 6);
    }

    if (AnzahlDerBelegtenFelder == 8 && winner == Spieler.null) {
        for (let i: number = 0; i < 9; i++) {
            if (SpielfeldBelegung[i].state === Spieler.null) {
                SpielfeldBelegung[i].state = aktuellerSpieler;
                checkResult();
            }
        }
    }

    //falls niemand gewonnen hat
    if (AnzahlDerBelegtenFelder == 9 && winner == Spieler.null) {
        winner = Spieler.null;
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

    if (SpielfeldBelegung[0].state == Spieler.Kreuz) {
        stroke(
            SpielfeldBelegung[0].r,
            SpielfeldBelegung[0].g,
            SpielfeldBelegung[0].b,
        );
        line(halfWidth - 100, halfHeight - 100, halfWidth - 260, halfHeight - 260);
        line(halfWidth - 260, halfHeight - 100, halfWidth - 100, halfHeight - 260);
    }
    if (SpielfeldBelegung[0].state == Spieler.Kreis) {
        stroke(
            SpielfeldBelegung[0].r,
            SpielfeldBelegung[0].g,
            SpielfeldBelegung[0].b,
        );
        ellipse(halfWidth - 180, halfHeight - 180, 150);
    }
    if (SpielfeldBelegung[1].state == Spieler.Kreuz) {
        stroke(
            SpielfeldBelegung[1].r,
            SpielfeldBelegung[1].g,
            SpielfeldBelegung[1].b,
        );
        line(halfWidth - 80, halfHeight - 100, halfWidth + 80, halfHeight - 260);
        line(halfWidth + 80, halfHeight - 100, halfWidth - 80, halfHeight - 260);
    }
    if (SpielfeldBelegung[1].state == Spieler.Kreis) {
        stroke(
            SpielfeldBelegung[1].r,
            SpielfeldBelegung[1].g,
            SpielfeldBelegung[1].b,
        );
        ellipse(halfWidth, halfHeight - 180, 150);
    }
    if (SpielfeldBelegung[2].state == Spieler.Kreuz) {
        stroke(
            SpielfeldBelegung[2].r,
            SpielfeldBelegung[2].g,
            SpielfeldBelegung[2].b,
        );
        line(halfWidth + 100, halfHeight - 100, halfWidth + 260, halfHeight - 260);
        line(halfWidth + 100, halfHeight - 260, halfWidth + 260, halfHeight - 100);
    }
    if (SpielfeldBelegung[2].state == Spieler.Kreis) {
        stroke(
            SpielfeldBelegung[2].r,
            SpielfeldBelegung[2].g,
            SpielfeldBelegung[2].b,
        );
        ellipse(halfWidth + 180, halfHeight - 180, 150);
    }
    if (SpielfeldBelegung[3].state == Spieler.Kreuz) {
        stroke(
            SpielfeldBelegung[3].r,
            SpielfeldBelegung[3].g,
            SpielfeldBelegung[3].b,
        );
        line(halfWidth - 100, halfHeight + 80, halfWidth - 260, halfHeight - 80);
        line(halfWidth - 100, halfHeight - 80, halfWidth - 260, halfHeight + 80);
    }
    if (SpielfeldBelegung[3].state == Spieler.Kreis) {
        stroke(
            SpielfeldBelegung[3].r,
            SpielfeldBelegung[3].g,
            SpielfeldBelegung[3].b,
        );
        ellipse(halfWidth - 180, halfHeight, 150);
    }
    if (SpielfeldBelegung[4].state == Spieler.Kreuz) {
        stroke(
            SpielfeldBelegung[4].r,
            SpielfeldBelegung[4].g,
            SpielfeldBelegung[4].b,
        );
        line(halfWidth + 80, halfHeight + 80, halfWidth - 80, halfHeight - 80);
        line(halfWidth - 80, halfHeight + 80, halfWidth + 80, halfHeight - 80);
    }
    if (SpielfeldBelegung[4].state == Spieler.Kreis) {
        stroke(
            SpielfeldBelegung[4].r,
            SpielfeldBelegung[4].g,
            SpielfeldBelegung[4].b,
        );
        ellipse(halfWidth, halfHeight, 150);
    }
    if (SpielfeldBelegung[5].state == Spieler.Kreuz) {
        stroke(
            SpielfeldBelegung[5].r,
            SpielfeldBelegung[5].g,
            SpielfeldBelegung[5].b,
        );
        line(halfWidth + 260, halfHeight + 80, halfWidth + 100, halfHeight - 80);
        line(halfWidth + 100, halfHeight + 80, halfWidth + 260, halfHeight - 80);
    }
    if (SpielfeldBelegung[5].state == Spieler.Kreis) {
        stroke(
            SpielfeldBelegung[5].r,
            SpielfeldBelegung[5].g,
            SpielfeldBelegung[5].b,
        );
        ellipse(halfWidth + 180, halfHeight, 150);
    }
    if (SpielfeldBelegung[6].state == Spieler.Kreuz) {
        stroke(
            SpielfeldBelegung[6].r,
            SpielfeldBelegung[6].g,
            SpielfeldBelegung[6].b,
        );
        line(halfWidth - 100, halfHeight + 260, halfWidth - 260, halfHeight + 100);
        line(halfWidth - 260, halfHeight + 260, halfWidth - 100, halfHeight + 100);
    }
    if (SpielfeldBelegung[6].state == Spieler.Kreis) {
        stroke(
            SpielfeldBelegung[6].r,
            SpielfeldBelegung[6].g,
            SpielfeldBelegung[6].b,
        );
        ellipse(halfWidth - 180, halfHeight + 180, 150);
    }
    if (SpielfeldBelegung[7].state == Spieler.Kreuz) {
        stroke(
            SpielfeldBelegung[7].r,
            SpielfeldBelegung[7].g,
            SpielfeldBelegung[7].b,
        );
        line(halfWidth + 80, halfHeight + 260, halfWidth - 80, halfHeight + 100);
        line(halfWidth - 80, halfHeight + 260, halfWidth + 80, halfHeight + 100);
    }
    if (SpielfeldBelegung[7].state == Spieler.Kreis) {
        stroke(
            SpielfeldBelegung[7].r,
            SpielfeldBelegung[7].g,
            SpielfeldBelegung[7].b,
        );
        ellipse(halfWidth, halfHeight + 180, 150);
    }
    if (SpielfeldBelegung[8].state == Spieler.Kreuz) {
        stroke(
            SpielfeldBelegung[8].r,
            SpielfeldBelegung[8].g,
            SpielfeldBelegung[8].b,
        );
        line(halfWidth + 260, halfHeight + 260, halfWidth + 100, halfHeight + 100);
        line(halfWidth + 100, halfHeight + 260, halfWidth + 260, halfHeight + 100);
    }
    if (SpielfeldBelegung[8].state == Spieler.Kreis) {
        stroke(
            SpielfeldBelegung[8].r,
            SpielfeldBelegung[8].g,
            SpielfeldBelegung[8].b,
        );
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
    winner = Spieler.null;

    if (bereitsGespielteSpiele % 2 == 0) {
        aktuellerSpieler = Spieler.Kreuz;
    } else {
        aktuellerSpieler = Spieler.Kreis;
    }
    bereitsGespielteSpiele++;

    for (var i = 0; i <= 8; i++) {
        SpielfeldBelegung[i].state = Spieler.null;
    }
    resetColors();
}

function changeColorToGreen(x: number, y: number, z: number) {
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
