/* @flow */

import { TILE_SIZE } from '../constants.mjs'
import { Dimentions } from '../engine.mjs'
import type { CollidableType } from '../libs/collides.mjs'

const padding = 2 * TILE_SIZE

export const playarea: CollidableType = { x: 0, y: 0, width: 0, height: 0 }
export const viewport: CollidableType = { x: 0, y: 0, width: 0, height: 0 }

export function updateAreas (cameraX: number, cameraY: number) {
  // should be high enough, so the generated monsters won't be deleted
  const margin = Math.max(Dimentions.height, 12 * TILE_SIZE)

  playarea.x = cameraX - padding
  playarea.y = cameraY - margin
  playarea.width = Dimentions.width + 2 * padding
  playarea.height = Dimentions.height + margin + padding

  viewport.x = cameraX
  viewport.y = cameraY
  viewport.width = Dimentions.width
  viewport.height = Dimentions.height
}
