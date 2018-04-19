import Phaser from 'phaser'
import { GameScene } from './scenes/gameScene'

const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  parent: 'content',
  scene: [
    GameScene
  ]
}

const game = new Phaser.Game(config)  // eslint-disable-line no-unused-vars