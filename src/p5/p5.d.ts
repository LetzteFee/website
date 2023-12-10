declare const windowWidth: number;
declare const windowHeight: number;
declare const width: number;
declare const height: number;
declare function resizeCanvas(w: number, h: number): void;
declare function createCanvas(n1: number, n2: number): void;
declare function frameRate(fps: number): void;
declare function background(
  r: number,
  g?: number,
  b?: number,
  alpha?: number,
): void;
declare function noStroke(): void;
declare function stroke(n: number, n1?: number, n2?: number, n3?: number): void;
declare function ellipse(x: number, y: number, d: number, d1?: number): void;
declare function noFill(): void;
declare function fill(r: number, b?: number, g?: number, alpha?: number): void;
declare function point(x: number, y: number): void;
declare function random(r1: number, r2?: number, r3?: number): number;
declare function noise(n: number): number;
declare function createInput(value: string, type: string): any;
declare function strokeWeight(n: number): void;
declare function text(t: any, x: number, y: number): void;
declare function line(x1: number, y1: number, x2: number, y2: number): void;
