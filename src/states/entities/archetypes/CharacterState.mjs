/* @flow */

import { genExplosion } from '../../../helpers/sparks.mjs'
import type { EntityProps } from '../EntityState.mjs'
import { EntityState } from '../EntityState.mjs'

export type CharacterProps = EntityProps

export class CharacterState<T = unknown> extends EntityState<T> {
  onDeath () {
    genExplosion(this.centerX(), this.centerY()).forEach((spark) => {
      this.entities.append(spark)
    })
  }
}
