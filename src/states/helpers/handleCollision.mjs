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
  if (self instanceof MinionState) {
    if (!(target instanceof ProjectileState)) {
      self.x -= self.dx * delta
      self.y -= self.dy * delta
      self.switchDirection()
    }
  }

  if (self instanceof PlayerState) {
    if (!(target instanceof ProjectileState)) {
      self.x -= self.dx * delta
      self.y -= self.dy * delta
    }
  }

  if (target instanceof ProjectileState) {
    target.isDestroyed = true
  }
}
