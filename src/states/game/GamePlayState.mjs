/* @flow */

import { CAMERA_SPEED, DEBUG_PANEL, TILE_SIZE } from '../../constants.mjs'
import { Dimentions, translate } from '../../engine.mjs'
import { Console } from '../../ui/Console.mjs'
import { BaseState } from '../BaseState.mjs'
import { PlayerState } from '../entities/PlayerState.mjs'
import { EntitiesState } from '../helpers/EntitiesState.mjs'
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
  cameraX: number
  cameraY: number

  level: LevelState
  entities: EntitiesState
  player: PlayerState

  console: Console

  isCameraMoving: boolean

  enter () {
    this.cameraX = 0
    this.cameraY = -Dimentions.height

    this.entities = new EntitiesState()
    this.player = new PlayerState({
      x: 0.5 * (Dimentions.width - TILE_SIZE),
      y: -3 * TILE_SIZE
    })

    this.level = new LevelState(this.entities)
    this.entities.list.push(this.player)
    this.player.entities = this.entities

    this.isCameraMoving = true

    // $FlowExpectedError[constant-condition]
    if (DEBUG_PANEL) {
      this.console = new Console({ x: 8, y: 16 })
    }
  }

  render () {
    // emulate camera effect
    translate(-this.cameraX, -this.cameraY)
    // terrain & enemies
    this.entities.render()
    // restore camera
    translate(this.cameraX, this.cameraY)

    // $FlowExpectedError[constant-condition]
    if (DEBUG_PANEL) {
      this.console.render({
        vw: Dimentions.width,
        vh: Dimentions.height,
        cameraX: this.cameraX,
        cameraY: this.cameraY,
        entities: this.entities.list.length
      })
    }
  }

  update (delta: number) {
    if (this.isCameraMoving) {
      this.cameraY = this.cameraY - CAMERA_SPEED * delta
      this.player.y = this.player.y - CAMERA_SPEED * delta

      if (this.cameraY + this.level.length < 0) {
        // dy is likely negative
        const dy = this.cameraY + this.level.length
        this.cameraY = this.cameraY - dy
        this.player.y = this.player.y - dy

        this.isCameraMoving = false
      }
    }

    this.level.cameraX = this.cameraX
    this.level.cameraY = this.cameraY
    this.entities.cameraX = this.cameraX
    this.entities.cameraY = this.cameraY

    this.level.update(delta)
    this.entities.update(delta)
  }
}
