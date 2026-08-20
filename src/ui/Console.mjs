/* @flow */

import { getTextWidth, printf, rect, setColor, setFont } from '../engine.mjs'
import { Frame } from './Frame.mjs'

const fontSize = 6
const lineHeight = 9
const paddingLeft = 4
const paddingTop = 2

function serializeV (value: any) {
  if (typeof value === 'number') {
    return Number.isInteger(value) ? value : value.toFixed(4)
  }

  if (typeof value === 'string') {
    return `"${value}"`
  }

  return value
}

export class Console extends Frame {
  render (metrics: Readonly<{ [string]: any }>) {
    const names = Object.keys(metrics)
    const maxW = names.reduce((t, n) => Math.max(t, n.length), 0)
    const lines = Object.keys(metrics).map(
      (name) => `${name.padStart(maxW, ' ')}: ${serializeV(metrics[name])}`
    )

    setFont(`${fontSize}px/1.3 Consolas, monaco, monospace`)
    const w = lines.reduce((t, l) => Math.max(t, getTextWidth(l)), 0)

    setColor('#f1cebe', 0.9)
    rect(
      'fill',
      this.x,
      this.y,
      w + 2 * paddingLeft,
      lineHeight * lines.length + 2 * paddingTop,
      2
    )

    setColor('#1b1b1b')
    lines.forEach((line, i) => {
      printf(
        line,
        this.x + paddingLeft,
        this.y + (i + 0.7) * lineHeight + paddingTop,
        w
      )
    })
  }
}
