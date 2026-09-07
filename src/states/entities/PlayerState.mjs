/* @flow */

import { FRAMES } from '../../constants.mjs'
import { FrontShootingStatus } from '../../statuses/FrontShootingStatus.mjs'
import { StateMachine } from '../StateMachine.mjs'
import { CharacterState } from './archetypes/CharacterState.mjs'
import { PlayerIdleState } from './characters/PlayerIdleState.mjs'
import { PlayerWalkState } from './characters/PlayerWalkState.mjs'
import type { EntityProps } from './EntityState.mjs'

export class PlayerState extends CharacterState<'idle' | 'walk'> {
  scores: number

  constructor (props: EntityProps) {
    super([props[0], props[1], 19, 32])

    this.animations = this.genAnimations(FRAMES.player)
    this.currentAnimation = this.animations[0]

    this.hp = 3
    this.hpMax = 3
    this.scores = 0

    this.state = new StateMachine({
      idle: () => new PlayerIdleState(this),
      walk: () => new PlayerWalkState(this)
    }).change('idle')

    this.statuses.push(new FrontShootingStatus([0.4, 0, -90]))
  }
}
