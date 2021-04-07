"use strict"

// PX of each cell
const CELL_WIDTH = 40;
const CELL_HEIGHT = 40;

const MAP_CELLS_X = 6;
const MAP_CELLS_Y = 6;

const PLAYER_START_CELL_INDEX = 0;

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

const ROUND_TOTAL = 3;
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
        this.backgroundSound = new Audio("/soundfiles/game-music.mp3")
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
        // this.backgroundSound.play()


        this.player = new Player(
            this.canvas, this.steppableMap, PLAYER_START_CELL_INDEX,
        );
        // this.createNewRound();

        // Add event listener for moving the player
        onkeydown = (e) => {
            this.player.updateKeyMap(e);
        };

        this.startLoop();

    };

    startLoop() {
        const loop = function () {
            // 1. UPDATE POSITION OF PLAYER AND STATUS
            // // 1. Create a mesure of time for each loop
            let now = Date.now();
            deltaTime = (now - this.lastTime) / 500.0;
            this.lastTime = now;
            // this.timeAccumulator += deltaTime;
            // if (this.timeAccumulator > 10) {
            //     this.timeAccumulator = 0;
            // }

            // // 2. Check all collisions

            // this.player.updatePosition(this.map, deltaTime)
            // });

            // 2. CLEAR THE CANVAS
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Do the moves
            if (this.dancerManager.currentRound <= ROUND_TOTAL) {
            this.dancerManager.orchestrate()
            } else {this.victory()}
            // this.dancerManager.isDancing && this.player.movement() !== this.dancerManager.getCurrentAction() ||
            this.player.movement();
            if ( this.checkCollisions()) {
                // this.gameOver();
            }

            // 3. UPDATE THE CANVAS
            this.drawMap();
            this.drawDirector();
            this.drawDancers();
            this.drawPlayer();
            // // Draw the player
            // this.player.draw(deltaTime);


            // 4. TERMINATE LOOP IF THE GAME IS OVER
            if (!this.gameIsOver) {
                setTimeout(() => {
                    loop();
                }, 500);

                // window.requestAnimationFrame(loop);
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

    drawDirector() {
        const currentMovement = this.dancerManager.getCurrentAction();
        console.log(currentMovement);
        this.ctx.fillStyle = '#ffffff';

        let sprite;
        if (this.dancerManager.isDancing) {
            if (!currentMovement) {
                sprite = 'FINISH';
            } else {
                sprite = '0';
            }
        } else if (currentMovement === 'moveLeft') {
            sprite = '<=';
        } else if (currentMovement === 'moveRight') {
            sprite = '=>';
        } else {
            sprite = '1';
        }
        this.ctx.font = "30px Arial";
        this.ctx.fillText(sprite, MAP_CELLS_X / 2 * CELL_WIDTH, MAP_CELLS_Y / 2 * CELL_HEIGHT);

        // this.dancerManager.getDrawable().forEach((dancer) => {
        //     this.ctx.fillStyle = '#ffff00';
        //     this.drawBackgroundCell(dancer.y, dancer.x, dancer.image);
        // });
    }

    drawDancers() {
        this.dancerManager.getDrawable().forEach((dancer) => {
            this.ctx.fillStyle = '#ffff00';
            this.drawBackgroundCell(dancer.y, dancer.x, dancer.image);
        });
    }

    drawPlayer() {
        this.ctx.fillStyle = '#ff00ff';
        this.drawBackgroundCell(this.player.y, this.player.x, Player.image);
    }

    drawBackgroundCell(posY, posX, image) {
        let startY = posY * CELL_HEIGHT;
        let startX = posX * CELL_WIDTH;

        this.ctx.fillRect(startX, startY, CELL_WIDTH, CELL_HEIGHT);
    }

    checkCollisions() {
        return this.dancerManager.dancers.some((dancer) => {
            if (this.player.didCollide(dancer)) {
                return true;
            }
        });
    }

    gameOver() {
        createLostGameOverScreen();
        this.gameIsOver = true
    }

    victory() {
        createWonGameOverScreen();
        this.backgroundSound.pause();
        this.gameIsOver = true
    }
}



