/* @flow */

import type { EntityState } from '../entities/EntityState.mjs'
import { MinionState } from '../entities/MinionState.mjs'
import { PlayerState } from '../entities/PlayerState.mjs'
import { ProjectileState } from '../entities/ProjectileState.mjs'
import { WallState } from '../entities/WallState.mjs'

export function handleCollision (
  target: EntityState<>,
  self: EntityState<>,
  delta: number
) {
  if (target instanceof ProjectileState) {
    if (self instanceof MinionState || self instanceof PlayerState) {
      // take a hit
    }

    target.isDestroyed = true
  } else {
    self.x -= self.dx * delta
    self.y -= self.dy * delta
  }
}
