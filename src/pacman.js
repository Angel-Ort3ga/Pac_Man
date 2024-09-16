import Moving from "./Moving.js";

export default class Pacman {
  constructor(x, y, tileSize, velocity, tileMap) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity;
    this.tileMap = tileMap;

    this.currentMoving = null;
    this.requestMoving = null;

    document.addEventListener("keydown", this.keydown);

    this.loadPacmanImages();
  }

  draw(ctx) {
    this.move();

    ctx.drawImage(
      this.pacmanImages[this.pacmanImageIndex],
      this.x,
      this.y,
      this.tileSize,
      this.tileSize
    );
  }

  loadPacmanImages() {
    const frente = new Image();
    frente.src = "../images/frente.png";
    frente.onload = () => (this.pacmanImages[0] = frente);

    const frente2 = new Image();
    frente2.src = "../images/frente.png";
    frente2.onload = () => (this.pacmanImages[1] = frente2);

    const frente3 = new Image();
    frente3.src = "../images/frente2.png";
    frente3.onload = () => (this.pacmanImages[2] = frente3);

    this.pacmanImages = [frente, frente2, frente3];

    this.pacmanImageIndex = 2;
  }

  move() {
    if (this.currentMoving !== this.requestMoving) {
      if (
        Number.isInteger(this.x / this.tileSize) &&
        Number.isInteger(this.y / this.tileSize)
      ) {
        if (
          !this.tileMap.didCollideWithEvironment(
            this.x,
            this.y,
            this.requestMoving
          )
        )
          this.currentMoving = this.requestMoving;
      }
    }

    if (
      this.tileMap.didCollideWithEvironment(this.x, this.y, this.currentMoving)
    ) {
      return;
    }
    switch (this.currentMoving) {
      case Moving.up:
        this.y -= this.velocity;
        break;
      case Moving.down:
        this.y += this.velocity;
        break;
      case Moving.left:
        this.x -= this.velocity;
        break;
      case Moving.right:
        this.x += this.velocity;
        break;
    }
  }

  keydown = (event) => {
    if (event.keyCode === 38) {
      if (this.currentMoving === Moving.down) this.currentMoving = Moving.up;
      this.requestMoving = Moving.up;
    }

    if (event.keyCode === 40) {
      if (this.currentMoving === Moving.up) this.currentMoving = Moving.down;
      this.requestMoving = Moving.down;
    }

    if (event.keyCode === 37) {
      if (this.currentMoving === Moving.right) this.currentMoving = Moving.left;
      this.requestMoving = Moving.left;
    }

    if (event.keyCode === 39) {
      if (this.currentMoving === Moving.left) this.currentMoving = Moving.right;
      this.requestMoving = Moving.right;
    }
  };
}
