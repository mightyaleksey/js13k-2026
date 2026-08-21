/* @flow */

import { PROJECTILE_SPEED } from '../../constants.mjs'
import { rect, setColor } from '../../engine.mjs'
import { pixel } from '../../libs/render.mjs'
import { StateMachine } from '../StateMachine.mjs'
import type { EntityProps } from './EntityState.mjs'
import { EntityState } from './EntityState.mjs'

export type ProjectileProps = Readonly<{ x: number, y: number, a: number }>

export class ProjectileState extends EntityState<any> {
  constructor (props: ProjectileProps) {
    super({ x: props.x, y: props.y, width: 4, height: 4 })

    // tg(a) = y/x
    const angle = (props.a * Math.PI) / 180
    this.dx = Math.floor(Math.cos(angle) * PROJECTILE_SPEED)
    this.dy = Math.floor(Math.sin(angle) * PROJECTILE_SPEED)
  }

  render () {
    super.render()

    setColor('#ade1ef')
    pixel(this.x, this.y)
  }
}
