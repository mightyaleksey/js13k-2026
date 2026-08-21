/* @flow */

export const TILE_SIZE: number = 16
export const CAMERA_SPEED: number = 20
export const MINION_SPEED: number = 20
export const PLAYER_SPEED: number = 100
export const PROJECTILE_SPEED: number = 140

// array index reflects corresponding direction, i.e. top, right, bottom, left
export const MOVEMENT_KEYS: ReadonlyArray<string> = [
  'w',
  'd',
  's',
  'a',
  'ц',
  'в',
  'ы',
  'ф'
]
// array index reflects corresponding direction, i.e. top, right, bottom, left
export const UNIT_VECTORS: ReadonlyArray<ReadonlyArray<number>> = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0]
]

export const DEBUG_PANEL = true
