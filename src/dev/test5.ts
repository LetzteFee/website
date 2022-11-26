const Draw = () => {
    canvas.background(0);
    canvas.stroke(getRandomInt(0, 256), getRandomInt(0, 256), getRandomInt(0, 256));
    canvas.stroke(255);
    canvas.rect(canvas.getFrameCount() % canvas.getWidth(), 10, 50, 50);
    canvas.rect();
    canvas.increaseFrameCount();
    //doLog("Draw()", `FrameCount: ${canvas.getFrameCount()}`)
};
let canvas = new Canvas();
canvas.draw();
console.log(sumTrueBools([true, false, true, false, true, true]));