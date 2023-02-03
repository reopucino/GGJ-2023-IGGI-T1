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

    for (let c_index = 0; c_index < 2; c_index++) {
      let container = this.createContainerRandom();
      container.x = 133 * (c_index + 1);
      container.y = 133;
    }
  }

  createContainerType(numberType) {
    let container = this.add.container(0, 0);
    let array = [];
    let size_x = 133;
    let size_y = 399;
    if (numberType == 0) {
      let img1 = this.add.image(0, -133, "down");
      let img2 = this.add.image(0, 0, "down");
      let img3 = this.add.image(0, 133, "down");
      array.push(img1, img2, img3);
    } else if (numberType == 1) {
      let img1 = this.add.image(0, -133, "down");
      let img2 = this.add.image(0, 0, "down");
      let img3 = this.add.image(0, 133, "down");
      let img4 = this.add.image(-133, 133, "down");
      size_x = 266;
      array.push(img1, img2, img3, img4);
    } else {
      let img1 = this.add.image(0, -133, "down");
      let img2 = this.add.image(0, 0, "down");
      let img3 = this.add.image(0, 133, "down");
      let img4 = this.add.image(133, 133, "down");
      size_x = 266;
      array.push(img1, img2, img3, img4);
    }

    container.add(array);
    container.setSize(size_x, size_y);
    container.setInteractive();
    return container;
  }

  createContainerRandom() {
    let random = Phaser.Math.Between(0, 2);
    let container = this.createContainerType(random);
    return container;
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
