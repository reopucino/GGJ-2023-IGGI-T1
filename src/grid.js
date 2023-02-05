class GridInGame {
  constructor() {
    this.bg = [];
    this.fg = [];
    this.fog = [];
  }
  /**
   *
   * @param {*} x
   * @param {*} y
   * @param {number} gridType 0 bg, 1 fg, 2 fog | othernum
   * @param {*} fillNumber
   */
  chargeGrid(x, y, gridType, fillNumber) {
    if (gridType == 0) {
      this.bg[x][y] = fillNumber;
    } else if (gridType == 1) {
      this.fg[x][y] = fillNumber;
    } else {
      this.fog[x][y] = fillNumber;
    }
  }
  /**
   *
   * @param {*} y
   * @param {number} gridType 0 bg, 1 fg, 2 fog  | othernum
   * @param {*} fillNumber
   */
  fillGrid(y, gridType, fillNumber) {
    let _num = [];
    for (let i = 0; i < 20; i++) {
      _num.push(fillNumber);
    }
    if (gridType == 0) {
      this.bg[y] = _num;
    } else if (gridType == 1) {
      this.fg[y] = _num;
    } else {
      this.fog[y] = _num;
    }
  }
}

export default GridInGame;
