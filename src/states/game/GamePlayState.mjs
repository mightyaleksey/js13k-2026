/* @flow */

import {
  CAMERA_MX,
  CAMERA_SPEED,
  DEBUG_BB,
  DEBUG_PANEL,
  PLAY_AREA,
  TILE_SIZE
} from '../../constants.mjs'
import { Dimentions, translate } from '../../engine.mjs'
import { Console } from '../../ui/Console.mjs'
import { BaseState } from '../BaseState.mjs'
import { PlayerState } from '../entities/PlayerState.mjs'
import { CameraState } from '../helpers/CameraState.mjs'
import { EntitiesState } from '../helpers/EntitiesState.mjs'
import { GridState } from '../helpers/GridState.mjs'
import { LevelState } from '../helpers/LevelState.mjs'

/**
 * Level & Camera logic
 *
 * |     |   Let's assume that player moves from bottom to top meaning terrain
 * |  ^  |   moves in the opposite direction. And bottom part of the level will
 * |     |   the start of the coordinate system. Thus starting values will be:
 * |  ^  |
 * |     |   - player { x: w/2, y: 0 }
 * |  p  |   - camera { x: 0, y: -h }
 */

export class GamePlayState extends BaseState {
  camera: CameraState
  level: LevelState
  entities: EntitiesState
  player: PlayerState

  startY: number

  console: Console
  grid: GridState

  enter () {
    this.camera = new CameraState()
    this.entities = new EntitiesState({ camera: this.camera })
    this.level = new LevelState({
      camera: this.camera,
      entities: this.entities
    })
    this.player = new PlayerState([
      0.5 * (Dimentions.width - TILE_SIZE),
      -3 * TILE_SIZE
    ])

    this.entities.append(this.player)
    this.startY = this.camera.y

    // $FlowExpectedError[constant-condition]
    if (DEBUG_PANEL) {
      this.console = new Console({ x: 8, y: 16 })
    }
    // $FlowExpectedError[constant-condition]
    if (DEBUG_BB) {
      this.grid = new GridState()
    }
  }

  render () {
    // emulate camera effect
    translate(-this.camera.x, -this.camera.y)
    // terrain & enemies
    this.level.render()
    this.entities.render()
    // restore camera
    translate(this.camera.x, this.camera.y)

    // $FlowExpectedError[constant-condition]
    if (DEBUG_BB) {
      this.grid.render()
    }
    // $FlowExpectedError[constant-condition]
    if (DEBUG_PANEL) {
      this.console.render({
        vw: Dimentions.width,
        vh: Dimentions.height,
        camera: this.camera.y,
        entities: this.entities.list.length
      })
    }
  }

  update (delta: number) {
    this.camera.update(delta)

    this.camera.x =
      CAMERA_MX * (this.player.x - 0.5 * (Dimentions.width - TILE_SIZE))

    if (this.camera.isMoving) {
      this.player.y += this.camera.dy * delta

      if (this.level.distance < this.startY - this.camera.y) {
        const dy = this.startY - this.camera.y - this.level.distance
        this.player.y += dy
        this.camera.y += dy
        this.camera.isMoving = false
      }
    }

    this.level.update(delta)
    this.entities.update(delta)
  }
}
