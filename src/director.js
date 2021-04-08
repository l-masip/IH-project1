"use strict";

const DIRECTOR_STILL_IMG = new Image()
DIRECTOR_STILL_IMG.src = '/img/bossstill.png';

const DIRECTOR_LEFT_IMG = new Image()
DIRECTOR_LEFT_IMG.src = '/img/bossleft.png';

const DIRECTOR_RIGHT_IMG = new Image()
DIRECTOR_RIGHT_IMG.src = '/img/bossright.png';


class Director {
  constructor() {
    this.x = MAP_CELLS_X * CELL_WIDTH / 2 - CELL_WIDTH / 2;
    this.y = MAP_CELLS_Y * CELL_WIDTH / 2 - CELL_HEIGHT / 2;
    this.indexIteration = 0;
    this.spriteIteration = 0;
    this.spriteTimeAcc = 0;
    this.frames = 0;
    this.framesIndex = 0;
    this.currentSprite = null;
    this.moveStill();
  }

  animate(framesCounter) {
    if (framesCounter % 10 === 0) {
      this.framesIndex++;
      if (this.framesIndex > this.frames - 1) {
        this.framesIndex = 0;
      }
    }
  }

  moveStill() {
    this.currentSprite = DIRECTOR_STILL_IMG;
    this.frames = 4;
  }

  moveRight() {
    this.currentSprite = DIRECTOR_RIGHT_IMG;
    this.frames = 2;
  }

  moveLeft() {
    this.currentSprite = DIRECTOR_LEFT_IMG
    this.frames = 2;
  }

}