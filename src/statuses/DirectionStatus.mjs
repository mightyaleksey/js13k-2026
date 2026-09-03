/* @flow */

import { CAMERA_SPEED } from '../constants.mjs'
import { random } from '../libs/random.mjs'
import type { EntityState } from '../states/entities/EntityState.mjs'
import type { MinionState } from '../states/entities/MinionState.mjs'
import { ProjectileState } from '../states/entities/ProjectileState.mjs'
import { BaseStatus } from './BaseStatus.mjs'

/**
 * Helper for minion to randomly switch direction from time to time.
 */

export class DirectionStatus extends BaseStatus<MinionState> {
  constructor () {
    super([random(1, 3), 0])
  }

  onTick (target: MinionState) {
    target.switchDirection()
    this.interval = random(1, 3)
  }
}
