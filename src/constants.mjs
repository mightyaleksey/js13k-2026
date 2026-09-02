/* @flow */

export const TILE_SIZE: number = 16
export const PLAY_AREA: number = 10
export const FREE_AREA: number = 3

export const CAMERA_MX: number = (PLAY_AREA - 1) / PLAY_AREA

export const CAMERA_SPEED: number = 40
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

export const DEBUG_BB: boolean = false
export const DEBUG_PANEL: boolean = true

export type CharType = Readonly<{
  frames: ReadonlyArray<ReadonlyArray<number>>,
  frameInterval: number
}>

export const FRAMES: Readonly<{ [string]: CharType }> = {
  minion: { frames: [[5]], frameInterval: 0.2 },
  player: { frames: [[3], [4, 3, 2, 3]], frameInterval: 0.2 }
}
