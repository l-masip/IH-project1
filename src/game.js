"use strict";
const PLAYER_WIDTH = 0; //emptyyyyyyyyyyyyyyyyyyyyy
const PLAYER_HEIGHT = 0; //emptyyyyyyyyyyyyyyyyyyyy

// PX of each cell
const CELL_WIDTH = 30;
const CELL_HEIGHT = 30;

const MAP_CELLS_X = 6;
const MAP_CELLS_Y = 6;

const PLAYER_START_CELL_X = 4;
const PLAYER_START_CELL_Y = 6;

const MAP_TILES = {//cambiar cualquier característica del mapa
    stepperCell: {
        background: '#ff0000',
        steppable: true,
    },
    outerCell: {
        background: '#0000ff',
        steppable: false,
    },
}

class Game {
    constructor(gameScreen) {
        this.canvas = null;
        this.ctx = null;
        this.gameScreen = gameScreen;
        this.player = null;
        this.monsters = [];
        this.activeMonsters = [];
        this.gameIsOver = false;
        this.map = [];
        this.round = 0; //reutilizar?
    }

    start() {
        // Create `ctx`, a `player` and start the Canvas loop

        let canvasContainer = document.querySelector(".canvas-container");
        this.canvas = this.gameScreen.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d");

        // Save reference to the score and live elements
        this.round = this.gameScreen.querySelector(".round");

        // Set the canvas dimesions to match the parent
        this.containerWidth = canvasContainer.offsetWidth;
        this.containerHeight = canvasContainer.offsetHeight;
        this.canvas.setAttribute("width", this.containerWidth);
        this.canvas.setAttribute("height", this.containerHeight);

        this.map = this.generateMap();

        // Play the background music of the game
        // document.getElementById("background-music").play();

        // this.player = new Player(
        //   this.canvas,
        //   50,
        //   10,
        //   5,
        //   this.canvas.width / 2 - 25,
        //   this.canvas.height / 2 - 25,
        //   "charset",
        //   [70, 70],
        //   [1, 0]
        // );
        // this.createNewRound();

        // Add event listener for moving the player
        // onkeydown = onkeyup = (e) => {
        //   this.map[e.key] = e.type == "keydown";
        this.startLoop();

    };

    startLoop() {
        const loop = function () {
            let now = Date.now();
            let deltaTime = (now - this.lastTime) / 1000.0;
            this.lastTime = now;


            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


            this.drawMap();


            if (!this.gameIsOver) {
                window.requestAnimationFrame(loop);
            }

        }.bind(this); // var loop = function(){}.bind(this);

        window.requestAnimationFrame(loop);
    }

    generateMap() {
        const map = [];
        // Draw each row
        for (let row = 0; row < MAP_CELLS_Y; row++) {
            map[row] = [];
            // Draw each column
            for (let column = 0; column < MAP_CELLS_X; column++) {
                if (row === 0 || row === MAP_CELLS_Y - 1 || column === 0 || column === MAP_CELLS_X - 1) {
                    map[row][column] = MAP_TILES.stepperCell;
                } else {
                    map[row][column] = MAP_TILES.outerCell;
                }
            }
        }

        return map;
    }

    drawMap() {
        const map = this.map;
        for (let row = 0; row < map.length; row++) {
            for (let column = 0; column < map.length; column++) {
                const cell = map[row][column];
                this.ctx.fillStyle = cell.background;
                this.drawBackgroundCell(row, column);
            }
        }
    }

    drawBackgroundCell(posY, posX, image) {
        let startY = posY * CELL_HEIGHT;
        let startX = posX * CELL_WIDTH;

        this.ctx.fillRect(startX, startY, CELL_WIDTH, CELL_HEIGHT);
    }
}



