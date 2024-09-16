// src/Pacman.js
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

    this.pacmanAnimationTimerDefault = 10;
    this.pacmanAnimatinTimer = null;

    this.pacmanImages = {
      [Moving.up]: [],
      [Moving.down]: [],
      [Moving.left]: [],
      [Moving.right]: [],
    };

    this.pacmanImageIndex = {
      [Moving.up]: 0,
      [Moving.down]: 0,
      [Moving.left]: 0,
      [Moving.right]: 0,
    };

    this.frontImage = new Image();
    this.frontImage.src = "../images/frente.png";
    this.frontImage.onload = () => console.log("Imagen de frente cargada.");

    document.addEventListener("keydown", this.keydown.bind(this));

    this.loadPacmanImages();
  }

  draw(ctx) {
    this.move();
    this.animation();
    this.eatDot();

    const direction =
      this.currentMoving !== null ? this.currentMoving : Moving.right;

    if (this.currentMoving === null) {
      ctx.drawImage(
        this.frontImage,
        this.x,
        this.y,
        this.tileSize,
        this.tileSize
      );
    } else {
      if (this.pacmanImages[direction].length > 0) {
        ctx.drawImage(
          this.pacmanImages[direction][this.pacmanImageIndex[direction]],
          this.x,
          this.y,
          this.tileSize,
          this.tileSize
        );
      }
    }
  }

  loadPacmanImages() {
    const imagePaths = {
      [Moving.up]: [
        "../images/up.png",
        "../images/up2.png",
        "../images/up3.png",
        "../images/up4.png",
        "../images/up5.png",
      ],
      [Moving.down]: [
        "../images/down.png",
        "../images/down2.png",
        "../images/down3.png",
        "../images/down4.png",
        "../images/down5.png",
      ],
      [Moving.left]: [
        "../images/left.png",
        "../images/left2.png",
        "../images/left3.png",
        "../images/left4.png",
        "../images/left5.png",
      ],
      [Moving.right]: [
        "../images/right.png",
        "../images/right2.png",
        "../images/right3.png",
        "../images/right4.png",
        "../images/right5.png",
      ],
    };

    Object.keys(imagePaths).forEach((direction) => {
      imagePaths[direction].forEach((path, index) => {
        const img = new Image();
        img.src = path;
        img.onload = () => {
          this.pacmanImages[direction][index] = img;
          // Si todas las imágenes para esta dirección están cargadas
          if (
            this.pacmanImages[direction].length === imagePaths[direction].length
          ) {
            console.log(`Imágenes para ${direction} cargadas.`);
          }
        };
        img.onerror = () =>
          console.error(
            `Error al cargar la imagen de Pacman para la dirección ${direction} en la posición ${index}.`
          );
      });
    });
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
        ) {
          this.currentMoving = this.requestMoving;
        }
      }
    }

    if (
      this.tileMap.didCollideWithEvironment(this.x, this.y, this.currentMoving)
    ) {
      return;
    } else if (this.currentMoving != null && this.pacmanAnimatinTimer == null) {
      this.pacmanAnimatinTimer = this.pacmanAnimationTimerDefault;
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

  keydown(event) {
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
  }

  animation() {
    if (this.pacmanAnimatinTimer == null) {
      return;
    }
    this.pacmanAnimatinTimer--;
    if (this.pacmanAnimatinTimer <= 0) {
      this.pacmanAnimatinTimer = this.pacmanAnimationTimerDefault;
      const direction =
        this.currentMoving !== null ? this.currentMoving : Moving.right;
      if (this.pacmanImages[direction].length > 0) {
        this.pacmanImageIndex[direction]++;
        if (
          this.pacmanImageIndex[direction] >=
          this.pacmanImages[direction].length
        ) {
          this.pacmanImageIndex[direction] = 0;
        }
      }
    }
  }

  eatDot() {
    if (this.tileMap.eatDot(this.x, this.y)) {
      // Puedes agregar alguna lógica adicional aquí si lo deseas
    }
  }
}
