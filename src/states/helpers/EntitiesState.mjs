/* @flow */

import { TILE_SIZE } from '../../constants.mjs'
import { Dimentions } from '../../engine.mjs'
import type { CollidableType } from '../../libs/collides.mjs'
import { collides } from '../../libs/collides.mjs'
import { BaseState } from '../BaseState.mjs'
import type { EntityState } from '../entities/EntityState.mjs'
import { PlayerState } from '../entities/PlayerState.mjs'

const deadZone = 2 * TILE_SIZE

export class EntitiesState extends BaseState {
  cameraX: number
  cameraY: number

  list: Array<EntityState<>>

  constructor () {
    super()

    this.cameraX = 0
    this.cameraY = 0

    this.list = []
  }

  enter () {}

  render () {
    this.list.forEach((entity) => entity.render())
  }

  update (delta: number) {
    const viewport: CollidableType = {
      x: -(deadZone - this.cameraX),
      y: -(deadZone - this.cameraY),
      width: Dimentions.width + 2 * deadZone,
      height: Dimentions.height + 2 * deadZone
    }

    // update entities
    this.list.forEach((entity) => entity.update(delta))

    // check for collisions (mainly those that are in the viewport)
    const entities = this.list.filter((entity) => collides(entity, viewport))
    entities.forEach((left, i) => {
      for (let j = i + 1; j < entities.length; ++j) {
        const right = entities[j]
        if (!collides(left, right)) continue

        left.onCollide(right, delta)
        right.onCollide(left, delta)
      }
    })

    // collect garbage, i.e. remove entities from the list that are out
    // of viewport, i.e. not in the camera range.
    for (let j = this.list.length - 1; j > -1; --j) {
      const entity = this.list[j]
      if (entity instanceof PlayerState) continue

      if (!collides(entity, viewport) || entity.isDestroyed) {
        this.list.splice(j, 1)
      }
    }
  }

  /* helpers */

  append (entity: EntityState<any>) {
    // inject dependency
    entity.entities = this
    this.list.push(entity)
  }
}
