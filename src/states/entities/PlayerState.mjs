/* @flow */

import { rect, setColor } from '../../engine.mjs'
import { pixel } from '../../libs/render.mjs'
import { ShootingStatus } from '../../statuses/ShootingStatus.mjs'
import { StateMachine } from '../StateMachine.mjs'
import { PlayerIdleState } from './characters/PlayerIdleState.mjs'
import { PlayerWalkState } from './characters/PlayerWalkState.mjs'
import type { EntityProps } from './EntityState.mjs'
import { EntityState } from './EntityState.mjs'

export class PlayerState extends EntityState<'idle' | 'walk'> {
  constructor (props: EntityProps) {
    super(props)

    this.state = new StateMachine({
      idle: () => new PlayerIdleState(this),
      walk: () => new PlayerWalkState(this)
    }).change('idle')

    this.statuses.push(new ShootingStatus([0.2, 0]))
  }

  render () {
    setColor('#83ccd2')
    pixel(this.x, this.y + 4)
    pixel(this.x, this.y + 8)
    pixel(this.x, this.y + 12)

    pixel(this.x + 4, this.y)
    pixel(this.x + 4, this.y + 8)

    pixel(this.x + 8, this.y)
    pixel(this.x + 8, this.y + 8)

    pixel(this.x + 12, this.y + 4)
    pixel(this.x + 12, this.y + 8)
    pixel(this.x + 12, this.y + 12)
  }

  update (delta: number) {
    super.update(delta)
  }
}
