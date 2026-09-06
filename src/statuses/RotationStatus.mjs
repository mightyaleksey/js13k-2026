/* @flow */

import { SPARK_ROTATION } from '../constants.mjs'
import { random } from '../libs/random.mjs'
import type { MinionState } from '../states/entities/MinionState.mjs'
import type { SparkState } from '../states/entities/SparkState.mjs'
import type { StatusProps } from './BaseStatus.mjs'
import { BaseStatus } from './BaseStatus.mjs'

/**
 * Helper for minion to randomly switch direction from time to time.
 */

export class RotationStatus extends BaseStatus<SparkState> {
  onTick (target: SparkState) {
    target.angle += SPARK_ROTATION
  }
}
