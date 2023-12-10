let t = 0;
let x: number;
let y: number;
let ax: number;
let ay: number;

var setup = () => {
  createCanvas(windowWidth, windowHeight);
  background(0);
  ax = getRandomInt(width);
  ay = random(height);
};

var draw = function () {
  stroke(noise(t) * 256, noise(t + 5) * 256, noise(t + 10) * 256);
  x = random(width);
  y = random(height);
  line(ax, ay, x, y);

  ax = x;
  ay = y;
  t += 0.015;
};
