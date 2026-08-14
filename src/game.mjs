/* @flow */

import { createEngine } from './engine.mjs'
import { gameState } from './gameState.mjs'
import { GamePlayState } from './states/game/GamePlayState.mjs'
import { StateMachine } from './states/StateMachine.mjs'

async function initGame () {
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
  gameState.render()
}

createEngine(initGame, updateGame, renderGame)
