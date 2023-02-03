import Phaser from "phaser";
import GameScene from "./src/scene/GameScene";
import PreloadScene from "./src/scene/PreloadScene";

const config = {
  width: 540,
  height: 960,
  type: Phaser.AUTO,
  scene: [PreloadScene, GameScene],
};

const game = new Phaser.Game(config);
