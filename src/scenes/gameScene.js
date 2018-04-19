import Phaser from 'phaser'

export class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'gameScene'
    })
  }

  init() {
    this.player = null
    this.playerSpeed = 1.5

    this.enemies = null
    this.enemyMaxY = 280
    this.enemyMinY = 80

    this.treasure = null
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
    Phaser.Actions.Call(this.enemies.getChildren(), (enemy) => {
      enemy.speed = Math.random() * 2 + 1
    }, this)
  }

  update() {
    // Player Input 
    if (this.input.activePointer.isDown) {
      this.player.x += this.playerSpeed
    }

    // Enemy Movement
    let _enemies = this.enemies.getChildren()

    _enemies.forEach((enemy) => {
      enemy.y += enemy.speed

      if ((enemy.y >= this.enemyMaxY && enemy.speed > 0) ||
          (enemy.y <= this.enemyMinY && enemy.speed < 0)) {
        enemy.speed *= -1
      }
    })

    // Treasure Collision
    if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.treasure.getBounds())) {
      this.gameOver()
    }
  }

  gameOver() {
    this.scene.restart()
  }
}