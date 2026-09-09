/* @flow */

import { TILE_SIZE } from '../../constants.mjs'
import {
  circle,
  Dimentions,
  line,
  printf,
  rect,
  setColor,
  setFont,
  shape
} from '../../engine.mjs'
import { inCubic, outCubic } from '../../libs/easing.mjs'
import { RainbowState } from '../elements/RainbowState.mjs'
import { TransitionState } from '../elements/TransitionState.mjs'

const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet']

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
    printf(`Level ${this.level + 1}`, 0, this.textY, Dimentions.width, 'center')
  }
}
