async function getNeko() {
  //const categories = ["husbando", "kitsune", "waifu", "neko", "baka", "bite", "blush", "bored", "cry", "cuddle", "dance", "facepalm", "feed", "handhold", "happy", "highfive", "hug", "kick", "kiss", "laugh", "pat", "poke", "pout", "punch", "shoot", "shrug", "slap", "sleep", "smile", "smug", "stare", "think", "thumbsup", "tickle", "wave", "wink", "yeet"];
  const response = await fetch(
    "https://nekos.best/api/v2/neko" /* + categories[getRandomInt(0, categories.length - 1)]*/
  );
  const json = await response.json();

  document.getElementById("img01").src = json.results[0].url;
  document.getElementById("img01_link").href = json.results[0].source_url;
  document.getElementById("artist_link").innerHTML =
    json.results[0].artist_name;
  document.getElementById("artist_link").href = json.results[0].artist_href;
}

getNeko();
console.log("finsihed init");
