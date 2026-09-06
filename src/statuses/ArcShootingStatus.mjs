/* @flow */

import { CAMERA_SPEED, S_ARC_DURATION, S_ARC_INTERVAL } from '../constants.mjs'
import type { BossState } from '../states/entities/BossState.mjs'
import type { EntityState } from '../states/entities/EntityState.mjs'
import { ProjectileState } from '../states/entities/ProjectileState.mjs'
import { BaseStatus } from './BaseStatus.mjs'

const startAngle = 195
const finalAngle = -30

export class ArcShootingStatus extends BaseStatus<BossState> {
  angle: number

  constructor () {
    super([S_ARC_INTERVAL, S_ARC_DURATION])
    this.angle = startAngle
  }

  onTick (target: BossState) {
    for (let angle = this.angle; angle > this.angle - 45; angle -= 15) {
      const projectile = new ProjectileState([
        target.centerX(),
        target.centerY(),
        angle,
        0.6 * Math.max(target.width, target.height)
      ])

      target.entities.append(projectile)
    }

    this.angle -= 45
    if (this.angle === finalAngle) this.angle = startAngle
  }
}
