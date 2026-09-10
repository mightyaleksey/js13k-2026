/* @flow */

import {
  CAMERA_SPEED,
  MOVEMENT_KEYS,
  PLAYER_SPEED,
  UNIT_VECTORS
} from '../../../constants.mjs'
import { Keys } from '../../../engine.mjs'
import type { PlayerState } from '../PlayerState.mjs'
import { PlayerIdleState } from './PlayerIdleState.mjs'

export class PlayerWalkState extends PlayerIdleState<PlayerState> {
  enter () {
    const entity = this.entity
    entity.dx = 0
    entity.dy = 0
    entity.changeAnimation(1)
  }

  update (delta: number) {
    const entity = this.entity
    const direction = MOVEMENT_KEYS.findIndex((key) => Keys.wasHolding(key)) % 4
    const touch = entity.getTouchOffset()

    if (direction > -1) {
      entity.dx = UNIT_VECTORS[direction][0] * PLAYER_SPEED
      entity.dy =
        UNIT_VECTORS[direction][1] * PLAYER_SPEED +
        (entity.camera.isMoving ? -CAMERA_SPEED : 0)
    } else if (touch != null) {
      entity.dx = touch[0] * PLAYER_SPEED
      entity.dy =
        touch[1] * PLAYER_SPEED + (entity.camera.isMoving ? -CAMERA_SPEED : 0)
    } else {
      entity.changeState('idle')
    }
  }
}
