let game;
let splashScreen;
let gameScreen;
let gameOverScreen;
let currentSound;

const VICTORY_SOUND = new Audio("soundfiles/win-music.mp3")
const LOST_SOUND = new Audio("soundfiles/lose-music.mp3")

function buildDom(htmlString) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    return tempDiv.children[0];
}

function playSound(newSound) {
    stopSound();
    currentSound = newSound;
    currentSound.play();
}

function stopSound() {
    if (currentSound) {
        currentSound.pause();
    }
}

function createSplashScreen() {
    stopSound();
    splashScreen = buildDom(`
        <main class="splash-screen">
          <h1>Hamster Dance!</h1>
          <img src="img/bossstill.gif" alt="boss-here" class="boss-here">
          <div class="instructions">
            <p> Follow the dancesteps given by the Boss.</p>
            <p> Move<br>left <span style="color:cornflowerblue">(A)</span> or <br>right <span style="color:cornflowerblue">(D)</span>.</p>
            <p> Try not to mess up or you'll be kicked out!</p> 
        </div>
        <button class="splashButton">Let's dance!</button>
        <img src="img/hamyey.gif" alt="ham-here" class="ham-here">
        </main>
      `);
    document.body.appendChild(splashScreen);
    const startButton = splashScreen.querySelector("button");
    startButton.addEventListener("click", startGame);
}

function removeSplashScreen() {
    if (splashScreen) {
        splashScreen.remove();
    }
}

function createGameScreen() {
    gameScreen = buildDom(`
      <main class="game container">
          <header>
          </header>
          <div class="canvas-container">
              <canvas></canvas>
          </div>
          
      </main>
      `);

    document.body.appendChild(gameScreen);
    return gameScreen;
}

function removeGameScreen() {
    if (gameScreen) {
        gameScreen.remove();
    }
}

function createLostGameOverScreen() {
    removeGameScreen();
    playSound(LOST_SOUND);
    gameOverScreen = buildDom(`
    <main class="game-over lost">
        <img src="img/bossstill.gif" alt="boss-here" class="boss-here">
        <h1>YOU SUCK!</h1>
        <p>Come back when you get better.</p>
        <img src="img/hamdefeat.gif" alt="happy-ham" class="ham-here">
        <button>Try again</button>
    </main>
    `);
    const button = gameOverScreen.querySelector("button");
    button.addEventListener("click", startGame)

    document.body.appendChild(gameOverScreen)
}

function createWonGameOverScreen() {
    removeGameScreen();
    playSound(VICTORY_SOUND);
    gameOverScreen = buildDom(`
    <main class="game-over">
        <img src="img/bossstill.gif" alt="boss-here" class="boss-here">
        <h1>WOW,<br>YOU ARE SO COOL!</h1>
        <p>Come back whenever you want, we'll be waiting for you. </p>
        <img src="img/hamyey.gif" alt="happy-ham" class="ham-here">
        <button>Try again</button>
    </main>
    `);
    const button = gameOverScreen.querySelector("button");
    button.addEventListener("click", startGame)

    document.body.appendChild(gameOverScreen)
}

function removeGameOverScreen() {
    if (gameOverScreen) {
        gameOverScreen.remove()
    }
}

function startGame() {
    removeSplashScreen();
    if (gameOverScreen) {
        removeGameOverScreen();
    }
    createGameScreen();
    game = new Game(gameScreen);
    game.start();
}

function endGame() {
    removeGameScreen();
}

window.addEventListener("load", createSplashScreen);


// TODO: REMOVE THIS AFTER DEBUG
// window.addEventListener("load", startGame);
