// src/TileMap.js
import Pacman from "./Pacman.js";
import Moving from "./Moving.js";

export default class TileMap {
  constructor(tileSize) {
    this.tileSize = tileSize;
    this.imagesLoaded = false;

    this.muro = new Image();
    this.muro.src = "../images/muro.png";
    this.muro.onload = () => this.checkImagesLoaded();
    this.muro.onerror = () =>
      console.error("Error al cargar la imagen de muro.");

    this.ball1 = new Image();
    this.ball1.src = "../images/ball1.png";
    this.ball1.onload = () => this.checkImagesLoaded();
    this.ball1.onerror = () =>
      console.error("Error al cargar la imagen de ball1.");
  }

  checkImagesLoaded() {
    // Verificar si ambas imágenes se han cargado
    if (this.muro.complete && this.ball1.complete) {
      this.imagesLoaded = true;
    }
  }

  map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  draw(ctx) {
    if (!this.imagesLoaded) {
      console.log("Imágenes aún no cargadas");
      return;
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let row = 0; row < this.map.length; row++) {
      for (let colum = 0; colum < this.map[row].length; colum++) {
        let tile = this.map[row][colum];
        if (tile === 1) {
          this.drawWall(ctx, colum, row, this.tileSize);
        } else if (tile === 0) {
          this.drawDot(ctx, colum, row, this.tileSize);
        } else {
          this.drawBlank(ctx, colum, row, this.tileSize);
        }
      }
    }
  }

  drawDot(ctx, colum, row, size) {
    ctx.drawImage(
      this.ball1,
      colum * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }

  drawWall(ctx, colum, row, size) {
    ctx.drawImage(
      this.muro,
      colum * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }

  drawBlank(ctx, colum, row, size) {
    ctx.fillStyle = "black";
    ctx.fillRect(colum * this.tileSize, row * this.tileSize, size, size);
  }

  getPacman(velocity) {
    for (let row = 0; row < this.map.length; row++) {
      for (let colum = 0; colum < this.map[row].length; colum++) {
        let tile = this.map[row][colum];
        if (tile === 4) {
          this.map[row][colum] = 0;
          return new Pacman(
            colum * this.tileSize,
            row * this.tileSize,
            this.tileSize,
            velocity,
            this
          );
        }
      }
    }
    return null; // Asegúrate de retornar null si Pacman no se encuentra
  }

  setCanvasSize(canvas) {
    canvas.width = this.map[0].length * this.tileSize;
    canvas.height = this.map.length * this.tileSize;
  }

  didCollideWithEvironment(x, y, direction) {
    if (direction == null) {
      return false; // Cambiado a false para prevenir una colisión no deseada
    }

    if (
      Number.isInteger(x / this.tileSize) &&
      Number.isInteger(y / this.tileSize)
    ) {
      let colum = 0;
      let row = 0;
      let nextColum = 0;
      let nextRow = 0;

      switch (direction) {
        case Moving.right:
          nextColum = x + this.tileSize;
          colum = nextColum / this.tileSize;
          row = y / this.tileSize;
          break;
        case Moving.left:
          nextColum = x - this.tileSize;
          colum = nextColum / this.tileSize;
          row = y / this.tileSize;
          break;
        case Moving.up:
          nextRow = y - this.tileSize;
          row = nextRow / this.tileSize;
          colum = x / this.tileSize;
          break;
        case Moving.down:
          nextRow = y + this.tileSize;
          row = nextRow / this.tileSize;
          colum = x / this.tileSize;
          break;
      }
      const tile = this.map[row]?.[colum]; // Asegúrate de que `row` y `colum` estén en el rango válido
      if (tile === 1) {
        return true;
      }
    }
    return false;
  }

  eatDot(x, y) {
    const row = Math.floor(y / this.tileSize);
    const colum = Math.floor(x / this.tileSize);
    if (this.map[row]?.[colum] === 0) {
      this.map[row][colum] = 5;
      return true;
    }
    return false;
  }
}
