import TileMap from "./TileMap.js";
import Enemy from "./Enemy.js";

const tileSize = 32;
const velocity = 1;

const canvas = document.getElementById("Canvas");
const ctx = canvas.getContext("2d");
let tileMap = new TileMap(tileSize);
let pacman = tileMap.getPacman(velocity);

// Configura el tamaño del canvas basado en el mapa
tileMap.setCanvasSize(canvas);

let isPaused = false;
let timerInterval;
let seconds = 0;

const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");
const pauseScreen = document.getElementById("pauseScreen");
const timerElement = document.getElementById("timer");

startButton.addEventListener("click", () => {
  startScreen.style.display = "none";
  timerElement.style.display = "block";
  startTimer();
  gameLoop(); // Inicia el bucle del juego
});

document.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    isPaused = !isPaused;
    if (isPaused) {
      clearInterval(timerInterval);
      pauseScreen.style.display = "flex";
    } else {
      startTimer();
      pauseScreen.style.display = "none";
    }
  }
});

function startTimer() {
  timerInterval = setInterval(() => {
    if (!isPaused) {
      seconds++;
      const minutes = Math.floor(seconds / 60);
      const displaySeconds = seconds % 60;
      timerElement.textContent = `${String(minutes).padStart(2, "0")}:${String(
        displaySeconds
      ).padStart(2, "0")}`;
    }
  }, 1000);
}

function gameLoop() {
  if (!isPaused) {
    // Limpiar el canvas antes de dibujar
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Llama al método draw con el contexto del canvas
    tileMap.draw(ctx);
    pacman.draw(ctx);
  }
  requestAnimationFrame(gameLoop);
}

const backgroundMusic = new Audio("../sounds/majin.mp3");

// Configurar el sonido para que se reproduzca en bucle
backgroundMusic.loop = true;

// Función para iniciar la música de fondo
function playBackgroundMusic() {
  backgroundMusic.play();
}

// Iniciar la música de fondo al comenzar el juego
playBackgroundMusic();

/*function pauseBackgroundMusic() {
  backgroundMusic.pause();
}

// Reanudar la música
function resumeBackgroundMusic() {
  backgroundMusic.play();
}

/*const chompSound = new Audio("..sound/eat.mp3");

// Función para reproducir el sonido
function playChompSound() {
  chompSound.play();
}

function pacmanEatDot() {
  // Lógica para comer el punto
  playChompSound();
}
*/
