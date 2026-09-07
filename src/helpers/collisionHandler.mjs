/* @flow */

import { gameState } from '../gameState.mjs'
import { playSound } from '../sound.mjs'
import { CharacterState } from '../states/entities/archetypes/CharacterState.mjs'
import { ProjectileState } from '../states/entities/archetypes/ProjectileState.mjs'
import { CrystalState } from '../states/entities/CrystalState.mjs'
import type { EntityState } from '../states/entities/EntityState.mjs'
import { MinionState } from '../states/entities/MinionState.mjs'

/**
 * Generic collision logic for the all entitites.
 * The global one helps to avoid dependency cycles and to avoid repetition.
 */

export function collisionHandler (
  target: EntityState<>,
  self: EntityState<>,
  delta: number
) {
  if (self instanceof CharacterState) {
    if (target instanceof CrystalState) {
      // display progress, move to next level
      target.isDestroyed = true
      gameState.stack[0].current.nextLevel()
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
