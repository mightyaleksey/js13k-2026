/* @flow */

import { CAMERA_SPEED, MOVEMENT_KEYS } from '../../../constants.mjs'
import { Keys } from '../../../engine.mjs'
import { BaseState } from '../../BaseState.mjs'
import type { PlayerState } from '../PlayerState.mjs'

export class PlayerIdleState<T extends PlayerState> extends BaseState {
  entity: T

  constructor (entity: T) {
    super()
    this.entity = entity
  }

  enter () {
    const entity = this.entity
    entity.dx = 0
    entity.dy = 0
    entity.changeAnimation(0)
  }

  update (delta: number) {
    const entity = this.entity
    const direction = MOVEMENT_KEYS.findIndex((key) => Keys.wasHolding(key)) % 4
    const touch = entity.getTouchOffset()

    if (direction > -1 || touch != null) {
      entity.changeState('walk')
    }

    entity.dy = entity.camera.isMoving ? -CAMERA_SPEED : 0
  }
}
