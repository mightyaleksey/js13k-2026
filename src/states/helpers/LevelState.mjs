/* @flow */

import { FREE_AREA, PLAY_AREA, TILE_SIZE } from '../../constants.mjs'
import { Dimentions, draw, pattern } from '../../engine.mjs'
import { gameTiles } from '../../gameTiles.mjs'
import { random } from '../../libs/random.mjs'
import { BaseState } from '../BaseState.mjs'
import { BuildingState } from '../entities/BuildingState.mjs'
import { MinionState } from '../entities/MinionState.mjs'
import type { CameraState } from './CameraState.mjs'
import type { EntitiesState } from './EntitiesState.mjs'

export type LevelProps = Readonly<
  [camera: CameraState, entities: EntitiesState]
>

export class LevelState extends BaseState {
  camera: CameraState
  entities: EntitiesState

  currentYs: [number, number]
  intervals: [number, number]

  distance: number

  constructor (props: LevelProps) {
    super()

    this.camera = props[0]
    this.entities = props[1]

    this.currentYs = [this.camera.y, this.camera.y]
    this.intervals = [0, 0]

    this.distance = 5000
    this.minions = []
  }

  enter () {
    ;[0, 1].forEach((pointer) => {
      const building = new BuildingState([this.camera, 0, pointer])
      building.y += FREE_AREA * TILE_SIZE + building.height
      this.entities.append(building)
    })

    this.entities.append(
      new MinionState([0.5 * Dimentions.width - 8, this.camera.y - 10])
    )
  }

  render () {
    pattern(
      gameTiles[0],
      -0.5 * PLAY_AREA * TILE_SIZE,
      this.camera.y,
      Dimentions.width + PLAY_AREA * TILE_SIZE + 1,
      Dimentions.height + 1
    )
  }

  update (delta: number) {
    this.currentYs.forEach((currentY, i) => {
      if (currentY - this.camera.y >= this.intervals[i]) {
        // $FlowFixMe[invalid-tuple-index]
        this.currentYs[i] -= this.intervals[i]
        this.onInterval(i)
      }
    })
  }

  /* helpers */

  onInterval (pointer: number) {
    const building = new BuildingState([this.camera, 0, pointer])
    this.entities.append(building)
    // $FlowExpectedError[invalid-tuple-index]
    this.intervals[pointer] = FREE_AREA * TILE_SIZE + building.height
  }
}
