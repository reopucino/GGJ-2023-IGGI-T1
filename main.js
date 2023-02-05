import Phaser from "phaser";
import GameScene from "./src/scene/GameScene";
import PreloadScene from "./src/scene/PreloadScene";

const config = {
  width: 180,
  height: 320,
  pixelArt: true,
  type: Phaser.AUTO,
  scene: [PreloadScene, GameScene],
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.FIT,
  },
};

const game = new Phaser.Game(config);
