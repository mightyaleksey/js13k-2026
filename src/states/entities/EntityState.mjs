/* @flow */

import { DEBUG_BB, TILE_SIZE } from '../../constants.mjs'
import { rect, setColor } from '../../engine.mjs'
import { BaseState } from '../BaseState.mjs'
import type { EntitiesState } from '../helpers/EntitiesState.mjs'
import { StateMachine } from '../StateMachine.mjs'

export type EntityProps = Readonly<{
  x?: number,
  y?: number,
  width?: number,
  height?: number
}>

export class EntityState<T = unknown> extends BaseState {
  x: number
  y: number
  width: number
  height: number

  dx: number
  dy: number

  state: StateMachine<T>
  statuses: Array<any>

  entities: EntitiesState

  isDestroyed: boolean

  constructor (props: EntityProps) {
    super()

    this.x = props?.x ?? 0
    this.y = props?.y ?? 0
    this.width = props?.width ?? TILE_SIZE
    this.height = props?.height ?? TILE_SIZE

    this.dx = 0
    this.dy = 0

    this.state = new StateMachine({})
    this.statuses = []

    // dependency injection
    // note: make sure to use EntitiesState.append() to add it to the list,
    // so the dependency will provided
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
  }

  update (delta: number) {
    this.state.update(delta)
    this.statuses.forEach((status) => status.update(this, delta))
    this.x += this.dx * delta
    this.y += this.dy * delta
  }

  /* helpers */

  changeState (stateName: T, input: unknown) {
    this.state.change(stateName, input)
  }

  onCollide (target: EntityState<any>, delta: number) {
    // abstract
  }
}
