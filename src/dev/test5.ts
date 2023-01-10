const Draw = function (): void {
    canvas.background(0);
    canvas.stroke(
        canvas.getAnimator(255, 120),
        canvas.getAnimator(255, 180),
        canvas.getAnimator(255, 300)
    );
    canvas.rect(
        canvas.getAnimator(canvas.getWidth() - 50),
        canvas.getAnimator(canvas.getHeight() - 50, 360),
        50,
        50
    );
};
let canvas = new Canvas();
console.log({ with: canvas.getWindowWidth(), height: canvas.getWindowHeight() });
canvas.fps(60);
canvas.draw();
