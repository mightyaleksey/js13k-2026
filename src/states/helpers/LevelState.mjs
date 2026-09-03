/* @flow */

import { FREE_AREA, PLAY_AREA, TILE_SIZE } from '../../constants.mjs'
import { Dimentions, draw, pattern } from '../../engine.mjs'
import { gameTiles } from '../../gameTiles.mjs'
import { nullthrows } from '../../libs/nullthrows.mjs'
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

  currentYs: [number, number, number]
  intervals: [number, number, number]

  distance: number
  stages: ReadonlyArray<[interval: number, count: number, position?: number]>

  constructor (props: LevelProps) {
    super()

    this.camera = props[0]
    this.entities = props[1]

    this.currentYs = [this.camera.y, this.camera.y, this.camera.y]
    this.intervals = [0, 0, 0]

    this.distance = 5000
    this.stages = this.genStages()
  }

  enter () {
    ;[0, 1].forEach((pointer) => {
      const building = new BuildingState([this.camera, 0, pointer])
      building.y += FREE_AREA * TILE_SIZE + building.height
      this.entities.append(building)
    })
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

  genStages (): ReadonlyArray<
    [interval: number, count: number, position?: number]
  > {
    const interval = [80, 120]
    const stages = [[random(...interval), 1, 0.5]]
    for (let k = 1; k < 4; ++k) {
      for (let j = 0; j < 5 * k; ++j) {
        stages.push([random(...interval), random(1, k)])
      }
    }

    return stages
  }

  onInterval (pointer: number) {
    if (pointer <= 1) {
      const building = new BuildingState([this.camera, 0, pointer])
      this.entities.append(building)
      // $FlowExpectedError[invalid-tuple-index]
      this.intervals[pointer] = FREE_AREA * TILE_SIZE + building.height
    } else {
      if (this.stages.length === 0) return
      // $FlowExpectedError[prop-missing]
      const stage = nullthrows(this.stages.shift())
      for (let i = 0; i < stage[1]; ++i) {
        const x =
          0.5 * Dimentions.width +
          (stage[2] == null
            ? random(-0.4 * PLAY_AREA, 0.4 * PLAY_AREA) * TILE_SIZE
            : stage[2])

        this.entities.append(new MinionState([x, this.camera.y - 10]))
      }

      this.intervals[2] = stage[0]
    }
  }
}
