/* @flow */

import { playSound } from '../sound.mjs'
import { CharacterState } from '../states/entities/archetypes/CharacterState.mjs'
import { ProjectileState } from '../states/entities/archetypes/ProjectileState.mjs'
import { CrystalState } from '../states/entities/CrystalState.mjs'
import type { EntityState } from '../states/entities/EntityState.mjs'
import { MinionState } from '../states/entities/MinionState.mjs'

/**
 * Generic collision logic for the all entitites.
 */

export function collisionHandler (
  target: EntityState<>,
  self: EntityState<>,
  delta: number
) {
  if (self instanceof CharacterState) {
    if (target instanceof CrystalState) {
      // display progress, move to next level
    } else if (target instanceof ProjectileState && self.isVisible) {
      // take hit
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

  if (target instanceof ProjectileState) {
    target.isDestroyed = true
  }
}
