"use strict";

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
  }
 
  moveRight() {
    const nextCellIndex = this.cellIndex + 1;
    if (this.steppableMap[nextCellIndex]) {
      this.cellIndex = nextCellIndex;
    } else {
      this.cellIndex = 0;
    }
  }

  moveLeft() {
    const nextCellIndex = this.cellIndex - 1;
    if (this.steppableMap[nextCellIndex]) {
      this.cellIndex = nextCellIndex;
    } else {
      this.cellIndex = this.steppableMap.length - 1;
    }
  }

  updatePosition() {
    this.x = getNewPosition(this.x, this.steppableMap[this.cellIndex].x);
    this.y = getNewPosition(this.y, this.steppableMap[this.cellIndex].y);
  }
}