/* @flow */

import { PROJECTILE_SIZE, PROJECTILE_SPEED } from '../../constants.mjs'
import { setColor } from '../../engine.mjs'
import { pixel } from '../../libs/render.mjs'
import { EntityState } from './EntityState.mjs'

export type ProjectileProps = Readonly<
  [x: number, y: number, angle: number, offset?: number]
>

export class ProjectileState extends EntityState<> {
  constructor (props: ProjectileProps) {
    super([props[0], props[1], PROJECTILE_SIZE, PROJECTILE_SIZE])
    this.directByAngle(props[2], PROJECTILE_SPEED)
    if (props[3] != null)
      this.shiftByAngle(props[2], props[3] + PROJECTILE_SIZE)
  }

  render () {
    super.render()

    setColor('#ade1ef')
    pixel(this.x, this.y)
  }
}
