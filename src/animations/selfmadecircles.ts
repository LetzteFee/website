interface Color {
  r: number;
  g: number;
  b: number;
}
class Circle {
  public x: number;
  public y: number;
  public size: number;
  private readonly quality: number;
  private color: Color;
  constructor(
    inp_x: number,
    inp_y: number,
    inp_size: number,
    inp_quality: number = 5,
    inp_color: Color = { r: 0, g: 0, b: 0 }
  ) {
    this.x = inp_x;
    this.y = inp_y;
    this.size = inp_size;
    this.quality = 5 / inp_quality;
    this.color = inp_color;
  }
  public draw(inp_type: number = 2): void {
    stroke(this.color.r, this.color.g, this.color.b);

    let deltaX: number;
    let deltaY: number;
    let x: number;
    let y: number = this.y;
    let r = this.size / 2;
    //horizontal rendering
    for (let i: number = 0; i < this.size; i += this.quality) {
      deltaX = i - this.size / 2;
      x = this.x + deltaX;
      if (inp_type == 1 || inp_type == 2) {
        deltaY = Math.sqrt(r * r - deltaX * deltaX);
        //@ts-ignore
        point(x, y - deltaY);
      }
      if (inp_type == 0 || inp_type == 2) {
        deltaY = Math.sqrt(r * r - deltaX * deltaX);
        //@ts-ignore
        point(x, y + deltaY);
      }
    }

    x = this.x;
    //vertical rendering
    for (let i: number = 0; i < this.size; i++) {
      deltaY = i - this.size / 2;
      y = this.y + deltaY;
      if (inp_type == 1 || inp_type == 2) {
        deltaX = Math.sqrt(r * r - deltaY * deltaY);
        //@ts-ignore
        point(x - deltaX, y);
      }
      if (inp_type == 0 || inp_type == 2) {
        deltaX = Math.sqrt(r * r - deltaY * deltaY);
        //@ts-ignore
        point(x + deltaX, y);
      }
    }
  }
}

let circles01: Circle[] = [];
//@ts-ignore
function setup(): void {
  //@ts-ignore
  createCanvas(windowWidth, windowHeight);
  //@ts-ignore
  background(0);
  fps(5);

  //@ts-ignore
  let w: number = width;
  //@ts-ignore
  let h: number = height;
  for (let i = 0; i < 20; i++) {
    let color: Color = {
      r: getRandomInt(0, 255),
      g: getRandomInt(0, 255),
      b: getRandomInt(0, 255)
    };
    circles01[i] = new Circle(
      getRandomInt(0, w),
      getRandomInt(0, h),
      getRandomInt(0, 100),
      5,
      color
    );
  }
}
//@ts-ignore
function draw(): void {
  for (let i = 0; i < circles01.length; i++) {
    circles01[i].draw();
    circles01[i].size += getRandomInt(-10, 10);
  }
}
initCanvasLib();
