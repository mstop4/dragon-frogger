import { Scene } from 'phaser'

export class GameScene extends Scene {
  constructor() {
    super({
      key: 'gameScene'
    })
  }

  preload() {
    this.load.image('background', 'assets/background.png')
  }

  create() {
    let bg = this.add.sprite(0, 0, 'background')
    bg.setOrigin(0,0)
  }
}