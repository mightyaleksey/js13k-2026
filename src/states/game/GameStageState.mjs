/* @flow */

import { FONT_HUGE, TILE_SIZE } from '../../constants.mjs'
import { Dimentions, printf, setColor, setFont } from '../../engine.mjs'
import { inCubic, outCubic } from '../../libs/easing.mjs'
import { TransitionState } from '../elements/TransitionState.mjs'

export class GameStageState extends TransitionState {
  level: number
  cb: ?() => void

  textY: number

  enter (input: unknown) {
    // $FlowFixMe[incompatible-use]
    this.level = input?.[0] ?? 0
    // $FlowFixMe[incompatible-use]
    this.cb = input?.[1]

    this.textY = -2 * TILE_SIZE

    this.setTransition(0.4, { textY: 0.5 * Dimentions.height }, outCubic)
    this.setTransition(0.2, {})
    this.setTransition(
      0.4,
      { textY: Dimentions.height + 2 * TILE_SIZE },
      inCubic
    )
    this.setTransitionEnd(this.cb)
  }

  render () {
    setColor('#fff')
    setFont(FONT_HUGE)
    printf(`Level ${this.level + 1}`, 0, this.textY, Dimentions.width, 'center')
  }
}
