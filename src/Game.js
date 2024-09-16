import TileMap from "./TileMap.js";

const tileSize = 32;
const velcity = 1;

const canvas = document.getElementById("Canvas");
const ctx = canvas.getContext("2d");
const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman(velcity);

// Configura el tamaño del canvas basado en el mapa
tileMap.setCanvasSize(canvas);

function gameLoop() {
  // Limpiar el canvas antes de dibujar
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Llama al método draw con el contexto del canvas
  tileMap.draw(ctx);
  pacman.draw(ctx);
}

// Llama a gameLoop a una tasa de 75 FPS
setInterval(gameLoop, 1000 / 75);
