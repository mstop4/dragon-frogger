import phaser from 'phaser'

export class GameScene extends phaser.Scene {
  constructor() {
    super({
      key: 'gameScene'
    })
  }

  preload() {
    this.load.image('background', 'assets/background.png')
  }

  create() {
    this.add.sprite(0, 0, 'background')
  }
}