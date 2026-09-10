/* @flow */

import { ParticleState } from '../states/entities/archetypes/ParticleState.mjs'
import { ProjectileState } from '../states/entities/archetypes/ProjectileState.mjs'
import { BuildingState } from '../states/entities/BuildingState.mjs'
import type { EntityState } from '../states/entities/EntityState.mjs'

/**
 * Rendering priority (from top to bottom):
 * projectile > characters, obstacles > particles
 */

function getWeight (entity: EntityState<>): number {
  if (entity instanceof ProjectileState) return 3
  if (entity instanceof BuildingState) return 2
  if (entity instanceof ParticleState) return 0
  return 1
}

export function sortEntities (list: Array<EntityState<>>) {
  list.sort((a, b) => {
    const wa = getWeight(a)
    const wb = getWeight(b)

    if (wa === wb) {
      return a.y - b.y
    }

    return wa - wb
  })
}
