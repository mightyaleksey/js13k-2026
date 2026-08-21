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

  list: Array<EntityState<any>>

  constructor () {
    super()

    this.cameraX = 0
    this.cameraY = 0

    this.list = []
  }

  enter () {}

  render () {
    for (const entity of this.list) {
      if (entity instanceof PlayerState) continue
      entity.render()
    }
  }

  update (delta: number) {
    for (const entity of this.list) {
      if (entity instanceof PlayerState) continue
      entity.update(delta)
    }

    // check for collisions
    const entities = this.list
    entities.forEach((left, i) => {
      for (let j = i + 1; j < entities.length; ++j) {
        const right = entities[j]
        if (!collides(left, right)) continue

        left.onCollide(right, delta)
        right.onCollide(left, delta)
      }
    })

    this.collectGarbage()
  }

  /* helpers */

  collectGarbage () {
    // remove entities from the list that are out of viewport,
    // i.e. not in the camera range.
    const viewport: CollidableType = {
      x: -(deadZone - this.cameraX),
      y: -(deadZone - this.cameraY),
      width: Dimentions.width + 2 * deadZone,
      height: Dimentions.height + 2 * deadZone
    }

    for (var j = this.list.length - 1; j > -1; --j) {
      const entity = this.list[j]
      if (entity instanceof PlayerState) continue

      if (!collides(entity, viewport)) {
        this.list.splice(j, 1)
      }
    }
  }
}
