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

    this.objectToFollow = this.add.sprite(16 * 11.5, 64, "anim_mouse", 0).setOrigin(0.5, 0);
    this.kameraBaru = new FollowCam(
      0,
      0,
      this.game.config.width,
      this.game.config.height,
      this.objectToFollow,
      this
    );
    this.kameraBaru.replaceMain();
    //zoom camera
    //best zoom = 4
    this.kameraBaru.setZoom(1);

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

  createProps() {
    this.lastGridRoot = { x: 11, y: 1 };
    this.lastContainerRoots = null;
    //grid.bg.pus;
  }

  createStartPoint() {
    //this.add.image(110 + 4 * 133, 3 * 133, "red");
    this.lastContainerRoots = this.add.sprite(176, 64, "roots", 7).setOrigin(0, 0);
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
    this.createButtonPixel(36, 300, 3).setScrollFactor(0);
    this.createButtonPixel(74, 300, 4).setScrollFactor(0);
    this.createButtonPixel(116, 300, 2).setScrollFactor(0);
    //this.createButtonPixel(128, 128, 6).setScrollFactor(0);
  }

  createButtonPixel(x, y, typeButton) {
    let container = this.add.container(x, y);
    container.setDataEnabled();
    container.data.set("typeobject", typeButton);
    let img = this.add.sprite(0, 0, "ui-direction", typeButton);
    container.add(img);
    container.setSize(32, 32);
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
    this.add.image(168, 16, "char").setOrigin(0, 0);
  }

  spawnRoots(gridX, gridY, typeObject) {
    let root = this.createRootType(typeObject);
    let pos = this.getPositionFromGrid(gridX, gridY);
    let newGrid = this.addGridBaseTypeRoot(gridX, gridY, typeObject);
    root.setPosition(pos.x, pos.y);
    this.lastGridRoot.x = newGrid.x;
    this.lastGridRoot.y = newGrid.y;

    //change image to link with other roots
    let typeLastObject = this.lastContainerRoots;
    if (typeLastObject.type == "Sprite") {
      this.lastContainerRoots.setFrame(4);
    } else {
      let LastContainerGameObject = this.lastContainerRoots.last;
      if (LastContainerGameObject.frame.name == "8") {
        LastContainerGameObject.setFrame(0);
      } else if (LastContainerGameObject.frame.name == "6") {
        LastContainerGameObject.setFrame(2);
      } else {
        LastContainerGameObject.setFrame(4);
      }
    }
    //change first root to linking
    let firstChildContainer = root.getAt(0);
    let moveCondition = "";
    if (typeObject == 0 || typeObject == 2 || typeObject == 5) {
      moveCondition = "down";
    } else if (typeObject == 1 || typeObject == 6) {
      moveCondition = "right";
    } else {
      moveCondition = "left";
    }
    if (moveCondition == "right") {
      firstChildContainer.setFrame(3);
    } else if (moveCondition == "left") {
      firstChildContainer.setFrame(5);
    }
    //change last container root
    this.lastContainerRoots = root;

    //camera follow
    this.objectToFollow.x = pos.x;
    this.objectToFollow.y = pos.y;
  }

  onClickButton(pointer, gameObject, event) {
    let typeObject = gameObject.data.get("typeobject");
    this.spawnRoots(this.lastGridRoot.x, this.lastGridRoot.y, typeObject);
  }
}
