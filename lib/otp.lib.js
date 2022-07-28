class oneTimePad{
    constructor(content, key){
        this.debug_log = true;

        this.content = content;
        this.key = key;

        this.content_bin = this.toBin(this.content);
        this.key_bin = this.toBin(this.key);

        this.key_bin_length = this.adaptKeyLength();
        this.output_bin = this.calc();
        this.output = this.binToText(this.output_bin);

        if(this.debug_log){
            doLog("oneTimePad: constructor()", "content: " + this.content);
            doLog("oneTimePad: constructor()", "key: " + this.key);
            doLog("oneTimePad: constructor()", "content bin: " + this.content_bin);
            doLog("oneTimePad: constructor()", "key bin: " + this.key_bin);
            doLog("oneTimePad: constructor()", "key bin adapted length: " + this.key_bin_length);
            doLog("oneTimePad: constructor()", "output bin: " + this.output_bin);
            doLog("oneTimePad: constructor()", "output: " + this.output);
        }
    }
    getEncryption(){
        return this.output;
    }
    toBin(inp){
        let output = [];
        for (let i = 0; i < inp.length; i++) {
            output[i] = inp.charCodeAt(i).toString(2);
        }
        return output;
    }
    calc(){
        let output = [];
    for(let h = 0; h < this.content_bin.length; h++){
        output[h] = "";
    }


    for(let i = 0; i < this.content_bin.length; i++){
        for(let j = 0; j < this.content_bin[i].length; j++){
            if(this.content_bin[i][j] == this.key_bin_length[i][j]){
                output[i] = output[i] + "1";
            }else{
                output[i] = output[i] + "0";
            }
        }
    }

    return output;
    }
    adaptKeyLength(){
        let newKey = this.key_bin;

        if(this.content_bin.length == newKey.length){
            return newKey;
        }
        if(this.content_bin.length > newKey.length){
            while(this.content_bin.length > newKey.length){
                newKey = newKey.concat(this.key_bin);
            }
            newKey.length = this.content_bin.length;
            return newKey;
        }
        if(this.content_bin.length < key.length){
            newKey.length = this.content_bin.length;
            return newKey;
        }
        doLog("otp.lib.js: oneTimePad: adaptKeyLength()", "FATAL ERROR! Reached bottom function");
        return null;
    }
    binToText(inp){
        let output = "";
    for (let i = 0; i < inp.length; i++) {
      output = output + String.fromCharCode(parseInt(inp[i], 2));
    }
    return output;
    }
}