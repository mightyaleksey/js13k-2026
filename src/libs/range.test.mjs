import { range } from './range.mjs'

import assert from 'node:assert'
import test from 'node:test'

test('range()', () => {
  assert.deepEqual(range(3), [0, 1, 2])
  assert.deepEqual(range(1, 3), [1, 2])
})
