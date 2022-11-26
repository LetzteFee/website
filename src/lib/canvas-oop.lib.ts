/*
Structure:
Canvas Objekt wird erstellt: Variablen verfügbar
Object01.createCanvas / setup: Zeichenfläche wird erstellt
Object01.draw: Funktion wird übergeben, die dann Intervallmäßig ausgeführt wird.

Dependencies: base.lib.ts
*/
class Canvas {
    private FPS: number;
    private id: any;
    private drawObject: any;
    private readonly windowWidth: number;
    private readonly windowHeight: number;
    private width: number;
    private height: number;
    private frameCount: number;
    constructor() {
        this.id = null;
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.fps(24);
    }
    public fps(inp_fps: number): void {
        this.FPS = 1000 / inp_fps;
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
        this.height = inp_width;
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
    public draw(): void {
        if (this.id == null) this.createCanvas();
        this.frameCount = 0;
        setInterval(function (): void {
            Draw();

        }, this.FPS);
    }
    public getFrameCount(): number {
        if (typeof this.frameCount != "number") throw "Fatal Error: framecount not defined yet";
        return this.frameCount;
    }
    public increaseFrameCount(): void {
        this.frameCount++;
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
}