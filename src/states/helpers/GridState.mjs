/* @flow */

import { PLAY_AREA, TILE_SIZE } from '../../constants.mjs'
import {
  Dimentions,
  line,
  printf,
  rect,
  setColor,
  setFont
} from '../../engine.mjs'
import { BaseState } from '../BaseState.mjs'

export class GridState extends BaseState {
  render () {
    const ox = Math.floor(0.5 * (Dimentions.width % TILE_SIZE))

    setColor('#e0c5c4', 0.4)
    rect(
      'fill',
      0.5 * (Dimentions.width - PLAY_AREA * TILE_SIZE),
      0,
      PLAY_AREA * TILE_SIZE,
      Dimentions.height
    )

    setColor('#e4f1ee', 0.4)
    setFont('6px/1.3 Consolas, monaco, monospace')

    for (let x = 0; x < Dimentions.width; x += TILE_SIZE) {
      line(x + ox, 0, x + ox, Dimentions.height + 1)
      printf(String(x / TILE_SIZE + 1), x + ox + 4, 12)
    }

    for (let y = 0; y < Dimentions.height; y += TILE_SIZE) {
      line(0, y, Dimentions.width + 1, y)
      printf(String(y / TILE_SIZE + 1), ox + 4, y + 12)
    }
  }
}
