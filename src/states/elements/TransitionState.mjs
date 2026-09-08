/* @flow */

import { clamp } from '../../libs/clamp.mjs'
import { linear } from '../../libs/easing.mjs'
import { nullthrows } from '../../libs/nullthrows.mjs'
import { BaseState } from '../BaseState.mjs'

export class TransitionState extends BaseState {
  renderQueue: Array<() => void>
  transitionProps: ?{ [string]: number }
  transitionQueue: Array<[number, { [string]: number }]>
  transitionTime: number

  constructor () {
    super()
    this.renderQueue = []
    this.transitionProps = null
    this.transitionQueue = []
    this.transitionTime = 0
  }

  render () {
    if (this.transitionQueue.length === 0) return
    if (this.renderQueue.length === 0) return
    this.renderQueue[0].call(this)
  }

  update (delta: number) {
    if (this.transitionQueue.length === 0) return

    const duration = this.transitionQueue[0][0]

    // update timer
    this.transitionTime += delta
    if (this.transitionTime > duration) {
      // reset
      this.transitionProps = null
      this.transitionTime -= duration
      this.transitionQueue.shift()
      this.renderQueue.shift()
    }

    if (this.transitionProps == null) {
      // first frame: set initial values
      const props = (this.transitionProps = {})

      Object.keys(this.transitionQueue[0][1]).forEach((key) => {
        // $FlowExpectedError[prop-missing]
        props[key] = this[key]
      })
    }

    // following frame: update values
    Object.keys(this.transitionQueue[0][1]).forEach((key) => {
      const begin = nullthrows(this.transitionProps)[key]
      const change = this.transitionQueue[0][1][key] - begin
      // $FlowExpectedError[prop-missing]
      this[key] = linear(
        clamp(this.transitionTime, 0, duration),
        begin,
        change,
        duration
      )
    })
  }

  /* helpers */

  setRender (renderFn: () => void) {
    this.renderQueue.push(renderFn)
  }

  setTransition (duration: number, props: { [string]: number }) {
    this.transitionQueue.push([duration, props])
  }
}
