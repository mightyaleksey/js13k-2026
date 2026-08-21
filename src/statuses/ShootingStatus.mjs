/* @flow */

import type { PlayerState } from '../states/entities/PlayerState.mjs'
import { ProjectileState } from '../states/entities/ProjectileState.mjs'
import { BaseStatus } from './BaseStatus.mjs'

export class ShootingStatus extends BaseStatus {
  onTick (target: PlayerState) {
    const projectile = new ProjectileState({
      x: target.x + 0.5 * target.width - 2,
      y: target.y - 4,
      a: -90
    })

    projectile.entities = target.entities
    projectile.entities.list.push(projectile)
  }
}
