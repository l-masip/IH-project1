# Hamster Dance!

## Instructions
Move left `a` or right `d` according to the Boss' instructions.
Try to follow the beat so the other dancers won't crash with you!

## MVP
Player can follow director's dance moves without disturbing the other dancers.

## Data structure

### main
```
createSplashScreen()
    buildSplash()
    addEventListener(startGame)

removeSplashScreen()

createGameScreen()
    createNewGame()
    game.start()

createLostGameOverScreen()
    removeGameScreen()
    gameOverSceen()
    addEventListener(startGame)

createWonGameOverScreen()
    removeGameScreen()
    gameOverSceen()
    addEventListener(startGame)

removeGameOverScreen()

startGame()
```

### game
```
class game
    constructor()
    start()
    startLoop()
    generateMap()
    generateSteppableMap()
    drawMap()
    drawDancers()
    drawPlayer()
    drawBackgroundCell()
    drawImageCell()
    checkCollisions()
    gameOver()
    victory()

getNewPoition()
```

### dancerManager
```
class DancerManager
    constructor()
    danceMoves
    getDrawable()
    getCurrentAction()
    generateRound()
    generateDancers()
    orchestrate()
    updateDancersPosition()
```

### dancers
```
class Dancer
    constructor()
    animate()
    moveRight()
    moveLeft()
    updateSpriteDirection()
	updatePosition()
```

### player
```
class Player
    constructor()
	movement()
    animate()
    moveRight()
    moveLeft()
    updateSpriteDirection()
    didCollide()
    updateKeyMap()
    updatePosition()
```