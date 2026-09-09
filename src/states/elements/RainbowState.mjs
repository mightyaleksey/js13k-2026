/* @flow */

import { RAINBOW_PALETTE, TILE_SIZE } from '../../constants.mjs'
import { arc, Dimentions, setColor, setLine } from '../../engine.mjs'
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

export type RainbowProps = Readonly<[level?: number]>

export class RainbowState extends BaseState {
  x: number
  y: number

  level: number
  opacity: number
  radius: number

  constructor (props: RainbowProps) {
    super()

    this.level = props[0] ?? 0
    this.opacity = 1
    this.radius = this.genRadius()

    this.x = 0.5 * Dimentions.width
    this.y = Math.max(0.35 * Dimentions.height, this.radius + TILE_SIZE)
  }

  render () {
    setLine(size)

    const earned = this.level >> 0
    const progress = this.level % 1
    const radius = this.radius

    for (let i = 0; i < 7; ++i) {
      setColor((earned > i ? RAINBOW_PALETTE : monochrome)[i], this.opacity)
      arc('line', this.x, this.y, radius - i * size, 180, 360)
    }

    if (progress !== 0) {
      setColor(RAINBOW_PALETTE[earned])
      arc(
        'line',
        this.x,
        this.y,
        radius - earned * size,
        180,
        180 * (1 + progress)
      )
    }

    setLine(1)
  }

  /* helpers */

  genRadius (): number {
    return Math.min(
      Dimentions.width - 4 * TILE_SIZE,
      0.5 * Dimentions.height - 3 * TILE_SIZE,
      86
    )
  }
}
