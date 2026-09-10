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

  viewport.x = cameraX - 0.5 * Dimentions.width
  viewport.y = cameraY
  viewport.width = Dimentions.width
  viewport.height = Dimentions.height

  playarea.x = viewport.x - padding
  playarea.y = viewport.y - margin
  playarea.width = viewport.width + 2 * padding
  playarea.height = viewport.height + margin + padding
}
