/* @flow */

import type { EasingType } from '../libs/easing.mjs'
import { linear } from '../libs/easing.mjs'
import { BaseStatus } from './BaseStatus.mjs'

/**
 * Leverage status mechanic to implement value trasition.
 */

export type TransitionProps<T> = Readonly<
  [
    start: number,
    target: number,
    duration: number,
    updateFn: (T, number) => void
  ]
>

export class TransitionStatus<T> extends BaseStatus<T> {
  start: number
  target: number
  updateFn: (T, number) => void

  easingFn: EasingType
  time: number

  constructor (props: TransitionProps<T>) {
    super([0.01, props[2]])

    this.start = props[0]
    this.target = props[1]
    this.updateFn = props[3]

    this.easingFn = linear
    this.time = 0
  }

  update (target: T, delta: number) {
    super.update(target, delta)
    this.time = this.time + delta
  }

  /* helpers */

  progress (target: T) {
    const currentValue = this.easingFn(
      this.time,
      this.start,
      this.target - this.start,
      this.duration
    )

    this.updateFn(target, currentValue)
  }

  onTick (target: T) {
    this.progress(target)
  }

  onEnd (target: T) {
    this.time = this.duration
    this.progress(target)
  }
}
