/* @flow */

import { CAMERA_SPEED } from '../../constants.mjs'
import { Dimentions } from '../../engine.mjs'
import { EntityState } from '../entities/EntityState.mjs'

export class CameraState extends EntityState {
  isMoving: boolean

  constructor () {
    super([0, -Dimentions.height, 0, 0])

    this.dx = 0
    this.dy = -CAMERA_SPEED

    this.isMoving = true
  }

  update (delta: number) {
    if (this.isMoving) {
      super.update(delta)
    }
  }
}
