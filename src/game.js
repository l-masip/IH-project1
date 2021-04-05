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

var deltaTime;

class Game {
    constructor(gameScreen) {
        this.canvas = null;
        this.ctx = null;
        this.gameScreen = gameScreen;
        this.player = null;
        this.dancerManager = null;
        // Tiles in order that player/dancers will step on
        this.steppableMap = null;
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
        this.steppableMap = this.generateSteppableMap(this.map);
        this.dancerManager = new DancerManager(this.canvas, this.steppableMap);
        this.dancerManager.generateRound();

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

        this.startLoop();

    };

    startLoop() {
        const loop = function () {
            // 1. UPDATE POSITION OF PLAYER AND STATUS
            // // 1. Create a mesure of time for each loop
            let now = Date.now();
            deltaTime = (now - this.lastTime) / 1000.0;
            this.lastTime = now;
            // this.timeAccumulator += deltaTime;
            // if (this.timeAccumulator > 10) {
            //     this.timeAccumulator = 0;
            // }

            // // 2. Check all collisions
            // this.checkCollisions();

            // this.player.updatePosition(this.map, deltaTime)
            // });

            // 2. CLEAR THE CANVAS
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Do the moves
            this.dancerManager.orchestrate();

            // 3. UPDATE THE CANVAS
            this.drawMap();
            this.drawDancers();
            // // Draw the player
            // this.player.draw(deltaTime);

            // // Draw the activeMonsters
            // this.activeMonsters.forEach((monster) => {
            //     monster.draw(deltaTime);
            // });


            // 4. TERMINATE LOOP IF THE GAME IS OVER
            if (!this.gameIsOver) {
                // window.requestAnimationFrame(loop);
                setTimeout(() => {
                    loop();
                }, 200);
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
                    map[row][column] = {
                        ...MAP_TILES.stepperCell,
                        y: row,
                        x: column,
                    };
                } else {
                    map[row][column] = {
                        ...MAP_TILES.outerCell,
                        y: row,
                        x: column,
                    };
                }
            }
        }

        return map;
    }

    generateSteppableMap(map) {
        let steppableMap = [];

        // Draw each row
        map.forEach((row) => {
            row.forEach((cell) => {
                if (cell.steppable) {
                    steppableMap.push(cell)
                }
            });
        });

        steppableMap = steppableMap.sort((cellA, cellB) => {
            if (cellA.x >= cellA.y) {
                if (cellA.x === cellB.x) {
                    return cellA.y - cellB.y;
                }
                return cellA.x - cellB.x;
            }

            if (cellA.y === cellB.y) {
                return cellB.x - cellA.x;
            }
            return cellB.y - cellA.y;
        });

        return steppableMap;
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

    drawDancers() {
        this.dancerManager.getDrawable().forEach((dancer) => {
            this.ctx.fillStyle = '#ffff00';
            this.drawBackgroundCell(dancer.y, dancer.x, dancer.image);
        });
    }

    drawBackgroundCell(posY, posX, image) {
        let startY = posY * CELL_HEIGHT;
        let startX = posX * CELL_WIDTH;

        this.ctx.fillRect(startX, startY, CELL_WIDTH, CELL_HEIGHT);
    }
}



