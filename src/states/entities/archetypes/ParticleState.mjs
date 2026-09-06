/* @flow */

import type { EntityProps } from '../EntityState.mjs'
import { EntityState } from '../EntityState.mjs'

export type ParticleProps = EntityProps

export class ParticleState extends EntityState<> {
  constructor (props: ParticleProps) {
    super(props)
    this.isCollidable = false
  }
}
