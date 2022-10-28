let t = 0;
let x;
let y;
let ax;
let ay;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	ax = random(width);
	ay = random(height);
}

function draw() {
	stroke(noise(t) * 256, noise(t + 5) * 256, noise(t + 10) * 256);
	x = random(width);
	y = random(height);

	line(ax, ay, x, y);

	ax = x;
	ay = y;
	t += 0.015;
}
