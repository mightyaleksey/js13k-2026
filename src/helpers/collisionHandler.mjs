/* @flow */

import { playSound } from '../sound.mjs'
import { CharacterState } from '../states/entities/archetypes/CharacterState.mjs'
import type { EntityState } from '../states/entities/EntityState.mjs'
import { MinionState } from '../states/entities/MinionState.mjs'
import { PlayerState } from '../states/entities/PlayerState.mjs'
import { ProjectileState } from '../states/entities/ProjectileState.mjs'

/**
 * Generic collision logic for the all entitites.
 */

export function collisionHandler (
  target: EntityState<>,
  self: EntityState<>,
  delta: number
) {
  if (self instanceof CharacterState && !(self instanceof PlayerState)) {
    if (target instanceof ProjectileState && self.isVisible) {
      self.hp -= 1

      if (self.hp <= 0) {
        self.isDestroyed = true
      } else {
        self.onHit()
      }

      if (self.isDestroyed) {
        playSound('death')
        self.onDeath()
      }
    } else {
      self.x -= self.dx * delta
      self.y -= self.dy * delta
      if (self instanceof MinionState) self.switchDirection()
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
