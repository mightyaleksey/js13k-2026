/* @flow */

import { RAINBOW_PALETTE } from '../../constants.mjs'
import { arc, setColor, setLine } from '../../engine.mjs'
import { BaseState } from '../BaseState.mjs'

const size = 6
const monochrome = [
  '#717171',
  '#b9b9b9',
  '#d8d8d8',
  '#838383',
  '#9e9e9e',
  '#616161',
  '#494949'
]

export type RainbowProps = Readonly<[x: number, y: number, filled?: number]>

export class RainbowState extends BaseState {
  x: number
  y: number

  filled: number

  constructor (props: RainbowProps) {
    super()

    this.x = props[0]
    this.y = props[1]

    this.filled = props[2] ?? 0
  }

  render () {
    setLine(size)

    for (let i = 0; i < 7; ++i) {
      const color = (this.filled > i ? RAINBOW_PALETTE : monochrome)[i]
      setColor(color)
      arc('line', this.x, this.y, 86 - i * size, 180, 360)
    }

    setLine(1)
  }
}
