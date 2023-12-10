// Form Tabelle
// Form 0: Statisches Viererck
// Form 1: Viereck, das sich gleichmäßig nach unten bewegt und sich mit sin horizontal bewegt
// Form 2: Viereck, das sich mit sin nach unten bewegt
// Form 3: Viereck, das sich mit sin nach unten und mit sin horizontal bewegt; benutzt für beide Richtungen entgegengesetzte sin-werte
// Form 4: Ellipse, die sich gleichmäßig nach unten bewegt und leben gibt; grün

// Todo: übersichtlicher und mehr switch case statements
//  doLog aus der base-lib einbinden
//  checkCollision aufräumen und externe funktionen verwenden
//  eigentlich muss der ganze Code mit OOP neu gemacht werden

const ObjectsPer100px = 10;
var speed = 1.5;

var object = [];
var playerXPos;
var playerYPos;
var playerXSize = 30;
var playerYSize = 10;
var playerHealth = 100;
var playerScore = 0;
var playerSpeed = 1;

//Variables that are set in setup; do not change because doesnt matter
var n;
var debugScreen = false;
var DebugGuiLog = "";
var backgroundCooldown = 0;
var backgroundIndicatorColor = 255;

function drawBackground() {
  noFill();
  stroke(backgroundIndicatorColor);
  strokeWeight(10);

  background(0);
  if (backgroundCooldown > 0) {
    rect(10, 10, width - 20, height - 20);
    backgroundCooldown--;
  }
}
function calcDistance(playerX, playerY, circleX, circleY, objectID) {
  let disX = sqrt((playerX - circleX) * (playerX - circleX));
  let disY = sqrt((playerY - circleY) * (playerY - circleY));
  let dis = sqrt(disX * disX + disY * disY);

  //doLog("calcDistance", "Distance of object[" + objectID + "] was " + dis);
  return dis;
}

function checkCollision() {
  for (let i = 0; i < object.length; i++) {
    if (object[i].yPos + object[i].ySize > height - height / 20) {
      switch (object[i].form) {
        //oben links ecke
        case 0:
          //object does not even move
          break;
        case 4: //für jeden einzelnen Spielereckpunkt die Entfernung zum Kreis-Objekt berechnen und mit Radius abgleichen
          //var DifX = sqrt((playerXPos - object[i].xPos) * (playerXPos - object[i].xPos));
          //var DifY = sqrt((playerYPos - object[i].yPos) * (playerYPos - object[i].yPos));
          //var DifA = sqrt((DifX * DifX)+(DifY * DifY));

          //oben links
          if (
            calcDistance(
              playerXPos,
              playerYPos,
              object[i].xPos,
              object[i].yPos,
              i,
            ) <= object[i].xSize
          ) {
            doLog(
              "checkCollision",
              "object[" +
                i +
                "] with radius " +
                object[i].xSize +
                " touched Player oben links",
            );
            doHeal(i);
            reDefine(i);
          }

          //oben mitte
          if (
            calcDistance(
              playerXPos + (playerXSize / 2),
              playerYPos,
              object[i].xPos,
              object[i].yPos,
              i,
            ) <= object[i].xSize
          ) {
            doLog(
              "checkCollision",
              "object[" +
                i +
                "] with radius " +
                object[i].xSize +
                " touched Player oben mitte",
            );
            doHeal(i);
            reDefine(i);
          }

          //oben rechts
          if (
            calcDistance(
              playerXPos + playerXSize,
              playerYPos,
              object[i].xPos,
              object[i].yPos,
              i,
            ) <= object[i].xSize
          ) {
            doLog(
              "checkCollision",
              "object[" +
                i +
                "] with radius " +
                object[i].xSize +
                " touched Player oben rechts",
            );
            doHeal(i);
            reDefine(i);
          }

          //unten links
          if (
            calcDistance(
              playerXPos,
              playerYPos + playerYSize,
              object[i].xPos,
              object[i].yPos,
              i,
            ) <= object[i].xSize
          ) {
            doLog(
              "checkCollision",
              "object[" +
                i +
                "] with radius " +
                object[i].xSize +
                " touched Player unten links",
            );
            doHeal(i);
            reDefine(i);
          }

          //unten mitte
          if (
            calcDistance(
              playerXPos + (playerXSize / 2),
              playerYPos + playerYSize,
              object[i].xPos,
              object[i].yPos,
              i,
            ) <= object[i].xSize
          ) {
            doLog(
              "checkCollision",
              "object[" +
                i +
                "] with radius " +
                object[i].xSize +
                " touched Player unten mitte",
            );
            doHeal(i);
            reDefine(i);
          }

          //unten rechts
          if (
            calcDistance(
              playerXPos + playerXSize,
              playerYPos + playerYSize,
              object[i].xPos,
              object[i].yPos,
              i,
            ) <= object[i].xSize
          ) {
            doLog(
              "checkCollision",
              "object[" +
                i +
                "] with radius " +
                object[i].xSize +
                " touched Player unten rechts",
            );
            doDamage(i);
            reDefine(i);
          }
          break;
        default:
          //oben links ecke
          if (
            playerXPos >= object[i].xPos &&
            playerXPos <= object[i].xPos + object[i].xSize &&
            playerYPos > object[i].yPos &&
            playerYPos < object[i].yPos + object[i].ySize
          ) {
            doDamage(i);
            reDefine(i);
          }

          //oben rechts ecke
          if (
            playerXPos + playerXSize >= object[i].xPos &&
            playerXPos + playerXSize <= object[i].xPos + object[i].xSize &&
            playerYPos > object[i].yPos &&
            playerYPos < object[i].yPos + object[i].ySize
          ) {
            doDamage(i);
            reDefine(i);
          }

          //unten links ecke
          if (
            playerXPos >= object[i].xPos &&
            playerXPos <= object[i].xPos + object[i].xSize &&
            playerYPos + playerYSize > object[i].yPos &&
            playerYPos + playerYSize < object[i].yPos + object[i].ySize
          ) {
            doDamage(i);
            reDefine(i);
          }

          //unten rechts ecke
          if (
            playerXPos + playerXSize >= object[i].xPos &&
            playerXPos + playerXSize <= object[i].xPos + object[i].xSize &&
            playerYPos + playerYSize > object[i].yPos &&
            playerYPos + playerYSize < object[i].yPos + object[i].ySize
          ) {
            doDamage(i);
            reDefine(i);
          }
      }
    }
  }
}

function drawGame() {
  for (let i = 0; i < object.length; i++) {
    fill("#ffffff");
    noStroke();

    switch (object[i].form) {
      case 0:
        rect(object[i].xPos, object[i].yPos, object[i].xSize, object[i].ySize);
        break;
      case 1:
        rect(object[i].xPos, object[i].yPos, object[i].xSize, object[i].ySize);
        break;
      case 2:
        rect(object[i].xPos, object[i].yPos, object[i].xSize, object[i].ySize);
        break;
      case 3:
        rect(object[i].xPos, object[i].yPos, object[i].xSize, object[i].ySize);
        break;
      case 4:
        fill("#00ff00");
        ellipse(object[i].xPos, object[i].yPos, object[i].xSize * 2);
        break;
      case 5:
        rect(object[i].xPos, object[i].yPos, object[i].xSize, object[i].ySize);
        break;
      default:
        doLog("drawGame()", "received object with unknown design");
    }
  }
}

function moveObjects() {
  for (let i = 0; i < object.length; i++) {
    //check if still in canvas
    switch (object[i].form) {
      case 4:
        if (object[i].yPos - object[i].xSize > height) {
          increasePlayerScore();
          reDefine(i);
        }
        break;
      default:
        if (object[i].yPos > height) {
          increasePlayerScore();
          reDefine(i);
        }
    }

    //move
    switch (object[i].form) {
      case 0: //Object is static
        break;
      case 1: //Rect that moves constantly down and sin horizontal
        object[i].yPos = object[i].yPos + speed;

        if (
          object[i].xPos + sin(object[i].mPosX) > 0 &&
          object[i].xPos + object[i].xSize + sin(object[i].mPosX) < width
        ) {
          object[i].xPos = object[i].xPos + sin(object[i].mPosX);
        }
        break;
      case 2: //sin down movement and no horizontal movement
        object[i].yPos = object[i].yPos + sin(object[i].mPosY) + 0.5;
        break;
      case 3: //sin down movement and sin horizontal movement
        object[i].yPos = object[i].yPos + sin(object[i].mPosY) + 0.5;

        if (
          object[i].xPos + sin(object[i].mPosX) > 0 &&
          object[i].xPos + object[i].xSize + sin(object[i].mPosX) < width
        ) {
          object[i].xPos = object[i].xPos + sin(object[i].mPosX);
        }
        break;
      case 4:
        object[i].yPos = object[i].yPos + 1;
        break;
    }
    //changing the objects mPos so its sin values change
    object[i].mPosX = object[i].mPosX + 0.1;
    object[i].mPosY = object[i].mPosY + 0.1;
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
    text("[playerXPos] " + int(playerXPos), 10, 45);
    text("[playerYPos] " + int(playerYPos), 10, 60);
    text("[DebugGuiLog] " + DebugGuiLog, 10, 75);
    text("[frameCount] " + frameCount, 10, 90);
    text("[objects] " + n, 10, 105);
    //text("[object] " + object[0], 10, 120);
  }
}

function reDefine(i) {
  //erhält index von einem konkreten Objekt; Objekt wird nicht erneut erschaffen, sondern erhält nur neue Werte; ist irgendwie mehr effizient für RAM

  object[i].xSize = 30;
  object[i].ySize = 10;
  object[i].xPos = 0;
  object[i].yPos = 0;
  object[i].mPosX = random(2 * PI);
  object[i].mPosY = random(2 * PI);
  object[i].form = getObjectType();

  if (object[i].form == 4) {
    object[i].xSize = object[i].xSize / 2;
  }

  object[i].xPos = int(random(width - object[i].xSize));

  //doLog("reDefine", "Object[" + i + "] has form " + object[i].form);
}

function doDamage(a) {
  playerHealth = playerHealth - 25;
  backgroundIndicatorColor = color(255, 0, 0);
  backgroundCooldown = 10;
  //doLog("doDamage", "object[" + a + "] decreased playerHealth by 25");
}

function doHeal(a) {
  if (playerHealth < 400) {
    playerHealth = playerHealth + 25;
    doLog("doHeal", "object[" + a + "] increased playerHealth by 25");
  } else {
    playerScore = playerScore + 25;
    doLog("doHeal", "object[" + a + "] increased playerScore by 25");
  }

  backgroundIndicatorColor = color(0, 255, 0);
  backgroundCooldown = 10;
}

function getObjectType() {
  let a = 1;
  let b = 4;
  //Weil die Integer Funktion nicht rundet, sondern einfach nur die Nachkommastellen entfernt muss 'b' um 1 höher sein als das tatsächliche Spektrum von verschiedenen Objects; objects der Form 0 sind ein Objekt der Sonderklasse bzw. statisch

  return getRandomInt(a, b);
}
function eventHandler() {
  if (keyIsDown(LEFT_ARROW) && keyIsDown(RIGHT_ARROW)) {
    /*print(
      "[" + frameCount + "] [EventHandler] Both Buttons pressed -> no movement"
    );*/
  } else if (keyIsDown(LEFT_ARROW) || mouseIsPressedLeft()) {
    movePlayerLeft();
  } else if (keyIsDown(RIGHT_ARROW) || mouseIsPressedRight()) {
    movePlayerRight();
  } else {
    playerSpeed = 1;
  }
}
function mouseIsPressedRight() {
  if (mouseIsPressed && mouseX > width / 2) {
    return true;
  } else {
    return false;
  }
}

function mouseIsPressedLeft() {
  if (mouseIsPressed && mouseX < width / 2) {
    return true;
  } else {
    return false;
  }
}

function movePlayerRight() {
  if (playerXPos + playerXSize + playerSpeed < width) {
    playerXPos = playerXPos + playerSpeed;
    increasePlayerSpeed();
  }
}

function movePlayerLeft() {
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

  //newObjects();
  //doLog("GameOver", "prevented newObjects due to testing");
}

function newObjects() {
  for (let i = 0; i < n; i++) {
    object[i] = {
      xSize: 30,
      ySize: 10,
      xPos: 0,
      yPos: 0,
      mPosX: random(2 * PI),
      mPosY: random(2 * PI),
      form: getObjectType(),
    };

    if (object[i].form == 4) {
      object[i].xSize = object[i].xSize / 2;
    }

    object[i].xPos = int(random(width - object[i].xSize));
    object[i].yPos = int(random(height - (height / 5 + object[i].ySize)));

    //doLog("newObjects", "Object[" + i + "] has form " + object[i].form);
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

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  playerXPos = width / 2 - playerXSize / 2;
  playerYPos = height - height / 20;

  n = ObjectsPer100px * width * 0.01;

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
