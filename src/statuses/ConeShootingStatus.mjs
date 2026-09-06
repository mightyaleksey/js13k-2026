/* @flow */

import { S_CONE_DURATION, S_CONE_INTERVAL } from '../constants.mjs'
import type { BossState } from '../states/entities/BossState.mjs'
import { ProjectileState } from '../states/entities/ProjectileState.mjs'
import { BaseStatus } from './BaseStatus.mjs'

export class ConeShootingStatus extends BaseStatus<BossState> {
  count: number

  constructor () {
    super([S_CONE_INTERVAL, S_CONE_DURATION])
    this.count = 4
  }

  onTick (target: BossState) {
    const da = 90 / (this.count - 1)
    for (let angle = 45; angle <= 135; angle += da) {
      const projectile = new ProjectileState([
        target.centerX(),
        target.centerY(),
        angle,
        0.6 * Math.max(target.width, target.height)
      ])

      target.entities.append(projectile)
    }
  }
}
