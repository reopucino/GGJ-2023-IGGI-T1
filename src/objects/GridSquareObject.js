class GridSquare extends Phaser.GameObjects.Image {
  // type di sini berupa integer.
  // anggaplah 0 untuk grid kosong, 1 untuk yg berisi
  // dan semacamnya.
  // atau kalo mo dipake untuk layer yg atas,
  // 0 itu bisa artinya gelap, 1 setengah gelap,
  // 2 terang.
  constructor(type, texture, x = 0, y = 0, scene) {
    super(scene, x, y, texture);
    this.x = x;
    this.y = y;
    this.type = type;
    this.image = texture;
    this.setTexture(this.image);

    this.addToDisplayList(scene.DisplayList);
  }
}

class Grid {
  // dalam hal ini, width dan height itu berapa kotak tinggi/lebar grid.
  // squareWidth dan squareHeight itu maksudnya tinggi dan lebar gambar yg dipake.
  // x dan y itu untuk offset grid kita ke kanan dan ke bawah.
  constructor(x, y, width, height, squareWidth, squareHeight, imageList) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.squareWidth = squareWidth;
    this.squareHeight = squareHeight;
    this.grid = [];
    this.imageList = imageList;
  }

  constructGrid(scene) {
    for (let i = 0; i < this.height; i++) {
      this.grid.push([]);
      for (let j = 0; j < this.width; j++) {
        this.grid[i].push(
          new GridSquare(
            0,
            this.imageList[0],
            this.x + j * this.squareWidth,
            this.y + i * this.squareHeight,
            scene
          )
        );
      }
    }
  }

  // seperti biasa, untuk scene masukkan scene yg sedang aktif, a.k.a. 'this'
  updateVisual(scene) {
    this.grid.forEach((eX, i) => {
      eX.forEach((eY, j) => {
        eY.image = this.imageList[eY.type];
        eY.setTexture(eY.image);
      });
    });
  }
}

export { Grid, GridSquare };
