const PLAYER_FRONT_IMG = new Image()
PLAYER_FRONT_IMG.src = 'img/hamfront.png';

const PLAYER_BACK_IMG = new Image()
PLAYER_BACK_IMG.src = 'img/hamback.png';

const PLAYER_LEFT_IMG = new Image()
PLAYER_LEFT_IMG.src = 'img/hamleft.png';

const PLAYER_RIGHT_IMG = new Image()
PLAYER_RIGHT_IMG.src = 'img/hamright.png';

class Player {
    constructor(canvas, steppableMap, cellIndex) {
        this.cellIndex = cellIndex;
        this.steppableMap = steppableMap;
        this.indexIteration = 0;
        this.spriteIteration = 0;
        this.spriteTimeAcc = 0;
        this.x = this.steppableMap[this.cellIndex].x;
        this.y = this.steppableMap[this.cellIndex].y;
        this.updateSpriteDirection();
        this.keyMap = {};
        this.frames = 4;
        this.framesIndex = 0;
        this.currentSprite = null;
        this.updateSpriteDirection();
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
           if(this.framesIndex > this.frames - 1) {
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
            this.currentSprite = PLAYER_LEFT_IMG;
        } else if (this.x < toCell.x) {
            this.currentSprite = PLAYER_RIGHT_IMG;
        } else if (this.y > toCell.y) {
            this.currentSprite = PLAYER_BACK_IMG;
        } else {
            this.currentSprite = PLAYER_FRONT_IMG;
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