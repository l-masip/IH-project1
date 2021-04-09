# Hamster Dance!

## Instructions

Move left `a` or right `d` according to the Boss' instructions.
Try to follow the beat so the other dancers won't crash with you!

## MVP

The player must follow the rhythm of the music and copy the director's dance moves to dance around a circle without disturbing the other dancers.

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

getNewPosition()
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

## Links

[PowerPoint Presentation](https://drive.google.com/file/d/1l4hX1_-Dm_e8N9VDbAScpPGGs8OmeBha/view?usp=sharing)

[Link to the game](l-masip.github.io/ih-project1/) 