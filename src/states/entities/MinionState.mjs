/* @flow */

import { rect, setColor } from '../../engine.mjs'
import { pixel } from '../../libs/render.mjs'
import { StateMachine } from '../StateMachine.mjs'
import { PlayerIdleState } from './characters/PlayerIdleState.mjs'
import { PlayerWalkState } from './characters/PlayerWalkState.mjs'
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
}
