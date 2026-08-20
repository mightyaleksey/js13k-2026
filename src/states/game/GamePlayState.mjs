/* @flow */

import { CAMERA_SPEED, DEBUG_PANEL, TILE_SIZE } from '../../constants.mjs'
import { Dimentions, translate } from '../../engine.mjs'
import { Console } from '../../ui/Console.mjs'
import { BaseState } from '../BaseState.mjs'
import { PlayerState } from '../entities/PlayerState.mjs'
import { EntitiesState } from '../helpers/EntitiesState.mjs'
import { LevelState } from '../helpers/LevelState.mjs'

export class GamePlayState extends BaseState {
  cameraX: number
  cameraY: number

  level: LevelState
  entities: EntitiesState
  player: PlayerState

  console: Console

  enter () {
    this.cameraX = 0
    this.cameraY = 0

    this.entities = new EntitiesState()
    this.player = new PlayerState({
      x: 0.5 * (Dimentions.width - TILE_SIZE),
      y: Dimentions.height - 3 * TILE_SIZE
    })

    this.level = new LevelState(this.entities)
    this.entities.list.push(this.player)

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

    this.player.render()

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
    this.cameraY = this.cameraY - CAMERA_SPEED * delta

    this.level.cameraX = this.cameraX
    this.level.cameraY = this.cameraY
    this.entities.cameraX = this.cameraX
    this.entities.cameraY = this.cameraY

    this.level.update(delta)
    this.entities.update(delta)
    this.player.update(delta)
  }
}
