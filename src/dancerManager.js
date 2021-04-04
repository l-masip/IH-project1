class DancerManager {
  constructor(canvas, steppableMap) {
    this.dancers = null;
    this.canvas = canvas;
    this.steppableMap = steppableMap;
  }

  danceMoves = [
    // moveLeft,
    // moveRight
  ];

  getDrawable() {
    return [
      ...this.dancers,
      // this.director,
    ]
  }

  generateRound() {
    let fullRound = []
    // let randomMove = Math.random(danceMoves)
    // let createRound = (fullRound.push(randomMove)) * 3
    this.dancers = this.generateDancers();
    return fullRound
  }

  generateDancers() {
    // Calculate total dancers (available cells - 4 corners)
    // const availableCells = (MAP_CELLS_X * 2 + MAP_CELLS_Y * 2) - 4;
    // const dancers = availableCells - 1; // Remove 1 for the player

    const dancers = [
      new Dancer(this.canvas, this.steppableMap, 0),
      new Dancer(this.canvas, this.steppableMap, 2),
      new Dancer(this.canvas, this.steppableMap, 4),
      new Dancer(this.canvas, this.steppableMap, 6),
    ];


    // for (let row = 0; row < MAP_CELLS_Y; row++) {
    //   // Draw each column
    //   for (let column = 0; column < MAP_CELLS_X; column++) {
    //     if (row !== PLAYER_START_CELL_Y && column !== PLAYER_START_CELL_X) {
    //     }
    //   }
    // }

    return dancers;
  }

  orchestrate() {
    this.dancers.forEach((dancer) => {
      dancer.moveRight();
    });
  }
}