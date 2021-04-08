class Player {
    constructor(canvas, steppableMap, cellIndex, imageID, size) {
        this.cellIndex = cellIndex;
        this.steppableMap = steppableMap;
        this.image = null;
        // this.size = size; // this is an array [width,height]
        // this.index = index; //this is an array [x,y] to choose creature of the sprite
        this.indexIteration = 0;
        this.spriteIteration = 0;
        this.spriteTimeAcc = 0;
        this.x = this.steppableMap[this.cellIndex].x;
        this.y = this.steppableMap[this.cellIndex].y;
        this.direction = "s"; //inidcator of the direction of the creature for sprites
        this.moving = false;
        this.keyMap = {};
        this.frames = 4;
        this.framesIndex = 0;
    }

    movement() {
        if (this.keyMap["d"]) {
            this.keyMap["d"] = false;
            this.moveRight();
            return 'moveRight';
        }
        else if (this.keyMap["a"]) {
            this.keyMap["a"] = false;
            this.moveLeft();
            return 'moveLeft';
        }
    }

    animate(framesCounter) {
       if(framesCounter%10 === 0) {
           this.framesIndex++;
           if(this.framesIndex > 3) {
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
    }

    moveLeft() {
        const nextCellIndex = this.cellIndex - 1;
        if (this.steppableMap[nextCellIndex]) {
            this.cellIndex = nextCellIndex;
        } else {
            this.cellIndex = this.steppableMap.length - 1;
        }
    }

    didCollide(element) {
        if (this.cellIndex === element.cellIndex)
            return true;
    }

    updateKeyMap(e) {
        this.keyMap[e.key] = e.type == "keydown";
    }

    updatePosition() {
        this.x = getNewPosition(this.x, this.steppableMap[this.cellIndex].x);
        this.y = getNewPosition(this.y, this.steppableMap[this.cellIndex].y);
    }
}