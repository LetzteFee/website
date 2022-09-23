function getRandomInt(min, max){
    if(min == max){
        return min;
    }
    return Math.floor(min + Math.random() * (max - min + 1));
}

function getRandomBoolean(){
    return Boolean(Math.floor(Math.random() * 2));
}

function doLog(origin, content, throw_error=false){
    let time = new Date();
    let str = "[" + time.getMinutes() + ":" + time.getSeconds() + "]" + "[" + origin + "] " + content;
    if(throw_error){
        throw str;
    }
    console.log(str);
}

function sumTrueBools(args){
    let a = 0;
    for(let i = 0; i < args.length;i++){
        a = a + Number(args[i]);
    }
    return a;
}
function activateStrictMode(){
    "use strict";
    doLog("base.lib.js", "Strict Mode activated");
}

activateStrictMode();
doLog("base.lib.js", "Lib loaded");
