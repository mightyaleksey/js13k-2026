/* @flow */

export const TILE_SIZE = 16
export const MOVEMENT_SPEED = 100

// array index reflects corresponding direction, i.e. top, right, bottom, left
export const MOVEMENT_KEYS = ['w', 'd', 's', 'a', 'ц', 'в', 'ы', 'ф']
// array index reflects corresponding direction, i.e. top, right, bottom, left
export const UNIT_VECTORS = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0]
]
