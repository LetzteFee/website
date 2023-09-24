let t = 0;
let x: number;
let y: number;
let ax: number;
let ay: number;
function tsNoise(inp: number): number {
  // @ts-expect-error
  return noise(inp);
}
function tsStroke(
  r: number,
  g: null | number = null,
  b: null | number = null
): void {
  if (g == null) g = r;
  if (b == null) b = r;
  // @ts-ignore
  stroke(r, g, b);
}
//@ts-ignore
var setup = () => {
  // @ts-ignore
  createCanvas(windowWidth, windowHeight);
  // @ts-ignore
  background(0);
  // @ts-ignore
  ax = getRandomInt(width);
  ay = random(height);
}
//@ts-ignore
function draw() {
  tsStroke(tsNoise(t) * 256, tsNoise(t + 5) * 256, tsNoise(t + 10) * 256);
  x = random(width);
  y = random(height);
  line(ax, ay, x, y);

  ax = x;
  ay = y;
  t += 0.015;
}
