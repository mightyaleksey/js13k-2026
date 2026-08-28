/* @flow */

import { TILE_SIZE } from './constants.mjs'
import {
  createEngine,
  genQuads,
  newImage,
  scaleQuad,
  setFont
} from './engine.mjs'
import { gameState } from './gameState.mjs'
import { gameTiles } from './gameTiles.mjs'
import { GamePlayState } from './states/game/GamePlayState.mjs'
import { StateMachine } from './states/StateMachine.mjs'

async function initGame () {
  const assetScale = 8
  const assets = await scaleQuad(await newImage('./bg.png'), assetScale)
  // $FlowExpectedError[prop-missing]
  gameTiles.push(
    ...genQuads(assets, assetScale * TILE_SIZE, assetScale * TILE_SIZE)
  )

  // reset global game state
  gameState.stack = []
  // sets all the screens
  gameState.push(
    new StateMachine({ play: () => new GamePlayState() }).change('play')
  )
}

function updateGame (delta: number) {
  gameState.update(delta)
}

function renderGame () {
  setFont('12px/1.3 Consolas, monaco, monospace')
  gameState.render()
}

createEngine(initGame, updateGame, renderGame)
