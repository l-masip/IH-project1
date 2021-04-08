class DancerManager {
  constructor(canvas, steppableMap) {
    this.canvas = canvas;
    this.steppableMap = steppableMap;
    this.dancers = this.generateDancers();
    this.roundMovements = null;
    this.currentMove = null;
    this.isDancing = null;
    this.currentRound = 0;
    this.moveRightSound = new Audio("soundfiles/right-sound.mp3");
    this.moveLeftSound = new Audio("soundfiles/left-sound.mp3");
    this.director = new Director();
  }

  danceMoves = [
    'moveLeft',
    'moveRight',
  ];

  getDrawable() {
    return [
      ...this.dancers,
      this.director,
    ]
  }

  getCurrentAction() {
    return this.roundMovements[this.currentMove - 1];
  }

  generateRound(totalMovements = 3) { //edit how many movements each round
    this.roundMovements = [];
    this.currentMove = 0;
    this.isDancing = false;

    for (let movement = 0; movement < totalMovements; movement++) {
      const randomMove = this.danceMoves[Math.floor((Math.random() * this.danceMoves.length))];
      this.roundMovements.push(randomMove);
    }
    this.roundMovements.push(null);
    this.currentRound ++;
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
      const moveToDo = this.getCurrentAction();
      if (this.isDancing) {
        if (moveToDo) {
          this.dancers.forEach((dancer) => {
            dancer[moveToDo]();
          });
        }
      } else if (moveToDo) {
        this.director[moveToDo]();
      }
      switch (moveToDo) {
        case 'moveLeft':
          this.moveLeftSound.play();
          break;            
        case 'moveRight':
          this.moveRightSound.play();
          break;
      }
      this.currentMove++;
    } else if (!this.isDancing) {
      this.director.moveStill();
      this.isDancing = true;
      this.currentMove = 1;
    } else if (this.currentRound < ROUND_TOTAL) {
      this.generateRound();
    } else {
      this.currentRound++;
    }
  }

  updateDancersPosition() {
    this.dancers.forEach((dancer) => {
      dancer.updatePosition();
    });
  }
}