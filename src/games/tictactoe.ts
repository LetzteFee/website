class TictactoeTheme {
    private static theme: number = 0; // 0 = Dark; 1 = Light
    private static backgroundColor: number = 0;
    private static strokeColor: number = 255;
    public static setBackground(): void {
        background(TictactoeTheme.backgroundColor);
    }
    public static setStroke(): void {
        stroke(TictactoeTheme.strokeColor);
    }
    public static switch(): void {
        this.theme = this.theme == 0 ? 1 : 0;
    }
    public static update(): void {
        if (TictactoeTheme.theme == 0) {
            if (TictactoeTheme.backgroundColor > 0) {
                TictactoeTheme.backgroundColor -= 25.5;
            }
            if (TictactoeTheme.strokeColor < 255) {
                TictactoeTheme.strokeColor += 25.5;
            }
        } else if (TictactoeTheme.theme == 1) {
            if (TictactoeTheme.backgroundColor < 255) {
                TictactoeTheme.backgroundColor += 25.5;
            }

            if (TictactoeTheme.strokeColor > 0) {
                TictactoeTheme.strokeColor -= 25.5;
            }
        } else {
            throw "Invalid Theme";
        }
    }
}
enum TictactoeSpieler {
    Kreuz,
    Kreis,
    Unentschieden,
}
class TictactoeSpielfeld {
    public state: TictactoeSpieler = null;
    private isGreen: boolean = false;
    public isFree(): boolean {
        return this.state == null;
    }
    public draw(x: number, y: number): void {
        if (this.isGreen) {
            stroke(39, 174, 96);
        } else {
            TictactoeTheme.setStroke();
        }
        switch (this.state) {
            case TictactoeSpieler.Kreuz:
                line(x + 80, y + 80, x - 80, y - 80);
                line(x + 80, y - 80, x - 80, y + 80);
                break;
            case TictactoeSpieler.Kreis:
                ellipse(x, y, 150);
                break;
        }
    }
    public changeColorToGreen(): void {
        this.isGreen = true;
    }
    public reset(): void {
        this.isGreen = false;
        this.state = null;
    }
}
class Tictactoe {
    private static winner: TictactoeSpieler = null;
    private static SpielfeldBelegung: TictactoeSpielfeld[] = [];

    private static halfWidth: number;
    private static halfHeight: number;

    private static aktuellerSpieler = TictactoeSpieler.Kreis;
    private static bereitsGespielteSpiele = 0;
    public static setup(): void {
        for (let i: number = 0; i < 9; i++) {
            Tictactoe.SpielfeldBelegung.push(new TictactoeSpielfeld());
        }

        Tictactoe.halfWidth = width / 2;
        Tictactoe.halfHeight = height / 2;
    }
    public static run(): void {
        Tictactoe.drawSpielfeld();
        if (Tictactoe.winner != null) {
            Tictactoe.drawEndScreen();
        }
    }
    private static getPlayerName(player: TictactoeSpieler): string {
        switch (player) {
            case TictactoeSpieler.Kreis:
                return "Circle";
            case TictactoeSpieler.Kreuz:
                return "Cross";
            case TictactoeSpieler.Unentschieden:
                return "Nobody";
            default:
                return "null";
        }
    }
    private static drawEndScreen(): void {
        TictactoeTheme.setStroke();
        strokeWeight(1);
        textSize(35);
        text(
            Tictactoe.getPlayerName(Tictactoe.winner) + " has won",
            Tictactoe.halfWidth - 100,
            height / 12,
        );
        textSize(20);
        text("CLICK to start a new round", Tictactoe.halfWidth - 120, height / 6);
    }
    private static drawSpielfeld(): void {
        TictactoeTheme.setBackground();
        TictactoeTheme.setStroke();
        noFill();
        textSize(20);
        strokeWeight(1);

        if (Tictactoe.winner == null) {
            text(
                "Current Player: " +
                Tictactoe.getPlayerName(Tictactoe.aktuellerSpieler),
                10,
                height - 30,
            );
        }
        text("Player Rounds: " + Tictactoe.bereitsGespielteSpiele, 10, height - 10);
        text("Press any key to change theme", 10, 20);

        strokeWeight(5);

        line(
            Tictactoe.halfWidth - 270,
            Tictactoe.halfHeight - 90,
            Tictactoe.halfWidth + 270,
            Tictactoe.halfHeight - 90,
        );
        line(
            Tictactoe.halfWidth - 270,
            Tictactoe.halfHeight + 90,
            Tictactoe.halfWidth + 270,
            Tictactoe.halfHeight + 90,
        );
        line(
            Tictactoe.halfWidth - 90,
            Tictactoe.halfHeight - 270,
            Tictactoe.halfWidth - 90,
            Tictactoe.halfHeight + 270,
        );
        line(
            Tictactoe.halfWidth + 90,
            Tictactoe.halfHeight - 270,
            Tictactoe.halfWidth + 90,
            Tictactoe.halfHeight + 270,
        );

        Tictactoe.SpielfeldBelegung[0].draw(
            Tictactoe.halfWidth - 180,
            Tictactoe.halfHeight - 180,
        );
        Tictactoe.SpielfeldBelegung[1].draw(
            Tictactoe.halfWidth,
            Tictactoe.halfHeight - 180,
        );
        Tictactoe.SpielfeldBelegung[2].draw(
            Tictactoe.halfWidth + 180,
            Tictactoe.halfHeight - 180,
        );

        Tictactoe.SpielfeldBelegung[3].draw(
            Tictactoe.halfWidth - 180,
            Tictactoe.halfHeight,
        );
        Tictactoe.SpielfeldBelegung[4].draw(
            Tictactoe.halfWidth,
            Tictactoe.halfHeight,
        );
        Tictactoe.SpielfeldBelegung[5].draw(
            Tictactoe.halfWidth + 180,
            Tictactoe.halfHeight,
        );

        Tictactoe.SpielfeldBelegung[6].draw(
            Tictactoe.halfWidth - 180,
            Tictactoe.halfHeight + 180,
        );
        Tictactoe.SpielfeldBelegung[7].draw(
            Tictactoe.halfWidth,
            Tictactoe.halfHeight + 180,
        );
        Tictactoe.SpielfeldBelegung[8].draw(
            Tictactoe.halfWidth + 180,
            Tictactoe.halfHeight + 180,
        );
    }
    public static checkMouse(): void {
        if (Tictactoe.winner != null) {
            Tictactoe.resetGame();
            return;
        }
        let target: number = this.getMouseLocation();
        if (target == null) return;
        if (!Tictactoe.SpielfeldBelegung[target].isFree()) return;

        Tictactoe.SpielfeldBelegung[target].state = Tictactoe.aktuellerSpieler;
        Tictactoe.changePlayer();
        Tictactoe.checkResult();
    }
    private static getMouseLocation(): number {
        if (
            mouseX > Tictactoe.halfWidth - 270 && mouseX < Tictactoe.halfWidth - 90 &&
            mouseY > Tictactoe.halfHeight - 270 && mouseY < Tictactoe.halfHeight - 90
        ) {
            return 0;
        }
        if (
            mouseX > Tictactoe.halfWidth - 90 && mouseX < Tictactoe.halfWidth + 90 &&
            mouseY > Tictactoe.halfHeight - 270 && mouseY < Tictactoe.halfHeight - 90
        ) {
            return 1;
        }
        if (
            mouseX > Tictactoe.halfWidth + 90 && mouseX < Tictactoe.halfWidth + 270 &&
            mouseY > Tictactoe.halfHeight - 270 && mouseY < Tictactoe.halfHeight - 90
        ) {
            return 2;
        }
        if (
            mouseX > Tictactoe.halfWidth - 270 && mouseX < Tictactoe.halfWidth - 90 &&
            mouseY > Tictactoe.halfHeight - 90 && mouseY < Tictactoe.halfHeight + 90
        ) {
            return 3;
        }
        if (
            mouseX > Tictactoe.halfWidth - 90 && mouseX < Tictactoe.halfWidth + 90 &&
            mouseY > Tictactoe.halfHeight - 90 && mouseY < Tictactoe.halfHeight + 90
        ) {
            return 4;
        }
        if (
            mouseX > Tictactoe.halfWidth + 90 && mouseX < Tictactoe.halfWidth + 270 &&
            mouseY > Tictactoe.halfHeight - 90 && mouseY < Tictactoe.halfHeight + 90
        ) {
            return 5;
        }
        if (
            mouseX > Tictactoe.halfWidth - 270 && mouseX < Tictactoe.halfWidth - 90 &&
            mouseY > Tictactoe.halfHeight + 90 && mouseY < Tictactoe.halfHeight + 270
        ) {
            return 6;
        }
        if (
            mouseX > Tictactoe.halfWidth - 90 && mouseX < Tictactoe.halfWidth + 90 &&
            mouseY > Tictactoe.halfHeight + 90 && mouseY < Tictactoe.halfHeight + 270
        ) {
            return 7;
        }
        if (
            mouseX > Tictactoe.halfWidth + 90 && mouseX < Tictactoe.halfWidth + 270 &&
            mouseY > Tictactoe.halfHeight + 90 && mouseY < Tictactoe.halfHeight + 270
        ) {
            return 8;
        }
        return null;
    }
    private static checkSpecificPlayer(player: TictactoeSpieler): boolean {
        let isWinner = false;

        //waagerecht
        if (
            Tictactoe.SpielfeldBelegung[0].state == player &&
            Tictactoe.SpielfeldBelegung[1].state == player &&
            Tictactoe.SpielfeldBelegung[2].state == player
        ) {
            Tictactoe.changeToGreen(0, 1, 2);
            isWinner = true;
        }
        if (
            Tictactoe.SpielfeldBelegung[3].state == player &&
            Tictactoe.SpielfeldBelegung[4].state == player &&
            Tictactoe.SpielfeldBelegung[5].state == player
        ) {
            Tictactoe.changeToGreen(3, 4, 5);
            isWinner = true;
        }
        if (
            Tictactoe.SpielfeldBelegung[6].state == player &&
            Tictactoe.SpielfeldBelegung[7].state == player &&
            Tictactoe.SpielfeldBelegung[8].state == player
        ) {
            Tictactoe.changeToGreen(6, 7, 8);
            isWinner = true;
        }

        //senkrecht
        if (
            Tictactoe.SpielfeldBelegung[0].state == player &&
            Tictactoe.SpielfeldBelegung[3].state == player &&
            Tictactoe.SpielfeldBelegung[6].state == player
        ) {
            isWinner = true;
            Tictactoe.changeToGreen(0, 3, 6);
        }
        if (
            Tictactoe.SpielfeldBelegung[1].state == player &&
            Tictactoe.SpielfeldBelegung[4].state == player &&
            Tictactoe.SpielfeldBelegung[7].state == player
        ) {
            isWinner = true;
            Tictactoe.changeToGreen(1, 4, 7);
        }
        if (
            Tictactoe.SpielfeldBelegung[2].state == player &&
            Tictactoe.SpielfeldBelegung[5].state == player &&
            Tictactoe.SpielfeldBelegung[8].state == player
        ) {
            isWinner = true;
            Tictactoe.changeToGreen(2, 5, 8);
        }

        //diagonal
        if (
            Tictactoe.SpielfeldBelegung[0].state == player &&
            Tictactoe.SpielfeldBelegung[4].state == player &&
            Tictactoe.SpielfeldBelegung[8].state == player
        ) {
            isWinner = true;
            Tictactoe.changeToGreen(0, 4, 8);
        }
        if (
            Tictactoe.SpielfeldBelegung[2].state == player &&
            Tictactoe.SpielfeldBelegung[4].state == player &&
            Tictactoe.SpielfeldBelegung[6].state == player
        ) {
            isWinner = true;
            Tictactoe.changeToGreen(2, 4, 6);
        }
        return isWinner;
    }
    private static checkResult(): void {
        if (Tictactoe.checkSpecificPlayer(TictactoeSpieler.Kreis)) {
            Tictactoe.winner = TictactoeSpieler.Kreis;
        } else if (Tictactoe.checkSpecificPlayer(TictactoeSpieler.Kreuz)) {
            Tictactoe.winner = TictactoeSpieler.Kreuz;
        } else {
            let AnzahlDerBelegtenFelder = 0;
            for (let i: number = 0; i < 9; i++) {
                if (
                    Tictactoe.SpielfeldBelegung[i].state == TictactoeSpieler.Kreuz ||
                    Tictactoe.SpielfeldBelegung[i].state == TictactoeSpieler.Kreis
                ) {
                    AnzahlDerBelegtenFelder++;
                }
            }

            if (AnzahlDerBelegtenFelder == 8) {
                for (let i: number = 0; i < 9; i++) {
                    if (Tictactoe.SpielfeldBelegung[i].state == null) {
                        Tictactoe.SpielfeldBelegung[i].state = Tictactoe.aktuellerSpieler;
                        Tictactoe.checkResult();
                    }
                }
            }

            //falls niemand gewonnen hat
            if (AnzahlDerBelegtenFelder == 9) {
                Tictactoe.winner = TictactoeSpieler.Unentschieden;
            }
        }
    }
    private static changeToGreen(x: number, y: number, z: number): void {
        Tictactoe.SpielfeldBelegung[x].changeColorToGreen();
        Tictactoe.SpielfeldBelegung[y].changeColorToGreen();
        Tictactoe.SpielfeldBelegung[z].changeColorToGreen();
    }
    private static resetGame() {
        Tictactoe.winner = null;
        Tictactoe.aktuellerSpieler = (Tictactoe.bereitsGespielteSpiele % 2 == 0)
            ? TictactoeSpieler.Kreuz
            : TictactoeSpieler.Kreis;
        Tictactoe.bereitsGespielteSpiele++;

        for (let i: number = 0; i < 9; i++) {
            Tictactoe.SpielfeldBelegung[i].reset();
        }
    }
    private static changePlayer(): void {
        Tictactoe.aktuellerSpieler =
            (Tictactoe.aktuellerSpieler == TictactoeSpieler.Kreis)
                ? TictactoeSpieler.Kreuz
                : TictactoeSpieler.Kreis;
    }
}

var setup = function () {
    createCanvas(Math.max(700, windowWidth), Math.max(700, windowHeight));
    noFill();
    Tictactoe.setup();
};

var draw = function () {
    Tictactoe.run();
    TictactoeTheme.update();
};

var mousePressed = function (): void {
    Tictactoe.checkMouse();
};

var keyReleased = function (): void {
    TictactoeTheme.switch();
};
