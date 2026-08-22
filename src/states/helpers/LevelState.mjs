/* @flow */

import { MINION_SPEED, TILE_SIZE } from '../../constants.mjs'
import { Dimentions } from '../../engine.mjs'
import { BaseState } from '../BaseState.mjs'
import { MinionState } from '../entities/MinionState.mjs'
import { WallState } from '../entities/WallState.mjs'
import type { EntitiesState } from './EntitiesState.mjs'

const workspace = 8 * TILE_SIZE

function genHShape (entities: EntitiesState, offsetY: number) {
  const left = new MinionState({
    x: 0.5 * (Dimentions.width - workspace) - TILE_SIZE,
    y: -TILE_SIZE + offsetY
  })
  const right = new MinionState({
    x: 0.5 * (Dimentions.width + workspace),
    y: -TILE_SIZE + offsetY
  })

  left.dx = MINION_SPEED
  right.dx = -MINION_SPEED

  entities.append(left)
  entities.append(right)
}

function genTShape (entities: EntitiesState, offsetY: number) {
  const left = new MinionState({
    x: 0.5 * Dimentions.width - TILE_SIZE,
    y: -TILE_SIZE + offsetY
  })
  const right = new MinionState({
    x: 0.5 * Dimentions.width,
    y: -TILE_SIZE + offsetY
  })

  left.dx = -MINION_SPEED
  right.dx = MINION_SPEED

  entities.append(left)
  entities.append(right)
}

const patterns = [genHShape, genTShape]

export class LevelState extends BaseState {
  cameraX: number
  cameraY: number

  entities: EntitiesState
  length: number

  counter: number

  constructor (entities: EntitiesState) {
    super()

    this.cameraX = 0
    this.cameraY = 0

    this.entities = entities
    this.length = 1000

    this.counter = 0

    this.entities.append(
      new WallState({
        x: 0.5 * (Dimentions.width - workspace) - 2 * TILE_SIZE,
        y: -1000,
        width: TILE_SIZE,
        height: 1000
      })
    )
    this.entities.append(
      new WallState({
        x: 0.5 * (Dimentions.width + workspace) + TILE_SIZE,
        y: -1000,
        width: TILE_SIZE,
        height: 1000
      })
    )
  }

  update (delta: number) {
    if (100 * this.counter + this.cameraY < -Dimentions.height) {
      const pattern = patterns[this.counter % patterns.length]
      pattern(this.entities, this.cameraY)
      this.counter++
    }
  }
}
