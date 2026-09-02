/* @flow */

import type { EntityState } from '../states/entities/EntityState.mjs'

export type StatusProps = Readonly<[interval: number, duration: number]>

export class BaseStatus {
  interval: number
  duration: number
  timePassed: number

  isExpired: boolean

  constructor (props: StatusProps) {
    this.interval = props[0]
    this.duration = props[1]
    this.timePassed = 0

    this.isExpired = false
  }

  update (target: EntityState<>, delta: number) {
    this.timePassed = this.timePassed + delta

    if (this.interval > 0 && this.timePassed >= this.interval) {
      this.timePassed = this.timePassed - this.interval
      if (this.duration > 0) this.duration = this.duration - this.interval
      this.onTick(target)
    }

    if (this.duration > 0 && this.timePassed >= this.duration) {
      this.isExpired = true
      this.onEnd(target)
    }
  }

  onTick (target: EntityState<>) {
    // abstract
  }

  onEnd (target: EntityState<>) {
    // abstract
  }
}
