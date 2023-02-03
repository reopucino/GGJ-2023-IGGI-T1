import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("preload");
  }
  preload() {
    this.load.image("down", "down.png");
    this.load.image("red", "red.png");
    this.load.image("white", "white.png");
  }
  create() {
    this.scene.start("game");
  }
}
