"use strict";

const DANCER_FRONT_IMG = new Image()
DANCER_FRONT_IMG.src = '/img/dancefront.png';

const DANCER_BACK_IMG = new Image()
DANCER_BACK_IMG.src = '/img/danceback.png';

const DANCER_LEFT_IMG = new Image()
DANCER_LEFT_IMG.src = '/img/danceleft.png';

const DANCER_RIGHT_IMG = new Image()
DANCER_RIGHT_IMG.src = '/img/danceright.png';


class Dancer {
  constructor(canvas, steppableMap, cellIndex, imageID, size) {
    // this.canvas = canvas;
    // this.ctx = this.canvas.getContext("2d");
    this.cellIndex = cellIndex;
    this.steppableMap = steppableMap;
    this.image = null;
    // this.image = document.getElementById(imageID);
    // this.size = size; // this is an array [width,height]
    // this.index = index; //this is an array [x,y] to choose creature of the sprite
    this.x = this.steppableMap[this.cellIndex].x;
    this.y = this.steppableMap[this.cellIndex].y;
    this.indexIteration = 0;
    this.spriteIteration = 0;
    this.spriteTimeAcc = 0;
    // this.speed = speed;
    this.direction = "s"; //inidcator of the direction of the creature for sprites
    this.moving = false;
    this.frames = 0;
    this.framesIndex = 0;
    this.updateSpriteDirection();
  }

  animate(framesCounter) {
    if (framesCounter % 10 === 0) {
      this.framesIndex++;
      if (this.framesIndex > this.frames - 1) {
        this.framesIndex = 0;
      }
    }
  }

  moveRight() {
    const nextCellIndex = this.cellIndex + 1;
    if (this.steppableMap[nextCellIndex]) {
      this.cellIndex = nextCellIndex;
    } else {
      this.cellIndex = 0;
    }
    this.updateSpriteDirection();
  }

  moveLeft() {
    const nextCellIndex = this.cellIndex - 1;
    if (this.steppableMap[nextCellIndex]) {
      this.cellIndex = nextCellIndex;
    } else {
      this.cellIndex = this.steppableMap.length - 1;
    }
    this.updateSpriteDirection();
  }

  updateSpriteDirection() {
    const toCell = this.steppableMap[this.cellIndex];
    if (this.x > toCell.x) {
      this.currentSprite = DANCER_LEFT_IMG;
      this.frames = 4;
    } else if (this.x < toCell.x) {
      this.currentSprite = DANCER_RIGHT_IMG;
      this.frames = 4;
    } else if (this.y > toCell.y) {
      this.currentSprite = DANCER_BACK_IMG;
      this.frames = 2;
    } else {
      this.currentSprite = DANCER_FRONT_IMG;
      this.frames = 2;
    }
  }

  updatePosition() {
    this.x = getNewPosition(this.x, this.steppableMap[this.cellIndex].x);
    this.y = getNewPosition(this.y, this.steppableMap[this.cellIndex].y);
  }
}