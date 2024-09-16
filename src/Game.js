import TileMap from "./tileMap.js";

const tileSize = 32
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const tileMap = new TileMap(tileSize);

function gameLoop(){
    tileMap.draw();

}  
tileMap.setCanvasSize(canvas);

setInterval(gameLoop,1000/75);