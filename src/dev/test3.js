var n = 100;
var speed = 1.5;

var object = [];
var playerXPos;
var playerYPos;
var playerXSize = 30;
var playerYSize = 10;
var playerHealth = 100;
var playerScore = 0;
var playerSpeed = 1;

var debugScreen = false;
var backgroundCooldown = 0;

function drawBackground() {
  noFill();
  stroke("#ff0000");
  strokeWeight(10);

  background(0);
  if (backgroundCooldown > 0) {
    rect(10, 10, width - 20, height - 20);
    backgroundCooldown--;
  }
}

function checkCollision() {
  for (let i = 0; i < object.length; i++) {
    if (object[i].yPos + object[i].ySize > height - height / 20) {
      //oben links ecke
      if (
        playerXPos >= object[i].xPos &&
        playerXPos <= object[i].xPos + object[i].xSize &&
        playerYPos > object[i].yPos &&
        playerYPos < object[i].yPos + object[i].ySize
      ) {
        doDamage();
        reDefine(i);
      }

      //oben rechts ecke
      if (
        playerXPos + playerXSize >= object[i].xPos &&
        playerXPos + playerXSize <= object[i].xPos + object[i].xSize &&
        playerYPos > object[i].yPos &&
        playerYPos < object[i].yPos + object[i].ySize
      ) {
        doDamage();
        reDefine(i);
      }

      //unten links ecke
      if (
        playerXPos >= object[i].xPos &&
        playerXPos <= object[i].xPos + object[i].xSize &&
        playerYPos + playerYSize > object[i].yPos &&
        playerYPos + playerYSize < object[i].yPos + object[i].ySize
      ) {
        doDamage();
        reDefine(i);
      }

      //unten rechts ecke
      if (
        playerXPos + playerXSize >= object[i].xPos &&
        playerXPos + playerXSize <= object[i].xPos + object[i].xSize &&
        playerYPos + playerYSize > object[i].yPos &&
        playerYPos + playerYSize < object[i].yPos + object[i].ySize
      ) {
        doDamage();
        reDefine(i);
      }
    }
  }
}

function drawGame() {
  fill("#ffffff");
  noStroke();

  for (let i = 0; i < object.length; i++) {
    rect(object[i].xPos, object[i].yPos, object[i].xSize, object[i].ySize);
  }
}

function moveObjects() {
  //vertical movement
  for (let i = 0; i < object.length; i++) {
    if (object[i].yPos > height) {
      increasePlayerScore();
      reDefine(i);
    } else if (object[i].form == 1) {
      object[i].yPos = object[i].yPos + speed;
    } else if (object[i].form == 2) {
      object[i].yPos = object[i].yPos + sin(object[i].mPos) + 0.5;
      object[i].mPos = object[i].mPos + 0.1;
    }else if (object[i].form == 3){
      object[i].yPos = object[i].yPos + sin(object[i].mPos) + 0.5;
    }
  }

  //horizontal movement
  for (let i = 0; i < object.length; i++) {
    if (object[i].form == 1 || object[i].form == 3) {
      if (
        object[i].xPos + sin(object[i].mPos) > 0 &&
        object[i].xPos + object[i].xSize + sin(object[i].mPos) < width
      ) {
        object[i].xPos = object[i].xPos + sin(object[i].mPos);
      }
      object[i].mPos = object[i].mPos + 0.1;
    }
  }
}

function drawGui() {
  fill("#ff0000");
  noStroke();

  rect(playerXPos, playerYPos, playerXSize, playerYSize);

  text("Lives: " + playerHealth, 10, 20);
  text("Score: " + playerScore, width / 2, 20);

  if (debugScreen) {
    text("[playerSpeed] " + playerSpeed, 10, 30);
    text("[playerXPos] " + int(playerXPos), 10, 40);
    text("[playerYPos] " + int(playerYPos), 10, 50);
	text("[n] " + n, 10, 60);
  }
}

//erhält konkretes Objekt; Objekt wird erneut erschaffen
function reDefine(i) {
  object[i] = {
    xSize: 30,
    ySize: 10,
    xPos: null,
    yPos: 0,
    mPos: random(2 * PI),
    form: int(random(1, 4)),
  };
  object[i].xPos = int(random(width - object[i].xSize));

  doLog("reDefine", "Object[" + i + "] has form " + object[i].form);
}

function doDamage() {
  playerHealth = playerHealth - 25;
  backgroundCooldown = 10;
}

function eventHandler() {
  if (keyIsDown(LEFT_ARROW) && keyIsDown(RIGHT_ARROW)) {
    /*print(
      "[" + frameCount + "] [EventHandler] Both Buttons pressed -> no movement"
    );*/
  } else if (keyIsDown(LEFT_ARROW) || mouseIsPressedLeft()) {
    movePlayerLeft()
  } else if (keyIsDown(RIGHT_ARROW) || mouseIsPressedRight()) {
    movePlayerRight();
  } else {
    playerSpeed = 1;
  }
}
function mouseIsPressedRight(){
  if(mouseIsPressed && mouseX > width / 2){
    return true;
  }else{
    return false;
  }
}

function mouseIsPressedLeft(){
    if(mouseIsPressed && mouseX < width / 2){
    return true;
  }else{
    return false;
  }
}

function movePlayerRight(){
  if (playerXPos + playerXSize + playerSpeed < width) {
      playerXPos = playerXPos + playerSpeed;
      increasePlayerSpeed();
  }
}

function movePlayerLeft(){
  if (playerXPos - playerSpeed > 0) {
      playerXPos = playerXPos - playerSpeed;
      increasePlayerSpeed();
    }
}

function increasePlayerSpeed() {
  playerSpeed = playerSpeed + 0.1 / (playerSpeed * playerSpeed);
}

function increasePlayerScore() {
  playerScore++;
}

function doGameOver() {
  playerHealth = 100;
  playerScore = 0;

  newObjects();
  //doLog("GameOver", "prevented newObjects due to testing");
}

function newObjects() {
  for (let i = 0; i < n; i++) {
    object[i] = {
      xSize: 30,
      ySize: 10,
      xPos: null,
      yPos: null,
      mPos: random(2 * PI),
      form: int(random(1, 4)),
    };
    object[i].xPos = int(random(width - object[i].xSize));
    object[i].yPos = int(random(height - (height / 5 + object[i].ySize)));

    doLog("newObjects", "Object[" + i + "] has form " + object[i].form);
  }
}

function keyReleased() {
  //DebugScreen
  if (key == " ") {
    if (debugScreen) {
      debugScreen = false;
    } else {
      debugScreen = true;
    }
  }
}

function doLog(originFunction, content) {
  print("[" + frameCount + "] " + "[" + originFunction + "] " + content);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  playerXPos = width / 2 - playerXSize / 2;
  playerYPos = height - height / 20;


  n = width / 20;
  newObjects();
}

function draw() {
  eventHandler();
  drawBackground();
  drawGame();
  drawGui();
  moveObjects();
  checkCollision();

  if (frameCount % 20 == 0) {
    playerHealth++;
  }
  if (playerHealth <= 0) {
    doGameOver();
  }
}