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
import { initSoundBank } from './sound.mjs'
import { GamePlayState } from './states/game/GamePlayState.mjs'
import { StateMachine } from './states/StateMachine.mjs'

async function initGame () {
  const asset = await newImage('./texture.png')
  const bgScale = 8

  // $FlowExpectedError[prop-missing]
  gameTiles.push(
    ...genQuads(
      await scaleQuad(asset, bgScale),
      bgScale * TILE_SIZE,
      bgScale * TILE_SIZE,
      0,
      0,
      bgScale * 2 * TILE_SIZE,
      bgScale * TILE_SIZE
    ),
    ...genQuads(asset, 19, 32, 2 * TILE_SIZE, 0, 89, 2 * TILE_SIZE),
    ...genQuads(
      asset,
      TILE_SIZE,
      TILE_SIZE,
      89,
      16,
      89 + TILE_SIZE,
      16 + TILE_SIZE
    )
  )

  // reset global game state
  gameState.stack = []
  // sets all the screens
  gameState.push(
    new StateMachine({ play: () => new GamePlayState() }).change('play')
  )

  await initSoundBank()
}

function updateGame (delta: number) {
  gameState.update(delta)
}

function renderGame () {
  setFont('12px/1.3 Consolas, monaco, monospace')
  gameState.render()
}

createEngine(initGame, updateGame, renderGame)
