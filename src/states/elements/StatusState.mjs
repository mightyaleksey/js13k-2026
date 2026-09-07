/* @flow */

import { BaseState } from '../BaseState.mjs'

export class StatusState extends BaseState {
  statuses: Array<any>

  constructor () {
    super()
    this.statuses = []
  }

  update (delta: number) {
    if (this.statuses.length > 0) {
      for (let j = this.statuses.length - 1; j > -1; --j) {
        const status = this.statuses[j]
        status.update(this, delta)
        if (status.isExpired) this.statuses.splice(j, 1)
      }
    }
  }
}
