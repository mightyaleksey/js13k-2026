/* @flow */

import type { CharType } from '../../constants.mjs'
import { FRAMES, TILE_SIZE } from '../../constants.mjs'
import { Dimentions, draw, setColor } from '../../engine.mjs'
import { gameTiles } from '../../gameTiles.mjs'
import { pixel } from '../../libs/render.mjs'
import { ShootingStatus } from '../../statuses/ShootingStatus.mjs'
import { Animation } from '../Animation.mjs'
import { StateMachine } from '../StateMachine.mjs'
import { PlayerIdleState } from './characters/PlayerIdleState.mjs'
import { PlayerWalkState } from './characters/PlayerWalkState.mjs'
import type { EntityProps } from './EntityState.mjs'
import { EntityState } from './EntityState.mjs'
import { WallState } from './WallState.mjs'

export class PlayerState extends EntityState<'idle' | 'walk'> {
  animations: ReadonlyArray<Animation>
  currentAnimation: Animation

  constructor (props: EntityProps) {
    super([props[0], props[1], 19, 32])

    this.animations = this.genAnimations(FRAMES.player)
    this.currentAnimation = this.animations[0]

    this.state = new StateMachine({
      idle: () => new PlayerIdleState(this),
      walk: () => new PlayerWalkState(this)
    }).change('idle')

    this.statuses.push(new ShootingStatus([0.4, 0]))
  }

  render () {
    super.render()

    const tileID = this.currentAnimation.getCurrentFrame()
    setColor('#fff')
    draw(gameTiles[tileID], this.x, this.y, this.width, this.height)
  }

  update (delta: number) {
    super.update(delta)
    this.currentAnimation.update(delta)
  }

  /* helpers */

  changeAnimation (animationID: number) {
    this.currentAnimation = this.animations[animationID]
  }

  genAnimations (def: CharType): ReadonlyArray<Animation> {
    return def.frames.map((frames) => new Animation(frames, def.frameInterval))
  }
}
