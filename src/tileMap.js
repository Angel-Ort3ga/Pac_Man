export default class TileMap {
  constructor(tileSize) {
    this.tileSize = tileSize;
    this.imagesLoaded = false;

    this.muro = new Image();
    this.muro.src = "../images/muro.png";
    this.muro.onload = () => this.checkImagesLoaded();

    this.ball1 = new Image();
    this.ball1.src = "../images/ball1.png";
    this.ball1.onload = () => this.checkImagesLoaded();
  }

  checkImagesLoaded() {
    // Verificar  imágenes
    if (this.muro.complete && this.ball1.complete) {
      this.imagesLoaded = true;
    }
  }

  map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  draw(ctx) {
    if (!this.imagesLoaded) {
      console.log("Imágenes aún no cargadas");
      return;
    }

    for (let row = 0; row < this.map.length; row++) {
      for (let colum = 0; colum < this.map[row].length; colum++) {
        let tile = this.map[row][colum];
        if (tile === 1) {
          this.drawWall(ctx, colum, row, this.tileSize);
        } else if (tile === 0) {
          this.drawDot(ctx, colum, row, this.tileSize);
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

  setCanvasSize(canvas) {
    canvas.width = this.map[0].length * this.tileSize;
    canvas.height = this.map.length * this.tileSize;
  }
}
