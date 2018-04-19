import { Scene } from 'phaser'

export class GameScene extends Scene {
  constructor() {
    super({
      key: 'gameScene'
    })

    this.player = null
  }

  preload() {
    this.load.image('background', 'assets/background.png')
    this.load.image('player', 'assets/player.png')
    this.load.image('dragon', 'assets/dragon.png')
    this.load.image('treasure', 'assets/treasure.png')
  }

  create() {
    let bg = this.add.sprite(0, 0, 'background')
    bg.setOrigin(0,0)

    this.player = this.add.sprite(40, this.sys.game.config.height/2, 'player')
    this.player.setScale(0.5)
  }
}