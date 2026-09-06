/* @flow */

import type { EntityState } from '../states/entities/EntityState.mjs'

export type StatusProps = Readonly<[interval: number, duration: number]>

export class BaseStatus<T = EntityState<>> {
  interval: number
  duration: number
  timePassed: number

  isExpired: boolean
  isFinite: boolean

  constructor (props: StatusProps) {
    this.interval = props[0]
    this.duration = props[1]
    this.timePassed = 0

    this.isExpired = false
    this.isFinite = this.duration > 0
  }

  update (target: T, delta: number) {
    this.timePassed = this.timePassed + delta

    if (
      this.interval > 0 &&
      this.timePassed >= this.interval &&
      !this.isExpired
    ) {
      this.timePassed = this.timePassed - this.interval
      if (this.isFinite) this.duration = this.duration - this.interval
      this.onTick(target)
    }

    if (this.isFinite && this.timePassed >= this.duration) {
      this.isExpired = true
      this.onEnd(target)
    }
  }

  onTick (target: T) {
    // abstract
  }

  onEnd (target: T) {
    // abstract
  }
}
