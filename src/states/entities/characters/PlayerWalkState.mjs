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
  update (delta: number) {
    const direction = MOVEMENT_KEYS.findIndex((key) => Keys.wasHolding(key)) % 4
    const entity = this.entity

    if (direction > -1) {
      entity.dx = UNIT_VECTORS[direction][0] * PLAYER_SPEED
      entity.dy =
        UNIT_VECTORS[direction][1] * PLAYER_SPEED +
        (entity.camera.isMoving ? -CAMERA_SPEED : 0)
    } else {
      entity.changeState('idle')
    }
  }
}
