/* @flow */

import { TILE_SIZE } from '../../constants.mjs'
import { Dimentions, setColor } from '../../engine.mjs'
import { pixel } from '../../libs/render.mjs'
import { ShootingStatus } from '../../statuses/ShootingStatus.mjs'
import { StateMachine } from '../StateMachine.mjs'
import { PlayerIdleState } from './characters/PlayerIdleState.mjs'
import { PlayerWalkState } from './characters/PlayerWalkState.mjs'
import type { EntityProps } from './EntityState.mjs'
import { EntityState } from './EntityState.mjs'
import { WallState } from './WallState.mjs'

export class PlayerState extends EntityState<'idle' | 'walk'> {
  constructor (props: EntityProps) {
    super([props[0], props[1], TILE_SIZE, TILE_SIZE])

    this.state = new StateMachine({
      idle: () => new PlayerIdleState(this),
      walk: () => new PlayerWalkState(this)
    }).change('idle')

    // this.statuses.push(new ShootingStatus([0.2, 0]))
  }

  render () {
    super.render()

    setColor('#83ccd2')
    pixel(this.x, this.y + 4)
    pixel(this.x, this.y + 8)
    pixel(this.x, this.y + 12)

    pixel(this.x + 4, this.y)
    pixel(this.x + 4, this.y + 8)

    pixel(this.x + 8, this.y)
    pixel(this.x + 8, this.y + 8)

    pixel(this.x + 12, this.y + 4)
    pixel(this.x + 12, this.y + 8)
    pixel(this.x + 12, this.y + 12)
  }

  update (delta: number) {
    super.update(delta)
  }

  /* helpers */

  onCollide (target: EntityState<>, delta: number) {
    if (target instanceof WallState) {
      this.dx = -this.dx
      this.dy = -this.dy
      this.x += this.dx * delta
      this.y += this.dy * delta
    }
  }
}
