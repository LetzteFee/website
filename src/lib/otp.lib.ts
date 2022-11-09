class oneTimePad {
    private readonly debug_log: boolean;
    private readonly content: string;
    private readonly key: string;
    private readonly content_bin: string[];
    private key_bin: string[];
    private output_bin: string[];
    private output: string;

    public constructor(input: string, key: string, log: boolean = true) {
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
            doLog("oneTimePad: constructor()", "key bin adapted length: " + this.key_bin);
            doLog("oneTimePad: constructor()", "output bin: " + this.output_bin);
            doLog("oneTimePad: constructor()", "output: " + this.output);
        }
    }
    public getEncryption(): string {
        return this.output;
    }
    private toBin(inp: string): string[] {
        let output: string[] = [];
        for (let i = 0; i < inp.length; i++) {
            output[i] = inp.charCodeAt(i).toString(2);
        }
        return output;
    }
    private calc(): void {
        let output: string[] = [];

        for (let i = 0; i < this.content_bin.length; i++) {
            output[i] = "";
            for (let j = 0; j < this.content_bin[i].length; j++) {
                if (this.content_bin[i].charAt(j) == this.key_bin[i].charAt(j)) {
                    output[i] = output[i] + "1";
                } else {
                    output[i] = output[i] + "0";
                }
            }
        }

        this.output_bin = output;
    }
    private adaptKeyLength(): void {
        while (this.content_bin.length > this.key_bin.length) {
            this.key_bin = this.key_bin.concat(this.key_bin);
        }
        if (this.key_bin.length > this.content_bin.length) {
            this.key_bin.length = this.content_bin.length;
        }
    }
    private binToText(inp: string[]) {
        let output: string = "";
        for (let i = 0; i < inp.length; i++) {
            output = output + String.fromCharCode(parseInt(inp[i], 2));
        }
        return output;
    }
}
