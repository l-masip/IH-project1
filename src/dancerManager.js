class DancerManager {
  constructor(canvas, steppableMap) {
    this.dancers = null;
    this.canvas = canvas;
    this.steppableMap = steppableMap;
    this.roundMovements = null;
    this.currentMove = null;
  }

  danceMoves = [
    'moveLeft',
    'moveRight',
  ];

  getDrawable() {
    return [
      ...this.dancers,
      // this.director,
    ]
  }

  generateRound(totalMovements = 3) {
    this.dancers = this.generateDancers();
    this.roundMovements = [];
    this.currentMove = 0;

    for (let movement = 0; movement < totalMovements; movement++) {
      const randomMove = this.danceMoves[Math.floor((Math.random() * this.danceMoves.length))];
      this.roundMovements.push(randomMove);
    }

    console.log(this.roundMovements);
  }

  generateDancers() {
    const dancers = [];

    for (let cellIndex = 2; cellIndex < this.steppableMap.length; cellIndex += 2) {
      dancers.push(new Dancer(this.canvas, this.steppableMap, cellIndex));
    }

    return dancers;
  }

  /**
   * Return false if no more moves
   */
  orchestrate() {
    if (this.currentMove < this.roundMovements.length) {
      const moveToDo = this.roundMovements[this.currentMove];
      this.currentMove++;

      this.dancers.forEach((dancer) => {
        dancer[moveToDo]();
      });
    } 
  }
}