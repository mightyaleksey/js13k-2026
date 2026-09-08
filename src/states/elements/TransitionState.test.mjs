import { TransitionState } from './TransitionState.mjs'

import assert from 'node:assert'
import test from 'node:test'

class TestState extends TransitionState {
  constructor () {
    super()
    this.opacity = 0
    this.visibility = 0
  }
}

test('TransitionState', () => {
  const testState = new TestState()
  testState.setTransition(0.5, { opacity: 1 })
  testState.setTransition(0.5, { visibility: 1 })

  testState.update(0.1)
  assert.equal(testState.opacity.toPrecision(1), 0.2)
  testState.update(0.1)
  assert.equal(testState.opacity.toPrecision(1), 0.4)
  testState.update(0.1)
  assert.equal(testState.opacity.toPrecision(1), 0.6)
  testState.update(0.1)
  assert.equal(testState.opacity.toPrecision(1), 0.8)
  testState.update(0.1)
  assert.equal(testState.opacity.toPrecision(1), 1)
  assert.equal(testState.visibility.toPrecision(1), 0)
  assert.equal(testState.transitionQueue.length, 2)

  testState.update(0.1)
  assert.equal(testState.visibility.toPrecision(1), 0.2)
  assert.equal(testState.transitionQueue.length, 1)
})
