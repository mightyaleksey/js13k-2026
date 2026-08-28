/* @flow */

import { PROJECTILE_SPEED } from '../../constants.mjs'
import { setColor } from '../../engine.mjs'
import { pixel } from '../../libs/render.mjs'
import { EntityState } from './EntityState.mjs'

export type ProjectileProps = Readonly<[x: number, y: number, a: number]>

export class ProjectileState extends EntityState<> {
  constructor (props: ProjectileProps) {
    super([props[0], props[1], 4, 4])

    // tg(a) = y/x
    const angle = (props[2] * Math.PI) / 180
    this.dx = Math.floor(Math.cos(angle) * PROJECTILE_SPEED)
    this.dy = Math.floor(Math.sin(angle) * PROJECTILE_SPEED)
  }

  render () {
    super.render()

    setColor('#ade1ef')
    pixel(this.x, this.y)
  }
}
