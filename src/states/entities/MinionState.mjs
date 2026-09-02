/* @flow */

import { FRAMES, TILE_SIZE } from '../../constants.mjs'
import { setColor } from '../../engine.mjs'
import { pixel } from '../../libs/render.mjs'
import { ShootingStatus } from '../../statuses/ShootingStatus.mjs'
import { EntityState } from './EntityState.mjs'
import { ProjectileState } from './ProjectileState.mjs'
import { WallState } from './WallState.mjs'

export class MinionState extends EntityState<> {
  constructor (props: [number, number]) {
    super([props[0], props[1], TILE_SIZE, TILE_SIZE])

    this.animations = this.genAnimations(FRAMES.minion)
    this.currentAnimation = this.animations[0]

    this.statuses.push(new ShootingStatus([0.6, 0, 90]))
  }
}
