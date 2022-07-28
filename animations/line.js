var kreisG = 40;
var t = 0;
var ax;
var ay;
var r = 0;
var g = 0;
var b = 0;
var w = 1;

function setup() {
	if(windowHeight > windowWidth){
		//handy bildschirm
		createCanvas(1080, 1400);
		background(0);
		
	}else{
		//pc bildschirm
		createCanvas(windowWidth,windowHeight);
		background(0);
	}
	
}

function draw() {
	stroke(r, g, b);
	x = random(width);
	y = random(height);
	line(ax, ay, x, y);
	ax = x;
	ay = y;
	r = noise(t + 10) * 255;
	g = noise(t + 5) * 255;
	b = noise(t + 15) * 255;
	t += 0.015;
}
function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let fs = fullscreen();
    fullscreen(!fs);
	createCanvas(windowWidth, windowHeight);
	background(0);
  }
}