import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("game");
  }
  create() {
    //this.add.image(30, 30, "javascript");

    this.input.on("pointerdown", this.startDrag, this);

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        this.add.image((i + 1) * 133, (j + 3) * 133, "white");
      }
    }

    this.add.image(150, 100, "down").setInteractive();
  }

  startDrag(pointer, targets) {
    this.input.off("pointerdown", this.startDrag, this);
    this.dragObject = targets[0];
    this.input.on("pointermove", this.doDrag, this);
    this.input.on("pointerup", this.stopDrag, this);
  }

  doDrag(pointer) {
    if (this.dragObject == null || this.dragObject == undefined) return;
    this.dragObject.x = pointer.x;
    this.dragObject.y = pointer.y;
  }

  stopDrag(pointer) {
    this.input.on("pointerdown", this.startDrag, this);
    this.input.off("pointermove", this.doDrag, this);
    this.input.off("pointerup", this.stopDrag, this);
  }
}
