import Phaser from 'phaser'

export class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'gameScene'
    })
  }

  init() {
    this.player = null
    this.treasure = null
    this.enemies = null

    this.playerSpeed = 1.5
    this.enemyMaxY = 280
    this.enemyMinY = 80
  }

  preload() {
    this.load.image('background', 'assets/background.png')
    this.load.image('player', 'assets/player.png')
    this.load.image('dragon', 'assets/dragon.png')
    this.load.image('treasure', 'assets/treasure.png')
  }

  create() {
    // Background
    let bg = this.add.sprite(0, 0, 'background')
    bg.setOrigin(0,0)

    // Player
    this.player = this.add.sprite(40, this.sys.game.config.height/2, 'player')
    this.player.setScale(0.5)

    // Treasure
    this.treasure = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2, 'treasure')
    this.treasure.setScale(0.6)

    // Here be Dragons
    this.enemies = this.add.group({
      key: 'dragon',
      repeat: 5,
      setXY: {
        x: 110,
        y: 100,
        stepX: 80,
        stepY: 20
      }
    })
    Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5)
  }

  update() {
    // Player Input 
    if (this.input.activePointer.isDown) {
      this.player.x += this.playerSpeed
    }

    // Treasure Collision
    if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.treasure.getBounds())) {
      this.gameOver()
    }
  }

  gameOver() {
    this.scene.restart()
  }
}