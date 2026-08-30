/* @flow */

import { PLAY_AREA, TILE_SIZE } from '../../constants.mjs'
import { Dimentions, rect, setColor, shape } from '../../engine.mjs'
import type { CameraState } from '../helpers/CameraState.mjs'
import { WallState } from './WallState.mjs'

const t0 = 1.2

function getDimentions (
  type: number,
  side: number,
  cameraY: number
): Readonly<[number, number, number, number]> {
  switch (type) {
    case 0: {
      const w = 7 * TILE_SIZE
      const h = 9 * TILE_SIZE
      const x =
        side === 0
          ? 0.5 * (Dimentions.width - PLAY_AREA * TILE_SIZE) - w
          : 0.5 * (Dimentions.width + PLAY_AREA * TILE_SIZE)
      return [x, cameraY - h, w, h]
    }
  }

  throw new Error('Unknown type')
}

function v (x1: number, x2: number, t: number): number {
  return x1 + t * (x2 - x1)
}

type BuildingProps = Readonly<[camera: CameraState, type: number, side: number]>

export class BuildingState extends WallState {
  camera: CameraState
  type: number

  constructor (props: BuildingProps) {
    super(getDimentions(props[1], props[2], props[0].y))

    this.camera = props[0]
    this.type = props[1]
  }

  render () {
    this.renderOne()
  }

  renderOne () {
    const t1 = (t0 - 1) * 1.4 + 1
    const ox = this.camera.x + 0.5 * Dimentions.width
    const oy = this.camera.y + 0.5 * Dimentions.height

    const bx0 = this.x
    const by0 = this.y
    const bx1 = this.x + this.width
    const by1 = this.y + this.height

    const tx0 = v(ox, bx0, t0)
    const ty0 = v(oy, by0, t0)
    const tx1 = v(ox, bx1, t0)
    const ty1 = v(oy, by1, t0)

    const tx2 = v(ox, bx0 + 0.5 * this.width, t1)
    const ty2 = v(oy, by0, t1)
    const ty3 = v(oy, by1, t1)

    setColor('#c8afb9')
    // top
    if (by0 < ty0) {
      shape('fill', tx2, ty2, tx1, ty0, bx1, by0, bx0, by0, tx0, ty0)
      this.renderFrontWindow(bx0 + 0.5 * this.width, by0, (t0 - 1) * 0.4 + 1)
      this.renderFrontWindow(bx0 + 0.5 * this.width, by0, (t0 - 1) * 0.9 + 1)
    }
    // bottom
    if (by1 > ty1) {
      shape('fill', tx2, ty3, tx1, ty1, bx1, by1, bx0, by1, tx0, ty1)
      this.renderFrontWindow(bx0 + 0.5 * this.width, by1, (t0 - 1) * 0.4 + 1)
      this.renderFrontWindow(bx0 + 0.5 * this.width, by1, (t0 - 1) * 0.9 + 1)
    }

    setColor('#a493a4')
    // left side
    if (bx1 > tx1) shape('fill', tx1, ty0, bx1, by0, bx1, by1, tx1, ty1)
    // right side
    if (bx0 < tx0) shape('fill', tx0, ty0, bx0, by0, bx0, by1, tx0, ty1)

    // roof
    setColor('#2a4062')
    shape('fill', tx2, ty2, tx1, ty0, tx1, ty1, tx2, ty3)
    setColor('#5A668C')
    shape('fill', tx0, ty0, tx2, ty2, tx2, ty3, tx0, ty1)
  }

  renderFrontWindow (x: number, y: number, t: number) {
    const dt = (t0 - 1) * 0.2
    const ox = this.camera.x + 0.5 * Dimentions.width
    const oy = this.camera.y + 0.5 * Dimentions.height
    const left = x - 0.5 * TILE_SIZE
    const right = x + 0.5 * TILE_SIZE

    const x0 = v(ox, left, t)
    const x1 = v(ox, right, t)
    const x2 = v(ox, right, t + dt)
    const x3 = v(ox, left, t + dt)
    const y0 = v(oy, y, t)
    const y2 = v(oy, y, t + dt)

    setColor('#2a4062')
    shape('fill', x0, y0, x1, y0, x2, y2, x3, y2)
  }
}
