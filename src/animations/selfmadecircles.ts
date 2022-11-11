class Circle {
  private x: number;
  private y: number;
  private size: number;
  private quality: number;
  constructor(inp_x: number, inp_y: number, inp_size: number, inp_quality: number = 5) {
    this.x = inp_x;
    this.y = inp_y;
    this.size = inp_size;
    this.quality = 5 / inp_quality;
  }
  public draw(inp_type: number = 2) {
    let deltaX: number;
    let deltaY: number;
    let x: number;
    let y: number = this.y;
    let r = this.size / 2;
    for (let i = 0; i < this.size; i += this.quality) {
      deltaX = i - this.size / 2;
      x = this.x + deltaX;
      if (inp_type == 1 || inp_type == 2) {
        deltaY = Math.sqrt(r * r - deltaX * deltaX);
        //@ts-expect-error
        point(x, y - deltaY);
      }
      if(inp_type == 0 ||  inp_type == 2){
        deltaY = Math.sqrt(r * r - deltaX * deltaX);
        //@ts-expect-error
        point(x, y + deltaY);
      }
    }
  }
}
class circles {
  private quality: number;
  private circles: Circle[];
  constructor(inp_quality: number = 5) {
    this.quality = inp_quality;
    this.circles = [];
  }
  public render() {
    for (let i = 0; i < this.circles.length; i++) {
      this.circles[i].draw();
    }
  }
  public addCircle(inp_x: number, inp_y: number, inp_size: number): number {
    let id = this.circles.length;
    this.circles[id] = new Circle(inp_x, inp_y, inp_size, this.quality);
    return id;
  }
}
let circles01: circles;
//@ts-ignore
function setup(){
  //@ts-expect-error
  createCanvas(windowWidth, windowHeight);
  //@ts-expect-error
  background(255);
  circles01 = new circles();
  //@ts-expect-error
  let w: number = width;
  //@ts-expect-error
  let h: number = height;
  for(let i = 0; i < 10; i++){
    circles01.addCircle(getRandomInt(0, w), getRandomInt(0, h), getRandomInt(0, 100))
  }
}
//@ts-ignore
function draw(){
  circles01.render();
}