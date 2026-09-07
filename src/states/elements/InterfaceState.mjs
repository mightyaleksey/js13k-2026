/* @flow */

import { TILE_SIZE } from '../../constants.mjs'
import { Dimentions, rect, setColor } from '../../engine.mjs'
import { BaseState } from '../BaseState.mjs'
import type { PlayerState } from '../entities/PlayerState.mjs'

export type InterfaceProps = Readonly<[player: PlayerState]>

export class InterfaceState extends BaseState {
  player: PlayerState

  constructor (props: InterfaceProps) {
    super()
    this.player = props[0]
  }

  render () {
    const { hp, hpMax } = this.player
    const barSize = 0.1 * Dimentions.width

    setColor('#8d1c2c')
    rect('line', 0.5 * TILE_SIZE, Dimentions.height - TILE_SIZE, barSize, 4)
    rect(
      'fill',
      0.5 * TILE_SIZE,
      Dimentions.height - TILE_SIZE,
      Math.max((barSize * hp) / hpMax, 1),
      4
    )
  }
}
