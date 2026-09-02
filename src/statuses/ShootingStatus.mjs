/* @flow */

import { CAMERA_SPEED } from '../constants.mjs'
import type { EntityState } from '../states/entities/EntityState.mjs'
import { ProjectileState } from '../states/entities/ProjectileState.mjs'
import { BaseStatus } from './BaseStatus.mjs'

export class ShootingStatus extends BaseStatus {
  onTick (target: EntityState<>) {
    const projectile = new ProjectileState([
      target.x + 0.5 * target.width - 2,
      target.y - 8,
      -90
    ])

    if (target.camera.isMoving) {
      projectile.dy += -CAMERA_SPEED
    }

    target.entities.append(projectile)
  }
}
