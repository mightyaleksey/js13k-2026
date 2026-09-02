/* @flow */

import { TILE_SIZE } from '../../constants.mjs'
import { Dimentions } from '../../engine.mjs'
import type { CollidableType } from '../../libs/collides.mjs'
import { collides } from '../../libs/collides.mjs'
import { BaseState } from '../BaseState.mjs'
import type { EntityState } from '../entities/EntityState.mjs'
import { PlayerState } from '../entities/PlayerState.mjs'
import type { CameraState } from './CameraState.mjs'
import { handleCollision } from './handleCollision.mjs'

const offsetX = 2 * TILE_SIZE
const offsetY = 8 * TILE_SIZE

export type EntitiesProps = Readonly<[camera: CameraState]>

export class EntitiesState extends BaseState {
  camera: CameraState
  list: Array<EntityState<>>

  constructor (props: EntitiesProps) {
    super()

    this.camera = props[0]
    this.list = []
  }

  enter () {}

  render () {
    this.list.forEach((entity) => entity.render())
  }

  update (delta: number) {
    const viewport: CollidableType = {
      x: -(offsetX - this.camera.x),
      y: -(offsetY - this.camera.y),
      width: Dimentions.width + 2 * offsetX,
      height: Dimentions.height + 2 * offsetY
    }

    // update entities
    this.list.forEach((entity) => entity.update(delta))

    // check for collisions (mainly those that are in the viewport)
    const entities = this.list.filter((entity) => collides(entity, viewport))
    entities.forEach((left, i) => {
      for (let j = i + 1; j < entities.length; ++j) {
        const right = entities[j]
        if (!collides(left, right)) continue

        left.onCollide(right, left, delta)
        right.onCollide(left, right, delta)
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
    entity.camera = this.camera
    entity.entities = this
    // $FlowExpectedError[cannot-write]
    entity.onCollide = handleCollision
    this.list.push(entity)
  }
}
