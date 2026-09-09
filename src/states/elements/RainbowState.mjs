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

export type RainbowProps = Readonly<[x: number, y: number, level?: number]>

export class RainbowState extends BaseState {
  x: number
  y: number

  level: number
  opacity: number

  constructor (props: RainbowProps) {
    super()

    this.x = props[0]
    this.y = props[1]

    this.level = props[2] ?? 0
    this.opacity = 1
  }

  render () {
    setLine(size)

    const earned = this.level >> 0
    const progress = this.level % 1

    for (let i = 0; i < 7; ++i) {
      setColor((earned > i ? RAINBOW_PALETTE : monochrome)[i], this.opacity)
      arc('line', this.x, this.y, 86 - i * size, 180, 360)
    }

    if (progress !== 0) {
      setColor(RAINBOW_PALETTE[earned])
      arc('line', this.x, this.y, 86 - earned * size, 180, 180 * (1 + progress))
    }

    setLine(1)
  }
}
