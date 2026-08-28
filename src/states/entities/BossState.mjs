/* @flow */

import { TILE_SIZE } from '../../constants.mjs'
import { rect, setColor } from '../../engine.mjs'
import { EntityState } from './EntityState.mjs'

export type BossProps = Readonly<[x?: ?number, y?: ?number]>

export class BossState extends EntityState<> {
  constructor (props: BossProps) {
    super([props[0], props[1], 2 * TILE_SIZE, TILE_SIZE])
  }

  render () {
    super.render()

    setColor('#ffadad')
    rect('fill', this.x, this.y, this.width, this.height)
  }
}
