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
  constructor() { }
  public abstract calc(): number;
  public abstract getNodeInfo(
    depth: number,
    parentId: string,
    position: string,
  ): RenderNode[];
  public abstract getLaTeX(): string;
  public calculateNodesFlatly(): RenderNode[] {
    let n: RenderNode[] = this.getNodeInfo(0, "", "0");
    let depth: number = n[0].depth;
    for (let i = 1; i < n.length; i++) {
      if (n[i].depth > depth) depth = n[i].depth;
    }

    let unit_y: number = height / (depth + 1);

    // Calculating coordinates
    for (let i: number = 0; i <= depth; i++) {
      let elements_with_current_depth: number[] = [];
      for (let j: number = 0; j < n.length; j++) {
        if (n[j].depth === i) {
          elements_with_current_depth.push(j);
        }
      }

      let unit_x: number = width / elements_with_current_depth.length;
      for (let j: number = 0; j < elements_with_current_depth.length; j++) {
        n[elements_with_current_depth[j]].setTarget(unit_x * j + unit_x / 2, unit_y * i + unit_y / 2);
      }
    }
    return n;
  }
}
class CalcValue extends Value {
  constructor(public value: number) {
    super();
  }
  public calc(): number {
    return this.value;
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
        return left ** right;
      case OperatorToken.Modulo:
        return left % right;
      default:
        console.log(this.tokenType);
        throw "Critical Error: Unkown Operator";
    }
  }
  public getNodeInfo(
    depth: number,
    parentId: string,
    position: string,
  ): RenderNode[] {
    let id: string = parentId + position;
    return [new RenderNode(id, depth, parentId, <string>this.tokenType)]
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
  private target_x: number = 0;
  private target_y: number = 0;
  private current_x: number = random(width);
  private current_y: number = random(height);
  constructor(
    public id: string,
    public depth: number,
    public parentId: string,
    private value: string,
  ) { }
  public render(): void {
    text(this.value, this.current_x, this.current_y);
    // text(this.id, this.x, this.y + 20);
    // text(this.depth, this.x, this.y + 40);
  }
  public line(parentX: number, parentY: number): void {
    line(
      this.current_x,
      this.current_y - 15,
      parentX,
      parentY + 15
    );
  }
  public setTarget(x: number, y: number): void {
    this.target_x = x;
    this.target_y = y;
  }
  public getCurrentX(): number {
    return this.current_x;
  }
  public getCurrentY(): number {
    return this.current_y;
  }
  public run(): void {
    this.current_x = (2 * this.current_x + this.target_x) / 3;
    this.current_y = (2 * this.current_y + this.target_y) / 3;
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

  if (tokenStream[0] === OperatorToken.Minus) {
    tokenStream[0] = OperatorToken.Multiply;
    tokenStream.splice(0, 0, new CalcValue(-1));
  }


  // Klammern finden und Inhalt in neuen Node packen
  while (tokenStream.some(e => e === OperatorToken.OpPar)) {
    // Klammer finden und die dazugehörige Klammerzu
    let start: number = -1;
    let stop: number = -1;
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

    if (stop < 1) {
      throw "Wrong Parenthesis";
    }

    let removed_token_stream: TokenStream = tokenStream.splice(
      start,
      stop - start + 1,
    );
    removed_token_stream.pop();
    removed_token_stream.shift();
    let new_node: Value = buildTree(removed_token_stream);
    tokenStream.splice(start, 0, new_node);
  }

  // Potenz Operatoren einbinden
  for (let i: number = 0; i < tokenStream.length; i++) {
    if (tokenStream[i] === OperatorToken.Power) {
      tokenStream.splice(
        i - 1,
        3,
        new CalcNode(
          <OperatorToken>tokenStream[i],
          <Value>tokenStream[i - 1],
          <Value>tokenStream[i + 1],
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
          <OperatorToken>tokenStream[i],
          <Value>tokenStream[i - 1],
          <Value>tokenStream[i + 1],
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
        <OperatorToken>tokenStream[i],
        <Value>tokenStream[i - 1],
        <Value>tokenStream[i + 1],
      );
      tokenStream.splice(i - 1, 3, newNode);
      i--;
    }
  }

  if (tokenStream.length == 0) {
    return new CalcValue(0);
  }

  if (tokenStream.length !== 1) {
    console.warn(tokenStream);
    throw "TokenStream was not summarized to exactly one element";
  }
  return <Value>tokenStream[0];
}
function genTokenStream(inp_string: string): TokenStream {
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
    switch (stream[i]) {
      case OperatorToken.Plus:
        out += " + ";
        break;
      case OperatorToken.Minus:
        out += " - ";
        break;
      case OperatorToken.OpPar:
        out += " \\left(";
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
let flatRenderNodes: RenderNode[] = [];
var setup = function () {
  // @ts-ignore
  createCanvas(800, 600).parent("sketch-holder");
  background(255);
  // @ts-ignore
  textAlign(CENTER);
};
var draw = function (): void {
  background(255);
  for (let i: number = 0; i < flatRenderNodes.length; i++) {
    flatRenderNodes[i].render();
    flatRenderNodes[i].run();
    if (flatRenderNodes[i].parentId === "") continue;
    for (let j = 0; j < flatRenderNodes.length; j++) {
      if (flatRenderNodes[j].id === flatRenderNodes[i].parentId) {
        flatRenderNodes[i].line(
          flatRenderNodes[j].getCurrentX(),
          flatRenderNodes[j].getCurrentY()
        );
        break;
      }
    }
  }
};
/*function run(inp: string) {
  let tokenStream: TokenStream = genTokenStream(inp);
  console.log(tokenStream);

  let root = buildTree(tokenStream);
  console.log(root);

  let result: number = root.calc();
  console.log(result);
}*/
function calculate(): void {
  // @ts-ignore
  let input_string = document.getElementById("input-string").value ?? "0";
  let tokenStream: TokenStream = genTokenStream(input_string);
  let root = buildTree(tokenStream);
  let result: number = root.calc();

  background(255);
  flatRenderNodes = root.calculateNodesFlatly();
  // console.log(tokenStream.length);

  document.getElementById("interpretation-equation").innerHTML = `\\( ${root.getLaTeX()} \\)`;
  document.getElementById("result-equation").innerHTML = /*`\\( ${tokenStreamToLaTeX(genTokenStream(input_string))} = ${*/result.toString()/*} \\)`*/;

  // @ts-ignore
  MathJax.typeset();
}

/*var windowResized = function() {
    resizeCanvas(windowWidth, windowHeight);
    // calculate new target node coordinates
}*/

// Deno test
// run("(55 * 5 + 6(5 / 8)) % 2 ^ 8");
