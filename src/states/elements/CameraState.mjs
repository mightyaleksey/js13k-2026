/* @flow */

import { CAMERA_SPEED } from '../../constants.mjs'
import { Dimentions, wasResized } from '../../engine.mjs'
import { updateAreas } from '../../helpers/viewport.mjs'
import { EntityState } from '../entities/EntityState.mjs'

export class CameraState extends EntityState {
  offsetX: number
  isMoving: boolean

  constructor () {
    super([0, -Dimentions.height, 0, 0, 0, -CAMERA_SPEED])

    this.offsetX = -0.5 * Dimentions.width
    this.isMoving = true
  }

  update (delta: number) {
    if (wasResized()) {
      this.offsetX = -0.5 * Dimentions.width
    }

    updateAreas(this.x, this.y)

    if (this.isMoving) {
      super.update(delta)
    }
  }
}
