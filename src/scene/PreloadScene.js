import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("preload");
  }
  preload() {
    this.load.image("down", "down.png");
    this.load.image("red", "red.png");
    this.load.image("white", "white.png");
    this.load.image("basic-button", "button_b.png");
    this.load.image("b_d", "b_d.png");
    this.load.image("b_l", "b_l.png");
    this.load.image("b_r", "b_r.png");
    this.load.image("b_dl", "b_dl.png");
    this.load.image("b_dr", "b_dr.png");
    this.load.image("b_ld", "b_ld.png");
    this.load.image("b_rd", "b_rd.png");
  }
  create() {
    this.scene.start("game");
  }
}
