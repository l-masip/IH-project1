class DancerManager {
  constructor(canvas, steppableMap) {
    this.dancers = null;
    this.canvas = canvas;
    this.steppableMap = steppableMap;
    this.roundMovements = null;
    this.currentMove = null;
    this.isDancing = null;
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

  getCurrentAction() {
    return this.roundMovements[this.currentMove - 1];
  }

  generateRound(totalMovements = 3) {
    this.dancers = this.generateDancers();
    this.roundMovements = [];
    this.currentMove = 0;

    for (let movement = 0; movement < totalMovements; movement++) {
      const randomMove = this.danceMoves[Math.floor((Math.random() * this.danceMoves.length))];
      this.roundMovements.push(randomMove);
    }
    this.roundMovements.push(null);

    console.log(this.roundMovements);
  }

  generateDancers() {
    const dancers = [];

    for (let cellIndex = 2; cellIndex < this.steppableMap.length; cellIndex += 2) {
      dancers.push(new Dancer(this.canvas, this.steppableMap, cellIndex));
    }

    return dancers;
  }


  orchestrate() {
    if (this.currentMove < this.roundMovements.length) {
      if (this.isDancing) {
        const moveToDo = this.getCurrentAction();
  
        if (moveToDo) {
          this.dancers.forEach((dancer) => {
            dancer[moveToDo]();
          });
        }
      }
    } else if (!this.isDancing) {
      this.isDancing = true;
      this.currentMove = 0;
    }
    this.currentMove++;
  }


}