import Pacman from "./Pacman.js";
import Enemy from "./Enemy.js";
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

    this.enemies = [];
  }

  checkImagesLoaded() {
    if (this.muro.complete && this.ball1.complete) {
      this.imagesLoaded = true;
    }
  }

  map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 5, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 6, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 5, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 4, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1],
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
        } else if (tile === 4) {
          this.drawBlank(ctx, colum, row, this.tileSize);
        } else if (tile === 6) {
          this.enemies.push(
            new Enemy(
              colum * this.tileSize,
              row * this.tileSize,
              this.tileSize,
              1,
              this
            )
          );
          this.map[row][colum] = 0; // Limpia la posición del enemigo en el mapa
        }
      }
    }

    this.enemies.forEach((enemy) => enemy.draw(ctx));
  }

  getPacman(velocity) {
    for (let row = 0; row < this.map.length; row++) {
      for (let colum = 0; colum < this.map[row].length; colum++) {
        let tile = this.map[row][colum];
        if (tile === 4) {
          this.map[row][colum] != 1;
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
    return null;
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

  setCanvasSize(canvas) {
    canvas.width = this.map[0].length * this.tileSize;
    canvas.height = this.map.length * this.tileSize;
  }

  didCollideWithEvironment(x, y, direction) {
    if (direction == null) {
      return false;
    }

    let col = Math.floor(x / this.tileSize);
    let row = Math.floor(y / this.tileSize);

    // Ajusta la posición según la dirección del movimiento
    if (direction === Moving.left) {
      col -= 1;
    } else if (direction === Moving.right) {
      col += 1;
    } else if (direction === Moving.up) {
      row -= 1;
    } else if (direction === Moving.down) {
      row += 1;
    }

    // Verifica si la posición está fuera del mapa
    if (
      row < 0 ||
      row >= this.map.length ||
      col < 0 ||
      col >= this.map[row].length
    ) {
      return true;
    }

    const tile = this.map[row][col];
    // 1 significa colisión con un obstáculo
    return tile === 1;
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
