import Phaser from "phaser";
import GameScene from "./src/scene/GameScene";
import PreloadScene from "./src/scene/PreloadScene";

const config = {
  width: 720,
  height: 1280,
  pixelArt: true,
  type: Phaser.AUTO,
  scene: [PreloadScene, GameScene],
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.FIT,
  },
};

const game = new Phaser.Game(config);
