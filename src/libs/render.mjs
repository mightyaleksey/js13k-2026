/* @flow */

import { rect } from '../engine.mjs'

export function pixel (x: number, y: number) {
  rect('fill', x, y, 4, 4)
}
