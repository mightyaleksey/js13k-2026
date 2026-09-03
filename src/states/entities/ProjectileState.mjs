/* @flow */

import { PROJECTILE_SPEED } from '../../constants.mjs'
import { setColor } from '../../engine.mjs'
import { pixel } from '../../libs/render.mjs'
import { EntityState } from './EntityState.mjs'

export type ProjectileProps = Readonly<[x: number, y: number, a: number]>

export class ProjectileState extends EntityState<> {
  constructor (props: ProjectileProps) {
    super([props[0], props[1], 4, 4])
    this.byAngle(props[2], PROJECTILE_SPEED)
  }

  render () {
    super.render()

    setColor('#ade1ef')
    pixel(this.x, this.y)
  }
}
