class dancer {
    constructor () {}
    danceMoves = [
      moveLeft,
      moveRight
    ];
    
    generateRound() {
      let fullRound = []
      let randomMove = Math.random(danceMoves)
      let createRound = (fullRound.push(randomMove))*3
    
      return fullRound
    }
  }