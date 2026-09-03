/* @flow */

import { CAMERA_SPEED } from '../constants.mjs'
import type { EntityState } from '../states/entities/EntityState.mjs'
import { ProjectileState } from '../states/entities/ProjectileState.mjs'
import { BaseStatus } from './BaseStatus.mjs'

export type ShootingProps = Readonly<
  [interval: number, duration: number, angle: number]
>

export class ShootingStatus extends BaseStatus {
  angle: number

  constructor (props: ShootingProps) {
    super([props[0], props[1]])
    this.angle = props[2]
  }

  onTick (target: EntityState<>) {
    const projectile = new ProjectileState([
      target.centerX(),
      this.angle < 0 ? target.y - 8 : target.y + target.height + 8,
      this.angle
    ])

    if (target.camera.isMoving) {
      projectile.dy += -CAMERA_SPEED
    }

    target.entities.append(projectile)
  }
}
