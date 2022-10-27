function encrypt() {
    let content = inpToBin(document.getElementById("content").value);
    let key = inpToBin(document.getElementById("key").value);
    key = adaptLength(content, key);
    let output = calc(content, key);

    doLog("encrypt", "content in bin: " + content);
    doLog("encrypt", "key in bin: " + key);
    doLog("encrypt", "output in bin: " + output);

    document.getElementById("output").value = BinToText(output);
}
function inpToBin(inp) {
    let output = [];
    for (let i = 0; i < inp.length; i++) {
      output[i] = inp.charCodeAt(i).toString(2);
    }
    return output;
}
function calc(content, key) {
    let output = [];
    for(let h = 0; h < content.length; h++){
        output[h] = "";
    }


    for(let i = 0; i < content.length; i++){
        for(let j = 0; j < content[i].length; j++){
            if(content[i][j] == key[i][j]){
                output[i] = output[i] + "1";
            }else{
                output[i] = output[i] + "0";
            }
        }
    }

    return output;
}
function BinToText(inp) {
    let output = "";
    for (let i = 0; i < inp.length; i++) {
      output = output + String.fromCharCode(parseInt(inp[i], 2));
    }
    return output;
}
function adaptLength(content, keyy){
    let key = keyy;
    if(content.length == key.length){
        return key;
    }
    if(content.length > key.length){
        while(content.length > key.length){
            key = key.concat(key);
        }
        key.length = content.length;
        return key;
    }
    if(content.length < key.length){
        key.length = content.length;
        return key;
    }
    console.log("FATAL ERROR in adaptLength; reached bottom function");
    return false;
}
function doLog(origin, content){
    console.log("[" + origin + "] " + content);
}