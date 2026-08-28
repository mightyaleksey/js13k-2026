/* @flow */

import { TILE_SIZE } from '../../constants.mjs'
import { Dimentions, draw, pattern } from '../../engine.mjs'
import { gameTiles } from '../../gameTiles.mjs'
import { BaseState } from '../BaseState.mjs'
import { Cube } from '../figures/Cube.mjs'
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

    this.distance = 500
    this.interval = 100
    this.currentY = this.camera.y
  }

  render () {
    pattern(
      gameTiles[1],
      0,
      this.camera.y,
      Dimentions.width + 1,
      Dimentions.height + 1
    )
  }

  update (delta: number) {
    if (this.currentY - this.camera.y >= this.interval) {
      this.currentY -= this.interval
      this.onInterval()
    }
  }

  /* helpers */

  onInterval () {
    const cube = new Cube([
      this.camera,
      0.5 * (Dimentions.width - 14 * TILE_SIZE),
      this.camera.y - 3 * TILE_SIZE,
      0,
      2 * TILE_SIZE,
      3 * TILE_SIZE,
      Math.random() + 1.1
    ])

    this.entities.append(cube)
  }
}
