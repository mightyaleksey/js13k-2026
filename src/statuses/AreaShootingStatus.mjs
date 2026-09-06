/* @flow */

import { S_ARC_DURATION, S_ARC_INTERVAL } from '../constants.mjs'
import type { BossState } from '../states/entities/BossState.mjs'
import { BaseStatus } from './BaseStatus.mjs'

export class AreaShootingStatus extends BaseStatus<BossState> {
  constructor () {
    super([S_ARC_INTERVAL, S_ARC_DURATION])
  }

  onTick (target: BossState) {}

  /* helpers */

  genSequence () {}
}
