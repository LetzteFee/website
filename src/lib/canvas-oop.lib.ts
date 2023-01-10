/*
Structure:
Canvas Objekt wird erstellt: Variablen verfügbar
Object01.createCanvas / setup: Zeichenfläche wird erstellt
Object01.draw: Funktion wird übergeben, die dann Intervallmäßig ausgeführt wird.

Dependencies: base.lib.ts
*/
class Canvas {
    private frameTime: number;
    private id: any;
    private drawObject: any;
    private readonly windowWidth: number;
    private readonly windowHeight: number;
    private width: number;
    private height: number;
    static frameCount: number = 0;
    constructor() {
        this.id = null;
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.fps(24);
    }
    public fps(inp_fps: number): void {
        this.frameTime = 1000 / inp_fps;
    }
    public createCanvas(
        inp_width: number = this.windowWidth,
        inp_height: number = this.windowHeight
    ): void {
        this.id = document.createElement("canvas");
        document.body.appendChild(this.id);
        this.id.width = inp_width;
        this.id.height = inp_height;
        this.id.style.width = `${inp_width}px`;
        this.id.style.height = `${inp_height}px`;
        this.drawObject = this.id.getContext("2d");
        this.width = inp_width;
        this.height = inp_height;
    }
    public getWidth(): number {
        if (typeof this.width != "number") {
            doLog("canvas class getWidth()", "Width is not defined yet. You have to run createCanvas first", true);
        }
        return this.width;
    }
    public getHeight(): number {
        if (typeof this.height != "number") {
            doLog("canvas class getHeight()", "Height is not defined yet. You have to run createCanvas first", true);
        }
        return this.height;
    }
    public getWindowWidth(): number {
        return this.windowWidth;
    }
    public getWindowHeight(): number {
        return this.windowHeight;
    }
    public draw(): void {
        if (this.id == null) this.createCanvas();
        setInterval(function (): void {
            Draw();
            Canvas.frameCount++;

        }, this.frameTime);
    }
    public getFrameCount(): number {
        if (typeof Canvas.frameCount != "number") throw "Error: framecount not defined yet";
        return Canvas.frameCount;
    }
    public getAnimator(max: number = 1, perioden_laenge_frames: number = 240): number {
        return Math.round((Math.sin(
            this.getFrameCount() / perioden_laenge_frames * 2 * Math.PI
        ) * 0.5 + 0.5) * max);
    }
    public stroke(
        r: number,
        g: number = r,
        b: number = g
    ): void {
        r = convertTo8bitRange(r);
        g = convertTo8bitRange(g);
        b = convertTo8bitRange(b);

        this.drawObject.fillStyle = `rgb(${r}, ${g}, ${b})`;
    }
    public background(r: number, g: number = r, b: number = g) {
        this.stroke(r, g, b);
        this.drawObject.fillRect(0, 0, this.width, this.height);
    }
    public point(x: number, y: number): void {
        this.drawObject.fillRect(x, y, 1, 1);
    }
    public rect(
        inp_x: number = (this.getWidth() > this.getHeight() ? this.getHeight() : this.getWidth()) * 0.5,
        inp_y: number = inp_x,
        width: number = (this.getWidth() > this.getHeight() ? this.getHeight() : this.getWidth()) * 0.1,
        height: number = width
    ): void {
        this.drawObject.fillRect(inp_x, inp_y, width, height);
    }
    public selfmadeCircle(inp_x: number, inp_y: number, d: number): void {
        let r: number = d * 0.5;
        for (let i: number = inp_x - r; i < inp_x + r; i++) {
            let dx: number = inp_x - i;
            let y: number = Math.sqrt(r * r - dx * dx);
            this.point(i, inp_y + y);
            this.point(i, inp_y - y);
        }
        for (let i: number = inp_y - r; i < inp_y + r; i++) {
            let dy: number = inp_y - i;
            let x: number = Math.sqrt(r * r - dy * dy);
            this.point(inp_x + x, i);
            this.point(inp_x - x, i);
        }
    }
}
