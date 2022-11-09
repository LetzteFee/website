function get_link(path_prefix: string = ''): string {
    let possible_Sites_Animations: string[] = ["fall.html", "hexagon.html", "line.html", "matrix.html", "matrix_light.html", "selfmadecircles.html"];
    let possible_Sites_Games: string[] = ["duet.html", "tictactoe.html"];
    let possible_Sites_Tools: string[] = ["index.html", "otp.html", "pwd-gen.html", "sorting.html"];

    possible_Sites_Animations = possible_Sites_Animations.map(function (v: string): string { return "animations/" + v });
    possible_Sites_Games = possible_Sites_Games.map(function (v: string): string { return "games/" + v });
    possible_Sites_Tools = possible_Sites_Tools.map(function (v: string): string { return "tools/" + v });
    let possible_Sites: string[] = possible_Sites_Animations.concat(possible_Sites_Games, possible_Sites_Tools);

    return path_prefix + possible_Sites[getRandomInt(0, possible_Sites.length - 1)];
}

function modify_a(path_prefix: string): void {
    // @ts-expect-error
    document.getElementById("link_random").href = get_link(path_prefix);
}

function go_to_random_link(path_prefix: string): void {
    window.location.href = get_link(path_prefix);
}