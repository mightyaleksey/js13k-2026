/* @flow */

import { EXPLOSION_SIZE, HIGHLIGHT_DURATION } from '../../constants.mjs'
import { rect, setColor } from '../../engine.mjs'
import { DelayedDeathStatus } from '../../statuses/DelayedDeathStatus.mjs'
import { ParticleState } from './archetypes/ParticleState.mjs'

export type HighlightProps = Readonly<[x: number, y: number]>

export class HighlightState extends ParticleState {
  constructor (props: HighlightProps) {
    super([props[0], props[1], EXPLOSION_SIZE, EXPLOSION_SIZE])
    this.statuses.push(new DelayedDeathStatus([0, HIGHLIGHT_DURATION]))
  }

  render () {
    super.render()

    setColor('#f49595')
    rect('fill', this.x, this.y, this.width, this.height)
  }
}
