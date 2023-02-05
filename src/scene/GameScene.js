import Phaser from "phaser";
import { FollowCam } from "../objects/FollowCam";
import GridInGame from "../grid";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("game");
  }
  create() {
    this.createProps();
    this.createTileMap();
    this.createCharacter();
    const mouse = this.add.sprite(0, 0, "anim_mouse", 0).setOrigin(0);
    this.anims.create({
      key: "showMouse",
      frames: this.anims.generateFrameNumbers("anim_mouse", { frames: [0, 1, 2, 3] }),
      repeat: -1,
      frameRate: 4,
      //repeat: true,
    });
    mouse.play("showMouse");

    const animsTermit = this.add.sprite(16, 0, "anim_termit").setOrigin(0);
    this.anims.create({
      key: "playTermit",
      frames: this.anims.generateFrameNumbers("anim_termit", { frames: [0, 1, 2] }),
      repeat: -1,
      frameRate: 4,
    });
    animsTermit.play("playTermit");

    this.createStartPoint();
    //zoom camera
    //best zoom = 4
    this.cameras.main.setZoom(4);
    //width = 320
    //height = xxx

    //scrollcode
    //this.cameras.main.x = 360;//refer to scroll
    //this.cameras.main.y = 640;
    this.cameras.main.scrollX = -270; //320
    this.cameras.main.scrollY = -520; //640
    //this.cameras.main.scrollY = 2;
    //this.cameras.main.pan(128, 0);

    this.createUI();
    //only spawn 3 uis

    //event listerner
    this.input.on("gameobjectdown", this.onClickButton, this);
  }
  update() {}

  createTileMap() {
    this.grid = new GridInGame();
    let levelEmpty = [
      18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18,
    ];
    let dirtUp = [17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17];
    let dirtroots = [
      22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
    ];
    let fogCover = [23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23];
    var l = [];
    for (var i = 0; i < 20; i++) {
      l.push(18);
    }
    // console.log(l);
    this.grid.bg.push(levelEmpty);
    this.grid.bg.push(levelEmpty);
    this.grid.bg.push(levelEmpty);
    this.grid.bg.push(dirtUp);
    for (let index = 0; index < 20; index++) {
      this.grid.bg.push(dirtroots);
    }

    var map = this.make.tilemap({ data: this.grid.bg, tileWidth: 16, tileHeight: 16 });
    var tiles = map.addTilesetImage("bg-fg");
    var layer = map.createLayer(0, tiles, 0, 0);
    //var layer2 = map.createLayer(1, ties)
  }

  createOLD() {
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
    this.lastGridRoot = { x: 5, y: 1 };
    //grid.bg.pus;
  }

  createStartPoint() {
    //this.add.image(110 + 4 * 133, 3 * 133, "red");
    this.add.sprite(80, 64, "roots", 7).setOrigin(0, 0);
  }

  //return point
  getPositionFromGrid(x, y) {
    let _x = x * 16;
    let _y = 64 + y * 16; //start with 64
    return { x: _x, y: _y };
  }

  addGridBaseTypeRoot(x, y, typeobject) {
    var _x = x;
    var _y = y;
    if (typeobject == 0) {
      _y += 3;
    } else if (typeobject == 1) {
      _x += 1;
      _y += 3;
    } else if (typeobject == 2) {
      _x += 1;
      _y += 3;
    } else if (typeobject == 3) {
      _x += -2;
      _y += 1;
    } else if (typeobject == 4) {
      _x += -1;
      _y += 3;
    } else if (typeobject == 5) {
      _x += -1;
      _y += 3;
    } else {
      _x += 2;
      _y += 1;
    }

    return { x: _x, y: _y };
  }

  createUI() {
    // this.createButton(this.game.config.width - 180, 100, 0).setScrollFactor(0);
    // this.createButton(this.game.config.width - 330, 100, 1).setScrollFactor(0);
    // this.createButton(this.game.config.width - 480, 100, 2).setScrollFactor(0);
    // this.createButton(this.game.config.width - 630, 100, 3).setScrollFactor(0);
    // this.createButton(this.game.config.width - 780, 100, 4).setScrollFactor(0);
    // this.createButton(this.game.config.width - 930, 100, 5).setScrollFactor(0);
    // this.createButton(this.game.config.width - 1080, 100, 6).setScrollFactor(0);

    // const jarak = 36; // 32 ukurun size + 4 constanta space
    // for (let i = 0; i < 7; i++) {
    //   var posx = (i + 1) * jarak;
    //   var posy = 128;
    //   this.createButtonPixel(posx, 128, i);
    // }
    this.createButtonPixel(32, 128, 3);
    this.createButtonPixel(64, 128, 4);
    this.createButtonPixel(96, 128, 5);
    this.createButtonPixel(128, 128, 6);
  }

  createButtonPixel(x, y, typeButton) {
    let container = this.add.container(x, y);
    container.setDataEnabled();
    container.data.set("typeobject", typeButton);
    let img = this.add.sprite(0, 0, "ui-direction", typeButton);
    container.add(img);
    container.setSize(32, 32);
    container.setInteractive();
    return container;
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
    let sizeX = 16;
    let sizeY = 16;
    // let size_x = 133;
    // let size_y = 399;
    if (numberType == 0) {
      let img1 = this.add.sprite(0, 0, "roots", 4).setOrigin(0);
      let img2 = this.add.sprite(0, sizeY * 1, "roots", 4).setOrigin(0);
      let img3 = this.add.sprite(0, sizeY * 2, "roots", 7).setOrigin(0);
      console.log("spawn thi");
      array.push(img1, img2, img3);
    } else if (numberType == 1) {
      let img1 = this.add.sprite(0, 0, "roots", 1).setOrigin(0);
      let img2 = this.add.sprite(sizeX * 1, sizeY * 0, "roots", 2).setOrigin(0);
      let img3 = this.add.sprite(sizeX * 1, sizeY * 1, "roots", 4).setOrigin(0);
      let img4 = this.add.sprite(sizeX * 1, sizeY * 2, "roots", 7).setOrigin(0);
      array.push(img1, img2, img3, img4);
    } else if (numberType == 2) {
      let img1 = this.add.sprite(0, 0, "roots", 4).setOrigin(0);
      let img2 = this.add.sprite(0, sizeY * 1, "roots", 4).setOrigin(0);
      let img3 = this.add.sprite(0, sizeY * 2, "roots", 3).setOrigin(0);
      let img4 = this.add.sprite(sizeX * 1, sizeY * 2, "roots", 6).setOrigin(0);
      array.push(img1, img2, img3, img4);
    } else if (numberType == 3) {
      let img1 = this.add.sprite(0, 0, "roots", 1).setOrigin(0);
      let img2 = this.add.sprite(sizeX * -1, 0, "roots", 1).setOrigin(0);
      let img3 = this.add.sprite(sizeX * -2, 0, "roots", 8).setOrigin(0);
      array.push(img1, img2, img3);
    } else if (numberType == 4) {
      let img1 = this.add.sprite(0, 0, "roots", 1).setOrigin(0);
      let img2 = this.add.sprite(sizeX * -1, 0, "roots", 0).setOrigin(0);
      let img3 = this.add.sprite(sizeX * -1, sizeY * 1, "roots", 4).setOrigin(0);
      let img4 = this.add.sprite(sizeX * -1, sizeY * 2, "roots", 7).setOrigin(0);
      array.push(img1, img2, img3, img4);
    } else if (numberType == 5) {
      let img1 = this.add.sprite(0, 0, "roots", 4).setOrigin(0);
      let img2 = this.add.sprite(0, sizeY * 1, "roots", 4).setOrigin(0);
      let img3 = this.add.sprite(0, sizeY * 2, "roots", 5).setOrigin(0);
      let img4 = this.add.sprite(sizeX * -1, sizeY * 2, "roots", 8).setOrigin(0);
      array.push(img1, img2, img3, img4);
    } else {
      let img1 = this.add.sprite(0, 0, "roots", 1).setOrigin(0);
      let img2 = this.add.sprite(sizeX * 1, 0, "roots", 1).setOrigin(0);
      let img3 = this.add.sprite(sizeX * 2, 0, "roots", 6).setOrigin(0);
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

  createCharacter() {
    this.add.image(72, 16, "char").setOrigin(0, 0);
  }

  spawnRoots(gridX, gridY, typeObject) {
    let root = this.createRootType(typeObject);
    let pos = this.getPositionFromGrid(gridX, gridY);
    let newGrid = this.addGridBaseTypeRoot(gridX, gridY, typeObject);
    root.setPosition(pos.x, pos.y);
    this.lastGridRoot.x = newGrid.x;
    this.lastGridRoot.y = newGrid.y;
    // this.objectToFollow.x = pos.x;
    // this.objectToFollow.y = pos.y;
  }

  onClickButton(pointer, gameObject, event) {
    console.log(gameObject.data.get("typeobject"));
    let typeObject = gameObject.data.get("typeobject");
    this.spawnRoots(this.lastGridRoot.x, this.lastGridRoot.y, typeObject);
  }

  startDrag(pointer, targets) {
    this.input.off("pointerroots", this.startDrag, this);
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
    this.input.on("pointerroots", this.startDrag, this);
    this.input.off("pointermove", this.doDrag, this);
    this.input.off("pointerup", this.stopDrag, this);
  }
}
