/* @flow */

import { MINION_SPEED, TILE_SIZE } from '../../constants.mjs'
import { Dimentions } from '../../engine.mjs'
import { BaseState } from '../BaseState.mjs'
import type { EntityState } from '../entities/EntityState.mjs'
import { MinionState } from '../entities/MinionState.mjs'
import type { EntitiesState } from './EntitiesState.mjs'

const workspace = 8 * TILE_SIZE

function genHShape (list: Array<EntityState<any>>, offsetY: number) {
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

  list.push(left, right)
}

function genTShape (list: Array<EntityState<any>>, offsetY: number) {
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

  list.push(left, right)
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
  }

  update (delta: number) {
    if (100 * this.counter + this.cameraY < -Dimentions.height) {
      const pattern = patterns[this.counter % patterns.length]
      pattern(this.entities.list, this.cameraY)
      this.counter++
    }
  }
}
