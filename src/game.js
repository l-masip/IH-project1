"use strict"

// PX of each cell
const CELL_WIDTH = 40;
const CELL_HEIGHT = 40;

const MAP_CELLS_X = 6;
const MAP_CELLS_Y = 6;

const PLAYER_START_CELL_INDEX = 0;

const STEPPER_IMG = new Image();
STEPPER_IMG.src = 'img/greentile.png';

const OUTER_IMG = new Image();
OUTER_IMG.src = 'img/purptile.png';

const MAP_TILES = {//cambiar cualquier característica del mapa
    stepperCell: {
        background: STEPPER_IMG,
        steppable: true,
    },
    outerCell: {
        background: OUTER_IMG,
        steppable: false,
    },
}

const ROUND_TOTAL = 10; //change total rounds
// Miliseconds between each orquestration
var ACTION_SPEED_MS = 500;
var deltaTime;

// Customizable movement depending on game settings
var DEFAULT_MOVEMENT_PX_PER_SECOND = 1000 / (ACTION_SPEED_MS - 200) * CELL_HEIGHT;

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
        this.backgroundSound = new Audio("soundfiles/game-music.mp3");
        this.framesCounter = 0;
    }

    start() {
        // Create `ctx`, a `player` and start the Canvas loop

        let canvasContainer = document.querySelector(".canvas-container");
        this.canvas = this.gameScreen.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d");

        // Set the canvas dimesions to match the parent
        this.containerWidth = canvasContainer.offsetWidth;
        this.containerHeight = canvasContainer.offsetHeight;
        this.canvas.setAttribute("width", 240);
        this.canvas.setAttribute("height", 240);

        this.map = this.generateMap();
        this.steppableMap = this.generateSteppableMap(this.map);
        this.dancerManager = new DancerManager(this.canvas, this.steppableMap);
        this.dancerManager.generateRound();

        // Play the background music of the game
        playSound(this.backgroundSound);
        this.backgroundSound.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);

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
        let orquestrateInterval = 0;
        const loop = () => {
            this.framesCounter++;

            // 1. Create a mesure of time for each loop
            let now = Date.now();
            deltaTime = (now - this.lastTime) / 1000 || 0;
            this.lastTime = now;
            // this.timeAccumulator += deltaTime;
            // if (this.timeAccumulator > 10) {
            //     this.timeAccumulator = 0;
            // }
            orquestrateInterval += deltaTime;

            // 2. CLEAR THE CANVAS
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            //  Do the moves
            if (orquestrateInterval > 0.5) {
                this.player.movement();
                if (this.dancerManager.currentRound <= ROUND_TOTAL) {
                    this.dancerManager.orchestrate();
                } else {
                    this.victory();
                }
                orquestrateInterval = 0;
            }

            // Refresh characters positions
            this.dancerManager.updateDancersPosition();
            this.player.updatePosition();

            // this.dancerManager.isDancing && this.player.movement() !== this.dancerManager.getCurrentAction() ||
            if (this.checkCollisions()) {
                this.gameOver();
            }

            // 3. UPDATE THE CANVAS
            this.drawMap();
            this.drawDancers();
            this.drawImagePlayer();
            this.player.animate(this.framesCounter);
            // // Draw the player
            if (this.framesCounter > 1000) {
                this.framesCounter = 0
            }
            // 4. TERMINATE LOOP IF THE GAME IS OVER
            if (!this.gameIsOver) {
                window.requestAnimationFrame(loop);
            }

        };

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
                        y: row * CELL_HEIGHT,
                        x: column * CELL_WIDTH,
                    };
                } else {
                    map[row][column] = {
                        ...MAP_TILES.outerCell,
                        y: row * CELL_HEIGHT,
                        x: column * CELL_WIDTH,
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
                this.drawImageCell(cell.y, cell.x, cell.background)
            }
        }
    }

    drawDancers() {
        this.dancerManager.getDrawable().forEach((dancer) => {
            const sprite = dancer.currentSprite;
            this.ctx.drawImage(
                sprite,
                dancer.framesIndex * Math.floor(sprite.width / dancer.frames),
                0,
                Math.floor(sprite.width / dancer.frames),
                sprite.height,
                dancer.x,
                dancer.y,
                CELL_WIDTH,
                CELL_HEIGHT);
            dancer.animate(this.framesCounter);
        });
    }

    drawImagePlayer() {
        const sprite = this.player.currentSprite;
        this.ctx.drawImage(
            sprite,
            this.player.framesIndex * Math.floor(sprite.width / this.player.frames),
            0,
            Math.floor(sprite.width / this.player.frames),
            sprite.height,
            this.player.x,
            this.player.y,
            CELL_WIDTH,
            CELL_HEIGHT)
    }

    drawBackgroundCell(posY, posX, image) {
        let startY = posY;
        let startX = posX;

        this.ctx.fillRect(startX, startY, CELL_WIDTH, CELL_HEIGHT);
    }

    drawImageCell(posY, posX, image) {
        this.ctx.drawImage(image, posX, posY, CELL_WIDTH, CELL_HEIGHT)
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
        this.gameIsOver = true
    }
}

function getNewPosition(entityCoord, destinationCoord, coordsPerSecond = null) {
    if (!coordsPerSecond) {
        coordsPerSecond = DEFAULT_MOVEMENT_PX_PER_SECOND;
    }
    if (entityCoord > destinationCoord) {
        let diff = entityCoord - destinationCoord;
        diff = Math.min(diff, coordsPerSecond * deltaTime);
        return entityCoord - diff;
    } else if (entityCoord < destinationCoord) {
        let diff = Math.abs(entityCoord - destinationCoord);
        diff = Math.min(diff, coordsPerSecond * deltaTime);
        return entityCoord + diff;
    }

    return entityCoord;
}