import Phaser from "phaser";
import GameScene from "./src/scene/GameScene";
import PreloadScene from "./src/scene/PreloadScene";
import { TestScene } from "./src/scene/TestScene";

const config = {
  width: 180, //180 ori //testing 1600
  height: 320, //320 ori //testing 1600
  pixelArt: true,
  type: Phaser.AUTO,
  scene: [PreloadScene, GameScene, TestScene],
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.FIT,
  },
};

const game = new Phaser.Game(config);
