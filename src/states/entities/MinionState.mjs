/* @flow */

import {
  FRAMES,
  MINION_SPEED,
  TILE_SIZE,
  UNIT_VECTORS
} from '../../constants.mjs'
import { setColor } from '../../engine.mjs'
import { shuffle } from '../../libs/random.mjs'
import { range } from '../../libs/range.mjs'
import { pixel } from '../../libs/render.mjs'
import { DirectionStatus } from '../../statuses/DirectionStatus.mjs'
import { ShootingStatus } from '../../statuses/ShootingStatus.mjs'
import { EntityState } from './EntityState.mjs'
import { ProjectileState } from './ProjectileState.mjs'
import { WallState } from './WallState.mjs'

export class MinionState extends EntityState<> {
  directionIndex: number
  directions: Array<number>

  constructor (props: [number, number]) {
    super([props[0], props[1], TILE_SIZE, TILE_SIZE])

    this.animations = this.genAnimations(FRAMES.minion)
    this.currentAnimation = this.animations[0]

    this.statuses.push(new DirectionStatus(), new ShootingStatus([1, 0, 90]))

    this.directionIndex = -1
    this.directions = shuffle(range(4).concat(range(4)))
    this.switchDirection()
  }

  /* helpers */

  switchDirection () {
    this.directionIndex = (this.directionIndex + 1) % this.directions.length
    const vector = UNIT_VECTORS[this.directions[this.directionIndex]]
    this.dx = vector[0] * MINION_SPEED
    this.dy = vector[1] * MINION_SPEED
  }
}
