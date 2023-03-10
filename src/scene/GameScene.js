import Phaser from "phaser";
import { FollowCam } from "../objects/FollowCam";
import GridInGame from "../grid";
import { SETTINGS } from "../const";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("game");
  }
  create() {
    this.createProps();
    this.createTileMap();
    this.createCharacter();
    this.createStartPoint();

    this.createAnimation();

    this.spawnObsAndPowerup(4);
    this.spawnObsAndPowerup(8);
    //this.testingTileSprite();

    this.objectToFollow = this.add
      .sprite(SETTINGS.WIDHT * 41.5, 64, "anim_mouse", 0)
      .setOrigin(0.5, 0);
    this.objectToFollow.visible = false;
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
    this.bgSky = this.add.tileSprite(0, -96, 1280, 160, "bg-fg", 18).setOrigin(0);
    this.firstGround = this.add.tileSprite(0, 48, 1280, 16, "bg-fg", 17).setOrigin(0);
    this.floorGround = this.add.tileSprite(0, 64, 1280, 1280, "bg-fg", 22).setOrigin(0);
  }

  /**
   * not use for now, maybe for next update??
   */
  createMapUsingGrid() {
    this.grid = new GridInGame(); //for next update
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
  }

  createProps() {
    this.lastGridRoot = { x: 41, y: 1 };
    this.depth = 1;
    this.health = 100;
    this.lastContainerRoots = null;
    this.currentGridSpawnGenerator = 8;
  }

  createStartPoint() {
    const POS_GRID_X = 41 * SETTINGS.WIDHT;
    this.lastContainerRoots = this.add.sprite(POS_GRID_X, 64, "roots", 7).setOrigin(0, 0);
  }

  createAnimation() {
    this.anims.create({
      key: "showMouse",
      frames: this.anims.generateFrameNumbers("anim_mouse", { frames: [0, 1, 2, 3] }),
      repeat: -1,
      frameRate: 6,
      //repeat: true,
    });

    this.anims.create({
      key: "playTermit",
      frames: this.anims.generateFrameNumbers("anim_termit", { frames: [0, 1, 2] }),
      repeat: -1,
      frameRate: 5,
    });
  }

  spawnObsAndPowerup(addition_grid_y) {
    //cheatobs
    let array = [];

    do {
      let random = Phaser.Math.Between(0, 80);
      if (this.passArrayCompare(array, random)) {
        array.push(random);
      }
    } while (array.length < 4);
    //console.log(array);
    let grid_y = 7 + addition_grid_y;
    for (let i = 0; i < array.length; i++) {
      let grid_x = array[i];
      let texture = i == 0 ? "anim_mouse" : "anim_termit";
      if (i < 2) {
        let obj = this.add
          .sprite(grid_x * SETTINGS.WIDHT, grid_y * SETTINGS.HEIGHT, texture, 0)
          .setOrigin(0);
        let animationName = i == 0 ? "showMouse" : "playTermit";
        obj.play(animationName);
      } else {
        if (i == 3) {
          this.add
            .tileSprite(
              grid_x * SETTINGS.WIDHT,
              grid_y * SETTINGS.HEIGHT,
              SETTINGS.WIDHT,
              SETTINGS.HEIGHT,
              "bg-fg",
              5
            )
            .setOrigin(0)
            .setDepth(0);
        } else {
          let random = Phaser.Math.Between(0, 3);
          let widthTile = SETTINGS.WIDHT;
          let heightTile = SETTINGS.HEIGHT;
          let frameTexture = 0;
          if (random == 1) {
            widthTile = 2 * SETTINGS.WIDHT;
            heightTile = 2 * SETTINGS.HEIGHT;
            //frameTexture = 1;
          } else if (random == 2 || random == 3) {
            widthTile = 2 * SETTINGS.WIDHT;
            //frameTexture = Phaser.Utils.Array.GetRandom([3, 8]);
          }
          this.add
            .tileSprite(
              grid_x * SETTINGS.WIDHT,
              grid_y * SETTINGS.HEIGHT,
              widthTile,
              heightTile,
              "bg-fg",
              frameTexture
            )
            .setOrigin(0)
            .setDepth(0);
        }
      }
      grid_y++;
    }
  }

  passArrayCompare(array, numberCompare) {
    for (let i = 0; i < array.length; i++) {
      let num = array[i];
      if (this.spaceBetween(numberCompare, num) < 4) {
        return false;
      }
    }
    return true;
  }

  spaceBetween(a, b) {
    return Math.abs(a - b);
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
      _y += 3; //should be 2
    } else if (typeobject == 2) {
      _x += 1;
      _y += 3; //should be 2
    } else if (typeobject == 3) {
      _x += -2;
      _y += 1;
    } else if (typeobject == 4) {
      _x += -1;
      _y += 3; //should be 2
    } else if (typeobject == 5) {
      _x += -1;
      _y += 3; //should be 2
    } else {
      _x += 2;
      _y += 1;
    }

    return { x: _x, y: _y };
  }

  createUI() {
    let btn1 = this.createButtonPixel(55, 280, 3).setScrollFactor(0).setDepth(1);
    let btn2 = this.createButtonPixel(90, 280, 0).setScrollFactor(0).setDepth(1);
    let btn3 = this.createButtonPixel(125, 280, 6).setScrollFactor(0).setDepth(1);
    //this.createButtonPixel(128, 128, 6).setScrollFactor(0);

    this.groupButton = this.add.group([btn1, btn2, btn3]);

    //create text UI
    let currentHealth = "life energy : " + this.health;
    this.textHealth = this.add.text(0, 0, currentHealth).setScrollFactor(0).setDepth(1);

    let deep = "depth : " + this.depth + " m";
    this.textDepth = this.add.text(0, 16, deep).setScrollFactor(0).setDepth(1);
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

    container.setDataEnabled();

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
    let healthReduce =
      numberType == 1 || numberType == 2 || numberType == 4 || numberType == 5 ? 4 : 3;
    container.data.set("reduce-health", healthReduce);

    container.add(array);
    return container;
  }

  createRootRandom() {
    let random = Phaser.Math.Between(0, 2);
    let container = this.createRootType(random);
    return container;
  }

  createCharacter() {
    const posGridChar = 40 * SETTINGS.WIDHT + 8;
    this.add.image(posGridChar, 16, "char").setOrigin(0, 0);
  }

  spawnRoots(gridX, gridY, typeObject) {
    let root = this.createRootType(typeObject);
    let pos = this.getPositionFromGrid(gridX, gridY);
    let newGrid = this.addGridBaseTypeRoot(gridX, gridY, typeObject);
    root.setPosition(pos.x, pos.y);
    if (newGrid.x < 0) newGrid.x = 0;
    else if (newGrid.x > 79) newGrid.x = 79;
    this.lastGridRoot.x = newGrid.x;
    this.lastGridRoot.y = newGrid.y;
    this.depth = this.lastGridRoot.y;
    var reduceHealth = root.data.get("reduce-health");

    this.health -= reduceHealth;

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

    //update the text
    let deep = "depth : " + this.depth + " m";
    this.textDepth.setText(deep);

    let currentHealth = "life energy : " + this.health;
    this.textHealth.setText(currentHealth);

    if (this.health < 0) {
      this.gameOver();
    }

    //play placement
    this.sound.play("placement");
  }

  onClickButton(pointer, gameObject, event) {
    let typeObject = gameObject.data.get("typeobject");
    this.spawnRoots(this.lastGridRoot.x, this.lastGridRoot.y, typeObject);

    //itterate group button data object
    //change the button rules
    let random = 0;
    let arrayDataObject = this.getButtonsDataObject();
    do {
      random = Phaser.Math.Between(0, 6);
    } while (
      random == arrayDataObject[0] ||
      random == arrayDataObject[1] ||
      random == arrayDataObject[2]
    );
    gameObject.data.set("typeobject", random);
    let childObject = gameObject.getAt(0);
    childObject.setFrame(random);

    this.currentGridSpawnGenerator += 4;
    this.spawnObsAndPowerup(this.currentGridSpawnGenerator);
  }

  /**
   *
   * @returns Array
   */
  getButtonsDataObject() {
    let array = [];
    this.groupButton.children.iterate(function (btn) {
      let data = btn.data.get("typeobject");
      array.push(data);
    });

    return array;
  }

  gameOver() {
    //hide UI just show text gameover and button restart
    this.add.text(90, 120, "GAME OVER").setScrollFactor(0).setOrigin(0.5);

    //disable button
    this.groupButton.children.iterate(function (btn) {
      btn.disableInteractive();
      btn.visible = false;
    });
    this.sound.play("gameover");

    //this.input.on("pointerdown", this.restartGame, this);
  }

  restartGame() {
    this.input.off("pointerdown", this.restartGame, this);
    this.scene.restart();
  }

  testanimationandsprite() {
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
  }
  testingTileSprite() {
    this.add.tileSprite(42 * SETTINGS.WIDHT, 7 * SETTINGS.HEIGHT, 32, 32, "bg-fg");
  }
}
