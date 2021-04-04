"use strict";

class dancer {
  constructor(canvas, health, attack, speed, x, y, imageID, size, index) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    // this.image = document.getElementById(imageID);
    // this.size = size; // this is an array [width,height]
    // this.index = index; //this is an array [x,y] to choose creature of the sprite
    this.indexIteration = 0;
    this.spriteIteration = 0;
    this.spriteTimeAcc = 0;
    this.speed = speed;
    this.direction = "s"; //inidcator of the direction of the creature for sprites and shooting
    this.moving = false;
  }
  
}