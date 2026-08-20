/* @flow */

import { createEngine, setFont } from './engine.mjs'
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
  setFont('12px/1.3 Consolas, monaco, monospace')
  gameState.render()
}

createEngine(initGame, updateGame, renderGame)
