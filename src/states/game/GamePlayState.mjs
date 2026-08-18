/* @flow */

import { CAMERA_SPEED, TILE_SIZE } from '../../constants.mjs'
import { Dimentions, translate } from '../../engine.mjs'
import { BaseState } from '../BaseState.mjs'
import { PlayerState } from '../entities/PlayerState.mjs'

export class GamePlayState extends BaseState {
  cameraX: number
  cameraY: number

  player: PlayerState

  enter () {
    this.cameraX = 0
    this.cameraY = 0

    this.player = new PlayerState({
      x: 0.5 * (Dimentions.width - TILE_SIZE),
      y: Dimentions.height - 3 * TILE_SIZE
    })
  }

  render () {
    // emulate camera effect
    translate(-this.cameraX, -this.cameraY)
    // terrain
    // restore camera
    translate(this.cameraX, this.cameraY)

    this.player.render()
  }

  update (delta: number) {
    this.cameraY -= CAMERA_SPEED * delta
    this.player.update(delta)
  }
}
