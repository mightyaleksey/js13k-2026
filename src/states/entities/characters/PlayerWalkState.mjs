/* @flow */

import {
  MOVEMENT_KEYS,
  PLAYER_SPEED,
  UNIT_VECTORS
} from '../../../constants.mjs'
import { Keys } from '../../../engine.mjs'
import { BaseState } from '../../BaseState.mjs'
import type { PlayerState } from '../PlayerState.mjs'

export class PlayerWalkState<T extends PlayerState> extends BaseState {
  entity: T

  constructor (entity: T) {
    super()

    this.entity = entity
  }

  update (delta: number) {
    const direction = MOVEMENT_KEYS.findIndex((key) => Keys.wasHolding(key)) % 4
    const entity = this.entity

    if (direction > -1) {
      entity.dx = UNIT_VECTORS[direction][0] * PLAYER_SPEED
      entity.dy = UNIT_VECTORS[direction][1] * PLAYER_SPEED
    } else {
      entity.changeState('idle')
    }
  }
}
