type TokenStream = (OperatorToken | Value)[];
enum OperatorToken {
  Plus = "Plus",
  Minus = "Minus",
  Multiply = "Multiply",
  Divide = "Divide",
  Power = "Power",
  Modulo = "Modulo",
  OpPar = "OpenParenthesis",
  ClPar = "ClosedParenthesis",
}
abstract class Value {
  constructor() {}
  public abstract calc(): number;
  public abstract renderNodesRecursively(
    x: number,
    y: number,
    scale: number,
  ): void;
  public abstract getNodeInfo(
    depth: number,
    parentId: string,
    position: string,
  ): RenderNode[];
  public abstract getLaTeX(): string;
  public renderNodesFlatly(): void {
    let n = this.getNodeInfo(0, "", "0");
    let depth: number = n[0].depth;
    for (let i = 1; i < n.length; i++) {
      if (n[i].depth > depth) depth = n[i].depth;
    }

    let unit_y: number = height / (depth + 1);

    // Calculating coordinates
    for (let i = 0; i <= depth; i++) {
      let elements_with_current_depth: number[] = [];
      for (let j = 0; j < n.length; j++) {
        if (n[j].depth === i) {
          elements_with_current_depth.push(j);
        }
      }

      let unit_x: number = width / elements_with_current_depth.length;
      for (let j = 0; j < elements_with_current_depth.length; j++) {
        n[elements_with_current_depth[j]].x = unit_x * j + unit_x / 2;
        n[elements_with_current_depth[j]].y = unit_y * i + unit_y / 2;
      }
    }

    // Rendering
    for (let i = 0; i < n.length; i++) {
      n[i].render();
      if (n[i].parentId === "") continue;
      for (let j = 0; j < n.length; j++) {
        if (n[j].id === n[i].parentId) {
          line(n[i].x, n[i].y - 15, n[j].x, n[j].y + 15);
          break;
        }
      }
    }
  }
}
class CalcValue extends Value {
  constructor(public value: number) {
    super();
  }
  public calc(): number {
    return this.value;
  }
  public renderNodesRecursively(x: number, y: number): void {
    text(this.value, x, y);
  }
  public getNodeInfo(
    depth: number,
    parentId: string,
    position: string,
  ): RenderNode[] {
    return [
      new RenderNode(
        parentId + position,
        depth,
        parentId,
        this.value.toString(),
      ),
    ];
  }
  public getLaTeX(): string {
    return String(this.value);
  }
}
class CalcNode extends Value {
  constructor(
    public tokenType: OperatorToken,
    public left: Value,
    public right: Value,
  ) {
    super();
  }
  public calc(): number {
    let left: number = this.left.calc();
    let right: number = this.right.calc();

    switch (this.tokenType) {
      case OperatorToken.Plus:
        return left + right;
      case OperatorToken.Minus:
        return left - right;
      case OperatorToken.Multiply:
        return left * right;
      case OperatorToken.Divide:
        return left / right;
      case OperatorToken.Power:
        return left ^ right;
      case OperatorToken.Modulo:
        return left % right;
      default:
        console.log(this.tokenType);
        throw "Critical Error: Unkown Operator";
    }
  }
  public renderNodesRecursively(x: number, y: number, scale: number) {
    scale /= 2;
    let lx: number = x - width / 4 * scale;
    let rx: number = x + width / 4 * scale;
    let ny: number = y + 100;

    line(x, y + 10, lx, ny - 20);
    this.left.renderNodesRecursively(lx, ny, scale);

    line(x, y + 10, rx, ny - 20);
    this.right.renderNodesRecursively(rx, ny, scale);

    text(<string> this.tokenType, x, y);
  }
  public getNodeInfo(
    depth: number,
    parentId: string,
    position: string,
  ): RenderNode[] {
    let id: string = parentId + position;
    return [new RenderNode(id, depth, parentId, <string> this.tokenType)]
      .concat(this.left.getNodeInfo(depth + 1, id, "l"))
      .concat(this.right.getNodeInfo(depth + 1, id, "r"));
  }
  public getLaTeX(): string {
    return OperatorToLaTeX(
      this.tokenType,
      this.left.getLaTeX(),
      this.right.getLaTeX(),
    );
  }
}
class RenderNode {
  public x: number;
  public y: number;
  constructor(
    public id: string,
    public depth: number,
    public parentId: string,
    private value: string,
  ) {
    this.x = width / 2;
    this.y = height / 2;
  }
  public render(): void {
    text(this.value, this.x, this.y);
    // text(this.id, this.x, this.y + 20);
    // text(this.depth, this.x, this.y + 40);
  }
}
function addPars(inp: string): string {
  return "\\left( " + inp + " \\right)";
}
function OperatorToLaTeX(
  op: OperatorToken,
  left: string,
  right: string,
): string {
  switch (op) {
    case OperatorToken.Plus:
      return addPars(left + " + " + right);
    case OperatorToken.Minus:
      return addPars(left + " - " + right);
    case OperatorToken.Multiply:
      return addPars(left + " \\cdot " + right);
    case OperatorToken.Divide:
      return "\\frac{" + left + "}{" + right + "}";
    case OperatorToken.Power:
      return addPars(left) + "^{" + right + "}";
    case OperatorToken.Modulo:
      return addPars(left + " \\bmod " + right);
    default:
      return "";
  }
}
function buildTree(tokenStream: TokenStream): Value {
  // Klammern finden und Inhalt in neuen Node packen
  while (tokenStream.some(e => e === OperatorToken.OpPar)) {
    // Klammer finden und die dazugehörige Klammerzu
    let start: number = -1;
    let stop: number = 0;
    let count: number = 0;
    for (let i: number = 0; i < tokenStream.length; i++) {
      if (tokenStream[i] === OperatorToken.OpPar) {
        count++;
        if (start == -1) {
          start = i;
        }
      } else if (tokenStream[i] === OperatorToken.ClPar) {
        count--;
        if (count < 1) {
          stop = i;
          break;
        }
      }
    }
    let removed_token_stream: TokenStream = tokenStream.splice(
      start,
      stop - start + 1,
    );
    removed_token_stream.pop();
    removed_token_stream.shift();
    tokenStream.splice(start, 0, buildTree(removed_token_stream));
  }

  // Potenz Operatoren einbinden
  for (let i: number = 0; i < tokenStream.length; i++) {
    if (tokenStream[i] === OperatorToken.Power) {
      tokenStream.splice(
        i - 1,
        3,
        new CalcNode(
          <OperatorToken> tokenStream[i],
          <Value> tokenStream[i - 1],
          <Value> tokenStream[i + 1],
        ),
      );
      i--;
    }
  }

  // Punkt Operationen in neuen Node zusammenfassen
  for (let i: number = 0; i < tokenStream.length; i++) {
    if (
      tokenStream[i] === OperatorToken.Multiply ||
      tokenStream[i] === OperatorToken.Divide ||
      tokenStream[i] === OperatorToken.Modulo
    ) {
      tokenStream.splice(
        i - 1,
        3,
        new CalcNode(
          <OperatorToken> tokenStream[i],
          <Value> tokenStream[i - 1],
          <Value> tokenStream[i + 1],
        ),
      );
      i--;
    }
  }

  // Strich Operatoren in neuen Node zusammenfassen
  for (let i: number = 0; i < tokenStream.length; i++) {
    if (
      tokenStream[i] === OperatorToken.Plus ||
      tokenStream[i] === OperatorToken.Minus
    ) {
      let newNode = new CalcNode(
        <OperatorToken> tokenStream[i],
        <Value> tokenStream[i - 1],
        <Value> tokenStream[i + 1],
      );
      tokenStream.splice(i - 1, 3, newNode);
      i--;
    }
  }

  if (tokenStream.length !== 1) {
    throw "TokenStream was not summarized to exactly one element";
  }
  return <Value> tokenStream[0];
}
function genTokenStream(inp_string: string) {
  let tokenStream: TokenStream = [];
  let inp: string[] = inp_string.split("");
  let tmp_value_string = "";
  for (let i = 0; i < inp.length; i++) {
    if (
      inp[i] === "0" ||
      inp[i] === "1" ||
      inp[i] === "2" ||
      inp[i] === "3" ||
      inp[i] === "4" ||
      inp[i] === "5" ||
      inp[i] === "6" ||
      inp[i] === "7" ||
      inp[i] === "8" ||
      inp[i] === "9" ||
      inp[i] === "."
    ) {
      tmp_value_string += inp[i];
      continue;
    }

    if (inp[i] === "+") {
      if (tmp_value_string != "") {
        tokenStream.push(new CalcValue(Number(tmp_value_string)));
        tmp_value_string = "";
      }
      tokenStream.push(OperatorToken.Plus);
    } else if (inp[i] === "-") {
      if (tmp_value_string != "") {
        tokenStream.push(new CalcValue(Number(tmp_value_string)));
        tmp_value_string = "";
      }
      tokenStream.push(OperatorToken.Minus);
    } else if (inp[i] === "*") {
      if (tmp_value_string != "") {
        tokenStream.push(new CalcValue(Number(tmp_value_string)));
        tmp_value_string = "";
      }
      tokenStream.push(OperatorToken.Multiply);
    } else if (inp[i] === "/") {
      if (tmp_value_string != "") {
        tokenStream.push(new CalcValue(Number(tmp_value_string)));
        tmp_value_string = "";
      }
      tokenStream.push(OperatorToken.Divide);
    } else if (inp[i] === "%") {
      if (tmp_value_string != "") {
        tokenStream.push(new CalcValue(Number(tmp_value_string)));
        tmp_value_string = "";
      }
      tokenStream.push(OperatorToken.Modulo);
    } else if (inp[i] === "^") {
      if (tmp_value_string != "") {
        tokenStream.push(new CalcValue(Number(tmp_value_string)));
        tmp_value_string = "";
      }
      tokenStream.push(OperatorToken.Power);
    } else if (inp[i] === "(") {
      if (tmp_value_string != "") {
        tokenStream.push(new CalcValue(Number(tmp_value_string)));
        tokenStream.push(OperatorToken.Multiply);
        tmp_value_string = "";
      }
      tokenStream.push(OperatorToken.OpPar);
    } else if (inp[i] === ")") {
      if (tmp_value_string != "") {
        tokenStream.push(new CalcValue(Number(tmp_value_string)));
        tmp_value_string = "";
      }
      tokenStream.push(OperatorToken.ClPar);
    }
  }
  if (tmp_value_string != "") {
    tokenStream.push(new CalcValue(Number(tmp_value_string)));
  }
  return tokenStream;
}
function tokenStreamToLaTeX(stream: TokenStream): string {
  let out: string = "";
  for (let i: number = 0; i < stream.length; i++) {
    switch(stream[i]) {
      case OperatorToken.Plus:
        out += " + ";
        break;
      case OperatorToken.Minus:
        out += " - ";
        break;
      case OperatorToken.OpPar:
        out += " \\left(" ;
        break;
      case OperatorToken.ClPar:
        out += " \\right)";
        break;
      case OperatorToken.Divide:
        out += " \\div ";
        break;
      case OperatorToken.Modulo:
        out += " \\bmod ";
        break;
      case OperatorToken.Multiply:
        out += " \\cdot ";
        break;
      case OperatorToken.Power:
        out += "^";
        break;
      default:
        out += (<Value>stream[i]).getLaTeX();
    }
  }
  return out;
}
var setup = function () {
  // @ts-ignore
  createCanvas(800, 600).parent("sketch-holder");
  background(255);
  // @ts-ignore
  textAlign(CENTER);
};
function run(inp: string) {
  let tokenStream: TokenStream = genTokenStream(inp);
  console.log(tokenStream);

  let root = buildTree(tokenStream);
  console.log(root);

  let result: number = root.calc();
  console.log(result);
}
function calculate(): void {
  // @ts-ignore
  let input_string = document.getElementById("input-string").value ?? "0";
  let tokenStream: TokenStream = genTokenStream(input_string);
  let root = buildTree(tokenStream);
  let result: number = root.calc();

  background(255);
  root.renderNodesFlatly();
  console.log(tokenStream.length);

  document.getElementById("interpretation-equation").innerHTML = `\\( ${root.getLaTeX()} \\)`;
  document.getElementById("result-equation").innerHTML = `\\( ${tokenStreamToLaTeX(genTokenStream(input_string))} = ${result.toString()} \\)`;

  // @ts-ignore
  MathJax.typeset();
}
// Deno test
// run("(55 * 5 + 6(5 / 8)) % 2 ^ 8");
