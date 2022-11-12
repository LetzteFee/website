function stroke(r: number, g: number = -1, b: number = -1): void {
    if (g < 0) { g = r }
    if (b < 0) { b = r }

    //@ts-ignore
    drawObject.fillStyle = `rgb(${r}, ${g}, ${b})`;
}
function point(x: number, y: number): void {
    //@ts-ignore
    drawObject.fillRect(x, y, 1, 1);
}
//@ts-ignore
function createCanvas(inp_width: number, inp_height: number): void {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.width = inp_width;
    canvas.height = inp_height;
    canvas.style.width = inp_width + "px";
    canvas.style.height = inp_height + "px";

    drawObject = canvas.getContext("2d");

    width = inp_width;
    height = inp_height;
}
function background(inp_color: number) {
    stroke(inp_color);
    drawObject.fillRect(0, 0, width, height);
}
function fps(inp: number): void{
    FPS = inp;
}
function initCanvasLib() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    doLog(undefined, windowWidth);
    doLog(undefined, windowHeight);
    setup();
    setInterval(draw, 1000 / FPS);
}
let drawObject: any;
let width: number;
let height: number;
let windowWidth: number;
let windowHeight: number;
let FPS = 60;