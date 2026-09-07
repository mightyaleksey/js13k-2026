/* @flow */

import { FRAMES, TILE_SIZE } from '../../constants.mjs'
import { draw, rect, setColor } from '../../engine.mjs'
import { gameTiles } from '../../gameTiles.mjs'
import { ArcShootingStatus } from '../../statuses/ArcShootingStatus.mjs'
import { ConeShootingStatus } from '../../statuses/ConeShootingStatus.mjs'
import { ExplosionShootingStatus } from '../../statuses/ExplosionShootingStatus.mjs'
import { CharacterState } from './archetypes/CharacterState.mjs'

export type BossProps = Readonly<[x?: ?number, y?: ?number]>

export class BossState extends CharacterState<> {
  sequenceIndex: number
  sequence: Array<any>

  constructor (props: BossProps) {
    super([props[0], props[1], 60, 2 * TILE_SIZE])

    this.animations = this.genAnimations(FRAMES.boss)
    this.currentAnimation = this.animations[0]

    this.hp = 20
    this.hpMax = 20

    this.sequenceIndex = -1
    this.sequence = [
      ConeShootingStatus,
      ArcShootingStatus,
      ConeShootingStatus,
      ExplosionShootingStatus
    ]
  }

  render () {
    setColor('#fff')
    draw(
      gameTiles[this.frameID],
      this.x,
      this.y + TILE_SIZE,
      2 * TILE_SIZE,
      TILE_SIZE
    )
    draw(gameTiles[9], this.x + 2 * TILE_SIZE, this.y, 28, 2 * TILE_SIZE)
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
      this.currentAnimation =
        S === ConeShootingStatus ? this.animations[0] : this.animations[1]
    }
  }
}
