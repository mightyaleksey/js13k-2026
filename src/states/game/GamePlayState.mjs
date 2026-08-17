/* @flow */

import { TILE_SIZE } from '../../constants.mjs'
import { Dimentions } from '../../engine.mjs'
import { BaseState } from '../BaseState.mjs'
import { PlayerState } from '../entities/PlayerState.mjs'

export class GamePlayState extends BaseState {
  player: PlayerState

  enter () {
    this.player = new PlayerState({
      x: 0.5 * (Dimentions.width - TILE_SIZE),
      y: Dimentions.height - 2 * TILE_SIZE
    })
  }

  render () {
    this.player.render()
  }

  update (delta: number) {
    this.player.update(delta)
  }
}
