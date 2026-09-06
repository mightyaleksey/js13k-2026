/* @flow */

import { TILE_SIZE } from '../../constants.mjs'
import { rect, setColor } from '../../engine.mjs'
import { ArcShootingStatus } from '../../statuses/ArcShootingStatus.mjs'
import { AreaShootingStatus } from '../../statuses/AreaShootingStatus.mjs'
import { ConeShootingStatus } from '../../statuses/ConeShootingStatus.mjs'
import { CharacterState } from './archetypes/CharacterState.mjs'

export type BossProps = Readonly<[x?: ?number, y?: ?number]>

export class BossState extends CharacterState<> {
  sequenceIndex: number
  sequence: Array<any>

  constructor (props: BossProps) {
    super([props[0], props[1], 2 * TILE_SIZE, TILE_SIZE])

    this.hp = 20
    this.hpMax = 20

    this.sequenceIndex = -1
    this.sequence = [
      ConeShootingStatus,
      ArcShootingStatus,
      ConeShootingStatus,
      AreaShootingStatus
    ]
  }

  render () {
    super.render()

    setColor('#ffadad')
    rect('fill', this.x, this.y, this.width, this.height)
  }

  update (delta: number) {
    super.update(delta)
    this.switchAttacks()
  }

  /* helpers */

  switchAttacks () {
    if (this.statuses.length === 0) {
      this.sequenceIndex = (this.sequenceIndex + 1) % this.sequence.length
      const S = this.sequence[this.sequenceIndex]
      this.statuses.push(new S())
    }
  }
}
