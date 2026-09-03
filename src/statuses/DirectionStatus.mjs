/* @flow */

import { random } from '../libs/random.mjs'
import type { MinionState } from '../states/entities/MinionState.mjs'
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
