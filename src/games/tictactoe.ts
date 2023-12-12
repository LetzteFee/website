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
    public static setGreenStroke(): void {
        stroke(39, 174, 96);
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
    private x: number;
    private y: number;
    public state: TictactoeSpieler = null;
    private isGreen: boolean = false;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    public isFree(): boolean {
        return this.state == null;
    }
    public draw(): void {
        this.isGreen ? TictactoeTheme.setGreenStroke() : TictactoeTheme.setStroke();
        switch (this.state) {
            case TictactoeSpieler.Kreuz:
                line(this.x + 80, this.y + 80, this.x - 80, this.y - 80);
                line(this.x + 80, this.y - 80, this.x - 80, this.y + 80);
                break;
            case TictactoeSpieler.Kreis:
                ellipse(this.x, this.y, 150);
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
    private static centerX: number;
    private static centerY: number;
    private static aktuellerSpieler = TictactoeSpieler.Kreis;
    private static bereitsGespielteSpiele = 0;
    public static setup(): void {
        Tictactoe.centerX = width / 2;
        Tictactoe.centerY = height / 2;

        for (let i: number = 0; i < 3; i++) {
            for (let j: number = 0; j < 3; j++) {
                Tictactoe.SpielfeldBelegung[i * 3 + j] = new TictactoeSpielfeld(
                    Tictactoe.centerX - 180 + j * 180,
                    Tictactoe.centerY - 180 + i * 180,
                );
            }
        }
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
            Tictactoe.centerX - 100,
            height / 12,
        );
        textSize(20);
        text("CLICK to start a new round", Tictactoe.centerX - 120, height / 6);
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
            Tictactoe.centerX - 270,
            Tictactoe.centerY - 90,
            Tictactoe.centerX + 270,
            Tictactoe.centerY - 90,
        );
        line(
            Tictactoe.centerX - 270,
            Tictactoe.centerY + 90,
            Tictactoe.centerX + 270,
            Tictactoe.centerY + 90,
        );
        line(
            Tictactoe.centerX - 90,
            Tictactoe.centerY - 270,
            Tictactoe.centerX - 90,
            Tictactoe.centerY + 270,
        );
        line(
            Tictactoe.centerX + 90,
            Tictactoe.centerY - 270,
            Tictactoe.centerX + 90,
            Tictactoe.centerY + 270,
        );
        for (let i: number = 0; i < 9; i++) {
            Tictactoe.SpielfeldBelegung[i].draw();
        }
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
        for (let i: number = 0; i < 3; i++) {
            let topLimit: number = Tictactoe.centerY - 270 + 180 * i;
            let bottomLimit: number = Tictactoe.centerY - 90 + 180 * i;
            for (let j: number = 0; j < 3; j++) {
                let leftLimit: number = Tictactoe.centerX - 270 + 180 * j;
                let rightLimit: number = Tictactoe.centerX - 90 + 180 * j;
                if (
                    mouseX > leftLimit && mouseX < rightLimit &&
                    mouseY < bottomLimit && mouseY > topLimit
                ) {
                    return 3 * i + j;
                }
            }
        }
        return null;
    }
    private static checkSpecificPlayerOwnsConfiguration(
        a: number,
        b: number,
        c: number,
        player: TictactoeSpieler,
    ): boolean {
        return Tictactoe.SpielfeldBelegung[a].state == player &&
            Tictactoe.SpielfeldBelegung[b].state == player &&
            Tictactoe.SpielfeldBelegung[c].state == player;
    }
    private static checkSpecificPlayer(player: TictactoeSpieler): boolean {
        let isWinner = false;

        //waagerecht
        for (let i: number = 0; i < 3; i++) {
            let a: number = 0 + 3 * i;
            let b: number = 1 + 3 * i;
            let c: number = 2 + 3 * i;
            if (Tictactoe.checkSpecificPlayerOwnsConfiguration(a, b, c, player)) {
                Tictactoe.changeToGreen(a, b, c);
                isWinner = true;
            }
        }

        //senkrecht
        for (let i: number = 0; i < 3; i++) {
            let a: number = 0 + i;
            let b: number = 3 + i;
            let c: number = 6 + i;
            if (Tictactoe.checkSpecificPlayerOwnsConfiguration(a, b, c, player)) {
                Tictactoe.changeToGreen(a, b, c);
                isWinner = true;
            }
        }

        //diagonal
        if (Tictactoe.checkSpecificPlayerOwnsConfiguration(0, 4, 8, player)) {
            isWinner = true;
            Tictactoe.changeToGreen(0, 4, 8);
        }
        if (Tictactoe.checkSpecificPlayerOwnsConfiguration(2, 4, 6, player)) {
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
