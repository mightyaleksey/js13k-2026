/* @flow */

import { TransitionState } from './TransitionState.mjs'

class TestState extends TransitionState {
  opacity: number

  constructor () {
    super()
    this.opacity = 0
  }

  test () {
    this.setTransition(5, { opacity: 1 })
  }
}
