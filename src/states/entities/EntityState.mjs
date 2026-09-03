/* @flow */

import type { CharType } from '../../constants.mjs'
import { DEBUG_BB, TILE_SIZE } from '../../constants.mjs'
import { draw, rect, setColor } from '../../engine.mjs'
import { gameTiles } from '../../gameTiles.mjs'
import { nullthrows } from '../../libs/nullthrows.mjs'
import { Animation } from '../Animation.mjs'
import { BaseState } from '../BaseState.mjs'
import type { CameraState } from '../helpers/CameraState.mjs'
import type { EntitiesState } from '../helpers/EntitiesState.mjs'
import { StateMachine } from '../StateMachine.mjs'

// [ x, y, width, height, dx, dy ]
export type EntityProps = Readonly<
  [
    x?: ?number,
    y?: ?number,
    width?: ?number,
    height?: ?number,
    dx?: ?number,
    dy?: ?number
  ]
>

export class EntityState<T = unknown> extends BaseState {
  x: number
  y: number
  width: number
  height: number

  dx: number
  dy: number

  state: StateMachine<T>
  statuses: Array<any>

  animations: ?ReadonlyArray<Animation>
  currentAnimation: ?Animation
  frameID: ?number

  camera: CameraState
  entities: EntitiesState

  isDestroyed: boolean

  constructor (props: EntityProps) {
    super()

    this.x = Math.floor(
      (props[0] ?? 0) - (props[2] != null ? 0.5 * props[2] : 0)
    )
    this.y = Math.floor(
      (props[1] ?? 0) - (props[3] != null ? 0.5 * props[3] : 0)
    )
    this.width = props[2] ?? 0
    this.height = props[3] ?? 0

    this.dx = props[4] ?? 0
    this.dy = props[5] ?? 0

    this.state = new StateMachine({})
    this.statuses = []

    this.animations = null
    this.currentAnimation = null
    this.frameID = null

    // dependency injection
    // note: make sure to use EntitiesState.append() to add it to the list,
    // so the dependency will provided
    // $FlowExpectedError[incompatible-type]
    this.camera = null
    // $FlowExpectedError[incompatible-type]
    this.entities = null

    this.isDestroyed = false
  }

  enter () {}

  render () {
    if (DEBUG_BB) {
      setColor('#dedaf4')
      rect('line', this.x, this.y, this.width, this.height)
    }

    const frameID = this.frameID
    if (frameID != null) {
      setColor('#fff')
      draw(gameTiles[frameID], this.x, this.y, this.width, this.height)
    }
  }

  update (delta: number) {
    this.state.update(delta)
    this.statuses.forEach((status) => status.update(this, delta))
    if (this.currentAnimation != null) {
      this.currentAnimation.update(delta)
      this.frameID = this.currentAnimation?.getCurrentFrame()
    }
    this.x += this.dx * delta
    this.y += this.dy * delta
  }

  /* helpers */

  centerX (): number {
    return Math.floor(this.x + 0.5 * this.width)
  }

  changeState (stateName: T, input: unknown) {
    this.state.change(stateName, input)
  }

  changeAnimation (animationID: number) {
    this.currentAnimation = nullthrows(this.animations)[animationID]
  }

  genAnimations (def: CharType): ReadonlyArray<Animation> {
    return def.frames.map((frames) => new Animation(frames, def.frameInterval))
  }

  onCollide (target: EntityState<>, self: EntityState<>, delta: number) {
    // abstract
  }
}
