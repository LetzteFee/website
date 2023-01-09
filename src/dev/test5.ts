const Draw = function(): void {
    canvas.background(0);
    function animator(max: number = 1, acc: number = 0.05): number {
	return Math.round((Math.sin(canvas.getFrameCount() * acc) * 0.5 + 0.5) * max);
    }
    canvas.stroke(animator(255), 0, 0);
    canvas.rect(
        animator(canvas.getWidth()- 50),
        animator(canvas.getHeight() - 50, 0.02),
        50,
        50
    );
    console.log(animator());
    //canvas.stroke(255);
    //canvas.selfmadeCircle(canvas.getWidth() / 2, canvas.getHeight() / 2, 100);
};
let canvas = new Canvas();
console.log({with: canvas.getWindowWidth(), height: canvas.getWindowHeight()});
canvas.fps(60);
canvas.draw();
