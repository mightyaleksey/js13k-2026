/* @flow */

import { BaseState } from '../BaseState.mjs'
import { PlayerState } from '../entities/PlayerState.mjs'

export class GamePlayState extends BaseState {
  player: PlayerState

  enter () {
    this.player = new PlayerState()
  }

  render () {
    this.player.render()
  }

  update () {}
}
