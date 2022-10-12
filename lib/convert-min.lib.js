function convertToMin(content, output_DOM_id){
    let res = content;
    res = res.replace(/ /g, "");
    console.log(res);
    document.getElementById(output_DOM_id).value = res;
}