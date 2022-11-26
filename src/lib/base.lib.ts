function getRandomInt(min: number = 0, max: number = 100): number {
    if (min >= max) {
        return min;
    }
    return Math.floor(min + Math.random() * (max - min + 1));
}

function getRandomBoolean(): boolean {
    return Boolean(Math.floor(Math.random() * 2));
}

function getRandomArray(n: number, maxValue: number): number[] {
    if (typeof n != "number") {
        n = getRandomInt(2, 100);
    }
    if (typeof maxValue != "number") {
        maxValue = getRandomInt(0, 1000);
    }

    let arr: number[] = [];
    arr[n - 1] = 0;
    arr.fill(0);
    return arr.map(function (): number { return Math.floor(Math.random() * (maxValue + 1)) });
}

function removeCharsFromString(str: string, char: string): string {
    while (str.includes(char)) {
        str = str.replace(char, "");
    }
    return str;
}

function doLog(origin = "unknown origin", content: any = "", throw_error: boolean = false): void {
    let time = new Date();
    let str: string = "[" + time.getMinutes() + ":" + time.getSeconds() + "]" + "[" + origin + "] " + content;
    if (throw_error) {
        throw str;
    }
    console.log(str);
}

function sumTrueBools(args: boolean[]): number {
    return args.filter(v => v).length;
    /*let a = 0;
    for (let i = 0; i < args.length; i++) {
        a = a + Number(args[i]);
    }
    return a;*/
}
function convertTo8bitRange(inp: number): number{
    if(inp <= 0) return 0;
    if(inp >= 255) return 255;
    return Math.round(inp);
}
function activateStrictMode(): void {
    "use strict";
    doLog("base.lib.js", "Strict Mode activated");
}

activateStrictMode();
doLog("base.lib.js", "Lib loaded");