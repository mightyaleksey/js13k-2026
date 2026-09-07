import { desaturate, hex2rgb, rgb2hex } from './color.mjs'

import assert from 'node:assert'
import test from 'node:test'

test('hex2rgb()', () => {
  assert.deepEqual(hex2rgb('#e84036'), [232, 64, 54])
  assert.deepEqual(hex2rgb('#0a0b00'), [10, 11, 0])
})

test('rgb2hex()', () => {
  assert.equal(rgb2hex([232, 64, 54]), '#e84036')
  assert.equal(rgb2hex([10, 11, 0]), '#0a0b00')
})

test('desaturate()', () => {
  const palette = ['#2a4062', '#2a4062', '#5a668c', '#a493a4', '#c8afb9']

  // should match original color when t = 0
  assert.deepEqual(
    palette.map((hex) => desaturate(hex, 0)),
    palette
  )

  assert.deepEqual(
    palette.map((hex) => desaturate(hex, 0.02040816327)),
    ['#2a3f61', '#2a3f61', '#5a668b', '#a393a3', '#c7afb8']
  )

  assert.deepEqual(
    palette.map((hex) => desaturate(hex, 0.7346938776)),
    ['#383e47', '#383e47', '#626670', '#9b969b', '#bab3b6']
  )

  // final
  assert.deepEqual(
    palette.map((hex) => desaturate(hex, 1)),
    ['#3d3d3d', '#3d3d3d', '#666666', '#979797', '#b5b5b5']
  )
})
