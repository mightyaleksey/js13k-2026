/* @flow */

import { rect, setColor } from '../../../engine.mjs'
import type { EntityProps } from '../EntityState.mjs'
import { EntityState } from '../EntityState.mjs'

export type ProjectileProps = EntityProps

export class ProjectileState extends EntityState<> {
  render () {
    super.render()
    setColor('#ade1ef')
    rect('fill', this.x, this.y, this.width, this.height)
  }
}
