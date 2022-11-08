var possible_Sites_Animations = ["fall.html", "hexagon.html", "line.html", "matrix.html", "matrix_light.html", "selfmadecircles.html"];
var possible_Sites_Games = ["duet.html", "tictactoe.html"];
var possible_Sites_Tools = ["index.html"];

function get_link(path_prefix){
    let possible_Sites = [];
    for(let i = 0; i < possible_Sites_Animations.length; i++){
        possible_Sites[possible_Sites.length] = path_prefix + "animations/" + possible_Sites_Animations[i];
    }
    for(let i = 0; i < possible_Sites_Games.length; i++){
        possible_Sites[possible_Sites.length] = path_prefix + "games/" + possible_Sites_Games[i];
    }
    for(let i = 0; i < possible_Sites_Tools.length; i++){
        possible_Sites[possible_Sites.length] = path_prefix + "tools/" + possible_Sites_Tools[i];
    }

    doLog("randomSite.js", possible_Sites);

    let choosen_Site = possible_Sites[getRandomInt(0, possible_Sites.length - 1)];
    doLog("randomSite.js", choosen_Site + " was seletcted.")

    return choosen_Site;
}

function modify_a(path_prefix){
    document.getElementById("link_random").href = get_link(path_prefix);
}

function go_to_random_link(path_prefix){
    window.location.href = get_link(path_prefix);
}