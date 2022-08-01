class statRect{
    constructor(xPos, yPos, xSize, ySize){
        this.xPos = xPos;
        this.yPos = yPos;
        this.xSize = xSize;
        this.ySize = ySize;
    }
}
class sinRect{
    constructor(xPos, yPos, xSize, ySize){
        this.xPos = xPos;
        this.yPos = yPos;
        this.xSize = xSize;
        this.ySize = ySize;
        this.xSin = random(2 * PI);
        this.ySin = random(2 * PI);
        this.xSinMovemnet = getRandomBoolean();
        //aus der base lib
    }
}
