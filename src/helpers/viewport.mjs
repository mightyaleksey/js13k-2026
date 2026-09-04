/* @flow */

import { TILE_SIZE } from '../constants.mjs'
import { Dimentions } from '../engine.mjs'
import type { CollidableType } from '../libs/collides.mjs'

const offsetX = 2 * TILE_SIZE
const offsetY = 8 * TILE_SIZE

export const playarea: CollidableType = { x: 0, y: 0, width: 0, height: 0 }
export const viewport: CollidableType = { x: 0, y: 0, width: 0, height: 0 }

export function updateAreas (cameraX: number, cameraY: number) {
  playarea.x = cameraX - offsetX
  playarea.y = cameraY - offsetY
  playarea.width = Dimentions.width + 2 * offsetX
  playarea.height = Dimentions.height + 2 * offsetY

  viewport.x = cameraX
  viewport.y = cameraY
  viewport.width = Dimentions.width
  viewport.height = Dimentions.height
}
