/* @flow */

import { playSound } from '../sound.mjs'
import type { EntityState } from '../states/entities/EntityState.mjs'
import { MinionState } from '../states/entities/MinionState.mjs'
import { ParticleState } from '../states/entities/ParticleState.mjs'
import { PlayerState } from '../states/entities/PlayerState.mjs'
import { ProjectileState } from '../states/entities/ProjectileState.mjs'
import { WallState } from '../states/entities/WallState.mjs'

/**
 * Generic collision logic for the all entitites.
 */

export function collisionHandler (
  target: EntityState<>,
  self: EntityState<>,
  delta: number
) {
  if (self instanceof MinionState) {
    if (target instanceof ProjectileState) {
      playSound('death')
      self.isDestroyed = true
    } else {
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
