/* @flow */

import { rect, setColor } from '../../engine.mjs'
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
  }

  enter () {}

  render () {
    setColor('#369')
    rect('fill', this.x, this.y, this.width, this.height)
  }

  update (delta: number) {
    super.update(delta)
  }
}
