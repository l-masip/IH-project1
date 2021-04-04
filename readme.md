# Somethingsomething Dance

## Instructions
Move left `<-`, right `->` or pose (v) according to the director's instructions.
Try to follow the beat so the other dancers won't crash with you!

## MVP
Player can follow director's dance moves without disturbing the other dancers.

## Data structure

### main
```
splashScreen()
    buildSplash()
    addEventListener(startGame)

startGame()
    destroySplashScreen()
    createNewGame()
    game.start()

gameOver()
    destroyGame()
    buildGameOver()
    addEventListener(startGame)
```

### game
```
class game
    constructor()
    start()
    startLoop()
    updatePositions()
    checkCollision
    updateCanvas()
```

### director
```
class director
    randomizeMoves()
    generateMoves()
	generateRound
		(possibility of different difficulties and speeds)
    performRound()
```

### dancers
```
class dancers
	updatePosition(performRound)
    draw()

class adjacent-dancers (extends dancers)
	collision()
```

### player
```
class player
	performDance()
    updatePosition()
    draw()
```