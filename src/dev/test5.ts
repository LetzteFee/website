const Draw = function(): void {
    canvas.background(0);
    canvas.stroke(canvas.getFrameCount() % 256, 0, 0);
    canvas.rect(
        canvas.getFrameCount() % canvas.getWidth(),
        (canvas.getHeight() + canvas.getHeight() * Math.sin(canvas.getFrameCount() * 0.05)) * 0.5,
        50,
        50
    );
    canvas.stroke(255);
    canvas.selfmadeCircle(canvas.getWidth() / 2, canvas.getHeight() / 2, 100);
};
let canvas = new Canvas();
canvas.fps(60);
canvas.draw();