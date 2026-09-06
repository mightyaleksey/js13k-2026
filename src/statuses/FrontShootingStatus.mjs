/* @flow */

import { CAMERA_SPEED } from '../constants.mjs'
import type { EntityState } from '../states/entities/EntityState.mjs'
import { ProjectileState } from '../states/entities/ProjectileState.mjs'
import { BaseStatus } from './BaseStatus.mjs'

export type FrontShootingProps = Readonly<
  [interval: number, duration: number, angle: number]
>

export class FrontShootingStatus extends BaseStatus {
  angle: number

  constructor (props: FrontShootingProps) {
    super([props[0], props[1]])
    this.angle = props[2]
  }

  onTick (target: EntityState<>) {
    const projectile = new ProjectileState([
      target.centerX(),
      target.centerY(),
      this.angle,
      0.6 * target.height
    ])

    if (target.camera.isMoving) {
      projectile.dy += -CAMERA_SPEED
    }

    target.entities.append(projectile)
  }
}
