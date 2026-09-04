/* @flow */

import type { EntityState } from '../states/entities/EntityState.mjs'
import { BaseStatus } from './BaseStatus.mjs'

export class DelayedDeathStatus extends BaseStatus<EntityState<any>> {
  onEnd (target: EntityState<>) {
    target.isDestroyed = true
  }
}
