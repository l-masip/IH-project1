let game;
let splashScreen;
let gameScreen;
let gameOverScreen;

function buildDom(htmlString) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    return tempDiv.children[0];
}

function createSplashScreen() {
    splashScreen = buildDom(`
        <main>
          <h1>Dance!</h1>
          <button>Let's dance!</button>
        </main>
      `);
    document.body.appendChild(splashScreen);
    const startButton = splashScreen.querySelector("button");
    startButton.addEventListener("click", startGame);
}

function removeSplashScreen() {
    splashScreen.remove();
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
    gameScreen.remove();
}

function createLostGameOverScreen() {
    removeGameScreen();
    gameOverScreen = buildDom(`
      <main>
          <h1>YOU SUCK!</h1>
          <p>Come back when you get better.</span> </p>
          <button>Try again</button>
      </main>
      `);
    const button = gameOverScreen.querySelector("button");
    button.addEventListener("click", startGame)

    document.body.appendChild(gameOverScreen)
}

function createWonGameOverScreen() {
    removeGameScreen();
    gameOverScreen = buildDom(`
    <main>
        <h1>WOW, YOU ARE SO COOL!</h1>
        <p>Come back whenever you want, we'll be waiting for you.</span> </p>
        <button>Try again</button>
    </main>
    `);
  const button = gameOverScreen.querySelector("button");
  button.addEventListener("click", startGame)

  document.body.appendChild(gameOverScreen)
}

function removeGameOverScreen() {
    gameOverScreen.remove()
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
window.addEventListener("load", startGame);
