/* @flow */

import { rect, setColor } from '../../engine.mjs'
import { pixel } from '../../libs/render.mjs'
import { StateMachine } from '../StateMachine.mjs'
import type { EntityProps } from './EntityState.mjs'
import { EntityState } from './EntityState.mjs'

export class MinionState extends EntityState<'idle' | 'walk'> {
  render () {
    setColor('#ffadad')
    pixel(this.x, this.y)
    pixel(this.x, this.y + 4)
    pixel(this.x, this.y + 8)

    pixel(this.x + 4, this.y + 4)
    pixel(this.x + 4, this.y + 8)
    pixel(this.x + 4, this.y + 12)

    pixel(this.x + 8, this.y + 4)
    pixel(this.x + 8, this.y + 8)
    pixel(this.x + 8, this.y + 12)

    pixel(this.x + 12, this.y)
    pixel(this.x + 12, this.y + 4)
    pixel(this.x + 12, this.y + 8)
  }

  onCollide (target, delta: number) {
    if (target instanceof MinionState) {
      this.dx = -this.dx
      this.dy = -this.dy
      this.update(delta)
    }
  }
}
