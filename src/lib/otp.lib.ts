class oneTimePad {
  private readonly debug_log: boolean;
  private readonly content: string;
  private readonly key: string;
  private readonly content_bin: string[];
  private key_bin: string[];
  private output_bin: string[];
  private output: string;

  constructor(input: string, key: string, log: boolean = true) {
    this.debug_log = log;

    this.content = input;
    this.key = key;

    this.content_bin = this.toBin(this.content);
    this.key_bin = this.toBin(this.key);

    this.adaptKeyLength();

    this.calc();
    this.output = this.binToText(this.output_bin);

    if (this.debug_log) {
      doLog("oneTimePad: constructor()", "content: " + this.content);
      doLog("oneTimePad: constructor()", "key: " + this.key);
      doLog("oneTimePad: constructor()", "content bin: " + this.content_bin);
      doLog(
        "oneTimePad: constructor()",
        "key bin adapted length: " + this.key_bin,
      );
      doLog("oneTimePad: constructor()", "output bin: " + this.output_bin);
      doLog("oneTimePad: constructor()", "output: " + this.output);
    }
  }
  public getEncryption(): string {
    return this.output;
  }
  private toBin(inp: string): string[] {
    return inp.split("").map(function (v: string): string {
      return v.charCodeAt(0).toString(2);
    });
  }
  private calc(): void {
    this.output_bin = [];
    for (let i = 0; i < this.content_bin.length; i++) {
      this.output_bin[i] = "";
      for (let j = 0; j < this.content_bin[i].length; j++) {
        this.output_bin[i] += String(
          Number(this.content_bin[i].charAt(j) == this.key_bin[i].charAt(j)),
        );
      }
    }
  }
  private adaptKeyLength(): void {
    while (this.content_bin.length > this.key_bin.length) {
      this.key_bin = this.key_bin.concat(this.key_bin);
    }
    if (this.key_bin.length > this.content_bin.length) {
      this.key_bin.length = this.content_bin.length;
    }
  }
  private binToText(inp: string[]): string {
    return inp.map(
      function (str: string): string {
        return String.fromCharCode(parseInt(str, 2));
      },
    ).join("");
  }
}
