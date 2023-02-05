import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("preload");
  }
  preload() {
    //this.load.image
    //real assets
    this.load.spritesheet("anim_mouse", "anim_mouse.png", { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet("anim_termit", "anim_termit.png", { frameWidth: 48, frameHeight: 16 });
    this.load.spritesheet("roots", "roots.png", { frameWidth: 16, frameHeight: 16 });
    this.load.image("char", "character.png");
    this.load.spritesheet("ui-direction", "ui-direction.png", { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("bg-fg", "bg-fg.png", { frameWidth: 16, frameHeight: 16 });
    this.load.image("background", "background.png");

    //audio
    this.load.audio("bgm", "./sounds/bgm.mp3");
    this.load.audio("gameover", "./sounds/gameover.mp3");
    this.load.audio("hit", "./sounds/hit.mp3");
    this.load.audio("placement", "./sounds/placement.mp3");
    this.load.audio("stone", "./sounds/stone3.mp3");
    this.load.audio("mouse", "./sounds/tikus1.mp3");
    this.load.audio("water", "./sounds/water1.mp3");
  }
  create() {
    this.scene.start("game");
  }
}
