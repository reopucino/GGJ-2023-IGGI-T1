class ProcGen {
  // obstacleList berupa array yang berisi obstacle, termasuk air.
  // tiap obstacle adalah instance dari class Obstacle di bawah
  // Grid adalah 2d array yg tiap kotaknya punya status keterisian.
  constructor(grid) {
    this.grid = grid;
  }

  getSpawnLottery(probability) {
    // probability dalam persen.
    let randomPercentage = Math.floor(Math.random() * 101);
    return probability >= randomPercentage;
  }

  // cek apakah ada space. Kalau terhalang kotak yg filled,
  // atau jatuhnya di luar grid, false, otherwise true.
  spaceIsAvailable(obstacle, Xcoord, Ycoord) {
    if (
      Xcoord + obstacle.width > this.grid.grid[0].length ||
      Ycoord + obstacle.height > this.grid.grid.length
    ) {
      return false;
    }
    for (let i = Ycoord; i < obstacle.height + Ycoord; i++) {
      for (let j = Xcoord; j < obstacle.width + Xcoord; j++) {
        if (this.grid.grid[i][j].type === 1) {
          return false;
        }
      }
    }

    return true;
  }

  // gunakan untuk obstacle spawning.
  spawnObstacle(obstacle, Xcoord, Ycoord) {
    if (this.getSpawnLottery(obstacle.probability)) {
      if (this.spaceIsAvailable(obstacle, Xcoord, Ycoord)) {
        for (let i = Ycoord; i < obstacle.height + Ycoord; i++) {
          for (let j = Xcoord; j < obstacle.width + Xcoord; j++) {
            this.grid.grid[i][j].type = 1;
          }
        }
      } else {
        console.log(this.spaceIsAvailable(obstacle, Xcoord, Ycoord));
        return;
      }
    }
  }

  generateOnGrid(obstacle) {
    for (let i = 0; i < this.grid.grid.length; i++) {
      for (let j = 0; j < this.grid.grid.length; j++) {
        this.spawnObstacle(obstacle, j, i);
      }
    }
  }
}

class Obstacle {
  constructor(width, height, probability) {
    this.width = width;
    this.height = height;
    this.probability = probability;
  }
}

export { ProcGen, Obstacle };
