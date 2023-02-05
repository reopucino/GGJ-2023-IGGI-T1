import { Grid, GridSquare } from "../objects/GridSquareObject";
import { FollowCam } from "../objects/FollowCam";
import { Obstacle, ProcGen } from "ProcGen";

export class TestScene extends Phaser.Scene {
  constructor() {
    super("test");
    this.offsetX = 150;
    this.offsetY = 250;
  }

  preload() {
    this.load.image("tree", "../../assets/tree.png");
    this.load.image("grid_empty", "../../assets/grid_empty.png");
    this.load.image("grid_filled", "../../assets/grid_filled.png");
  }

  create() {
    this.grid = new Grid(this.offsetX, this.offsetY, 9, 9, 64, 64, ["grid_empty", "grid_filled"]);
    console.log(this.grid);
    this.grid.constructGrid(this);
    console.log(this);

    this.procGen = new ProcGen(this.grid);
    this.bigRock = new Obstacle(2, 2, 5);

    this.tree = this.add.image(400, 128, "tree");
    this.target = this.add.image(500, 200, "grid_filled");
    this.key = this.input.keyboard.createCursorKeys();

    this.localCam = new FollowCam(0, 0, 800, 600, this.target, this);
    this.localCam.replaceMain();

    console.log(this.procGen.grid);

    // this.procGen.spawnObstacle(this.bigRock, 3, 6);
    // this.procGen.spawnObstacle(this.bigRock, 6, 3);
    // this.procGen.spawnObstacle(this.bigRock, 4, 5);
    // this.procGen.spawnObstacle(this.bigRock, 7, 8);
    this.procGen.generateOnGrid(this.bigRock);
  }

  update() {
    if (this.key.left.isDown) {
      this.target.x -= 10;
    } else if (this.key.right.isDown) {
      this.target.x += 10;
    }
    if (this.key.up.isDown) {
      this.target.y -= 10;
    } else if (this.key.down.isDown) {
      this.target.y += 10;
    }

    this.grid.grid[2][6].type = 1;

    this.grid.updateVisual(this);
  }
}
