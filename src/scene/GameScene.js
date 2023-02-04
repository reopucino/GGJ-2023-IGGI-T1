import Phaser from "phaser";
import { FollowCam } from "../objects/FollowCam";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("game");
  }
  create() {
    //create grid sample
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 3; j++) {
        this.add.image(110 + i * 133, (j + 3) * 133, "white");
      }
    }

    this.createProps();
    //create startpoint on middle
    this.createStartPoint();

    this.createUI();
    this.input.on("gameobjectdown", this.onClickButton, this);

    //create objectfollow
    this.objectToFollow = this.add.image(110 + 4 * 133, 3 * 133, "objfollow");
    this.kameraBaru = new FollowCam(
      0,
      0,
      this.game.config.width,
      this.game.config.height,
      this.objectToFollow,
      this
    );
    this.kameraBaru.replaceMain();
  }

  createProps() {
    this.lastGridRoot = { x: 4, y: 0 };
  }

  createStartPoint() {
    this.add.image(110 + 4 * 133, 3 * 133, "red");
  }

  //return point
  getPositionFromGrid(x, y) {
    let _x = 110 + x * 133;
    let _y = (y + 3) * 133;
    return { x: _x, y: _y };
  }

  addGridBaseTypeRoot(x, y, typeobject) {
    var _x = x;
    var _y = y;
    if (typeobject == 0) {
      _y += 2;
    } else if (typeobject == 1) {
      _x += -1;
      _y += 2;
    } else if (typeobject == 2) {
      _x += 1;
      _y += 2;
    } else if (typeobject == 3) {
      _x += -1;
      _y += 2;
    } else if (typeobject == 4) {
      _x += 1;
      _y += 2;
    } else if (typeobject == 5) {
      _x += 2;
    } else {
      _x += -2;
    }

    return { x: _x, y: _y };
  }

  createUI() {
    this.createButton(this.game.config.width - 180, 100, 0).setScrollFactor(0);
    this.createButton(this.game.config.width - 330, 100, 1).setScrollFactor(0);
    this.createButton(this.game.config.width - 480, 100, 2).setScrollFactor(0);
    this.createButton(this.game.config.width - 630, 100, 3).setScrollFactor(0);
    this.createButton(this.game.config.width - 780, 100, 4).setScrollFactor(0);
    this.createButton(this.game.config.width - 930, 100, 5).setScrollFactor(0);
    this.createButton(this.game.config.width - 1080, 100, 6).setScrollFactor(0);
  }

  createButton(x, y, typeButton) {
    let container = this.add.container(0, 0);
    let img = this.add.image(0, 0, "basic-button");
    container.add(img);
    container.setDataEnabled();
    if (typeButton == 0) {
      let imgd = this.add.image(0, 0, "b_d");
      container.data.set("typeobject", 0);
      container.add(imgd);
    } else if (typeButton == 1) {
      let imgd = this.add.image(0, 0, "b_dl");
      container.data.set("typeobject", 1);
      container.add(imgd);
    } else if (typeButton == 2) {
      let imgd = this.add.image(0, 0, "b_dr");
      container.data.set("typeobject", 2);
      container.add(imgd);
    } else if (typeButton == 3) {
      let imgd = this.add.image(0, 0, "b_ld");
      container.data.set("typeobject", 3);
      container.add(imgd);
    } else if (typeButton == 4) {
      let imgd = this.add.image(0, 0, "b_rd");
      container.data.set("typeobject", 4);
      container.add(imgd);
    } else if (typeButton == 5) {
      let imgd = this.add.image(0, 0, "b_r");
      container.data.set("typeobject", 5);
      container.add(imgd);
    } else {
      let imgd = this.add.image(0, 0, "b_l");
      container.data.set("typeobject", 6);
      container.add(imgd);
    }
    container.setSize(img.width, img.height);
    container.setInteractive();
    container.x = x;
    container.y = y;
    return container;
  }

  createRootType(numberType) {
    let container = this.add.container(0, 0);
    let array = [];
    // let size_x = 133;
    // let size_y = 399;
    if (numberType == 0) {
      let img1 = this.add.image(0, 0, "down");
      let img2 = this.add.image(0, 133, "down");
      let img3 = this.add.image(0, 266, "down");
      array.push(img1, img2, img3);
    } else if (numberType == 1) {
      let img1 = this.add.image(0, 0, "down");
      let img2 = this.add.image(0, 133, "down");
      let img3 = this.add.image(0, 266, "down");
      let img4 = this.add.image(-133, 266, "down");
      //size_x = 266;
      array.push(img1, img2, img3, img4);
    } else if (numberType == 2) {
      let img1 = this.add.image(0, 0, "down");
      let img2 = this.add.image(0, 133, "down");
      let img3 = this.add.image(0, 266, "down");
      let img4 = this.add.image(133, 266, "down");
      //size_x = 266;
      array.push(img1, img2, img3, img4);
    } else if (numberType == 3) {
      let img1 = this.add.image(0, 0, "down");
      let img2 = this.add.image(-133, 0, "down");
      let img3 = this.add.image(-133, 133, "down");
      let img4 = this.add.image(-133, 266, "down");
      array.push(img1, img2, img3, img4);
    } else if (numberType == 4) {
      let img1 = this.add.image(0, 0, "down");
      let img2 = this.add.image(133, 0, "down");
      let img3 = this.add.image(133, 133, "down");
      let img4 = this.add.image(133, 266, "down");
      array.push(img1, img2, img3, img4);
    } else if (numberType == 5) {
      let img1 = this.add.image(0, 0, "down");
      let img2 = this.add.image(133, 0, "down");
      let img3 = this.add.image(266, 0, "down");
      array.push(img1, img2, img3);
    } else {
      let img1 = this.add.image(0, 0, "down");
      let img2 = this.add.image(-133, 0, "down");
      let img3 = this.add.image(-266, 0, "down");
      array.push(img1, img2, img3);
    }

    container.add(array);
    //container.setSize(size_x, size_y);
    //container.setInteractive();
    return container;
  }

  createRootRandom() {
    let random = Phaser.Math.Between(0, 2);
    let container = this.createRootType(random);
    return container;
  }

  spawnRoots(gridX, gridY, typeObject) {
    let root = this.createRootType(typeObject);
    let pos = this.getPositionFromGrid(gridX, gridY);
    let newGrid = this.addGridBaseTypeRoot(gridX, gridY, typeObject);
    root.setPosition(pos.x, pos.y);
    this.lastGridRoot.x = newGrid.x;
    this.lastGridRoot.y = newGrid.y;
    this.objectToFollow.x = pos.x;
    this.objectToFollow.y = pos.y;
  }

  onClickButton(pointer, gameObject, event) {
    //console.log(gameObject.data.get("typeobject"));
    let typeObject = gameObject.data.get("typeobject");
    this.spawnRoots(this.lastGridRoot.x, this.lastGridRoot.y, typeObject);
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
