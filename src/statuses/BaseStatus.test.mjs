import { BaseStatus } from './BaseStatus.mjs'

import assert from 'node:assert'
import test from 'node:test'

test('BaseStatus - finite', () => {
  const status = new BaseStatus([0.1, 0.3])
  assert.equal(status.interval, 0.1)
  assert.equal(status.duration, 0.3)

  status.update(null, 0.1)
  status.update(null, 0.1)
  status.update(null, 0.1)

  assert.equal(status.isExpired, true)
})

test('BaseStatus - infinite', () => {
  const status = new BaseStatus([0.1, 0])
  assert.equal(status.interval, 0.1)
  assert.equal(status.duration, 0)

  status.update(null, 0.1)
  status.update(null, 0.1)
  status.update(null, 0.1)

  assert.equal(status.isExpired, false)
})
