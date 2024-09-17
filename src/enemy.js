import Moving from "./Moving.js";

export default class Enemy {
  constructor(x, y, tileSize, velocity, tileMap) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity;
    this.tileMap = tileMap;

    this.currentMoving = this.getRandomDirection();
    this.enemyAnimationTimerDefault = 10;
    this.enemyAnimationTimer = null;

    this.enemyImages = {
      [Moving.up]: [],
      [Moving.down]: [],
      [Moving.left]: [],
      [Moving.right]: [],
    };

    this.enemyImageIndex = {
      [Moving.up]: 0,
      [Moving.down]: 0,
      [Moving.left]: 0,
      [Moving.right]: 0,
    };

    this.loadEnemyImages();
  }

  draw(ctx) {
    this.move();
    this.animation();

    const direction = this.currentMoving;

    if (this.enemyImages[direction].length > 0) {
      ctx.drawImage(
        this.enemyImages[direction][this.enemyImageIndex[direction]],
        this.x,
        this.y,
        this.tileSize,
        this.tileSize
      );
    }
  }

  loadEnemyImages() {
    const imagePaths = {
      [Moving.up]: [
        "../images/buD1.png",
        "../images/buD2.png",
        "../images/buD3.png",
        "../images/buD4.png",
      ],
      [Moving.down]: [
        "../images/bup.png",
        "../images/bup2.png",
        "../images/bup3.png",
        "../images/bup4.png",
      ],
      [Moving.left]: [
        "../images/buL.png",
        "../images/buL2.png",
        "../images/buL3.png",
        "../images/buL4.png",
      ],
      [Moving.right]: [
        "../images/buR.png",
        "../images/buR2.png",
        "../images/buR3.png",
        "../images/buR4.png",
      ],
    };

    Object.keys(imagePaths).forEach((direction) => {
      imagePaths[direction].forEach((path, index) => {
        const img = new Image();
        img.src = path;
        img.onload = () => {
          this.enemyImages[direction][index] = img;
        };
        img.onerror = () =>
          console.error(
            `Error al cargar la imagen del enemigo para la dirección ${direction} en la posición ${index}.`
          );
      });
    });
  }

  move() {
    if (
      this.tileMap.didCollideWithEvironment(this.x, this.y, this.currentMoving)
    ) {
      this.currentMoving = this.getRandomDirection();
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

  getRandomDirection() {
    const directions = [Moving.up, Moving.down, Moving.left, Moving.right];
    return directions[Math.floor(Math.random() * directions.length)];
  }

  animation() {
    if (this.enemyAnimationTimer == null) {
      return;
    }
    this.enemyAnimationTimer--;
    if (this.enemyAnimationTimer <= 0) {
      this.enemyAnimationTimer = this.enemyAnimationTimerDefault;
      const direction = this.currentMoving;
      if (this.enemyImages[direction].length > 0) {
        this.enemyImageIndex[direction]++;
        if (
          this.enemyImageIndex[direction] >= this.enemyImages[direction].length
        ) {
          this.enemyImageIndex[direction] = 0;
        }
      }
    }
  }
}
