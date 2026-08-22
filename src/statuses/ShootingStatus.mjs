/* @flow */

import type { EntityState } from '../states/entities/EntityState.mjs'
import { ProjectileState } from '../states/entities/ProjectileState.mjs'
import { BaseStatus } from './BaseStatus.mjs'

export class ShootingStatus extends BaseStatus {
  onTick (target: EntityState<>) {
    const projectile = new ProjectileState({
      x: target.x + 0.5 * target.width - 2,
      y: target.y - 4,
      a: -90
    })

    target.entities.append(projectile)
  }
}
