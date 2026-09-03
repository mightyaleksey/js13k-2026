/* @flow */

import { PARTICLE_ROTATION } from '../constants.mjs'
import { random } from '../libs/random.mjs'
import type { MinionState } from '../states/entities/MinionState.mjs'
import type { ParticleState } from '../states/entities/ParticleState.mjs'
import type { StatusProps } from './BaseStatus.mjs'
import { BaseStatus } from './BaseStatus.mjs'

/**
 * Helper for minion to randomly switch direction from time to time.
 */

export class RotationStatus extends BaseStatus<ParticleState> {
  onTick (target: ParticleState) {
    target.angle += PARTICLE_ROTATION
  }
}
