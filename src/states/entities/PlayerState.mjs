/* @flow */

import { rect, setColor } from '../../engine.mjs'
import { EntityState } from './EntityState.mjs'

export class PlayerState extends EntityState {
  enter () {}

  render () {
    setColor('#369')
    rect('fill', this.x, this.y, this.width, this.height)
  }

  update (delta: number) {
    super.update(delta)
  }
}
