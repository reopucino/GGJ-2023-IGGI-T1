class FollowCam extends Phaser.Cameras.Scene2D.Camera {
  // objectToFollow adalah object yg ingin difollow camera. Dalam
  // hal ini akar. Untuk scene masukkan 'this' saja.
  constructor(x, y, width, height, objectToFollow, scene) {
    super(x, y, width, height);
    this.objectToFollow = objectToFollow;
    this.startFollow(this.objectToFollow, true, 0.1, 0.1);
    this.scene = scene;
  }

  replaceMain() {
    this.scene.cameras.cameras[0].visible = false;
    this.scene.cameras.addExisting(this, true);
  }
}

export { FollowCam };

// Jadi pada dasarnya:
// kameraBaru = new FollowCam(x, y, w, h, akar, this);
// kameraBaru.replaceMain(); untuk menggantikan kamera utama
