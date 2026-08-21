/* @flow */

import { rect, setColor } from '../../engine.mjs'
import { pixel } from '../../libs/render.mjs'
import { StateMachine } from '../StateMachine.mjs'
import type { EntityProps } from './EntityState.mjs'
import { EntityState } from './EntityState.mjs'

export class ProjectileState extends EntityState<any> {
  constructor (props: EntityProps) {
    super(props)
  }
}
