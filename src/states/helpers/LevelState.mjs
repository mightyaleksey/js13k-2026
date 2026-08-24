/* @flow */

import { BaseState } from '../BaseState.mjs'
import type { CameraState } from './CameraState.mjs'
import type { EntitiesState } from './EntitiesState.mjs'

export type LevelProps = Readonly<{
  camera: CameraState,
  entities: EntitiesState
}>

export class LevelState extends BaseState {
  camera: CameraState
  entities: EntitiesState

  distance: number
  interval: number
  currentY: number

  constructor (props: LevelProps) {
    super()

    this.camera = props.camera
    this.entities = props.entities

    this.distance = 300
    this.interval = 50
    this.currentY = this.camera.y
  }

  update (delta: number) {
    if (this.currentY - this.camera.y >= this.interval) {
      this.currentY -= this.interval
      this.onInterval()
    }
  }

  /* helpers */

  onInterval () {
    console.log('interval')
  }
}
