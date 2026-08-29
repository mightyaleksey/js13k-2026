/* @flow */

import { Dimentions, rect, setColor, shape } from '../../engine.mjs'
import { pixel } from '../../libs/render.mjs'
import { BaseState } from '../BaseState.mjs'
import { EntityState } from '../entities/EntityState.mjs'
import type { CameraState } from '../helpers/CameraState.mjs'

function v (x1: number, x2: number, t: number): number {
  return x1 + t * (x2 - x1)
}

// [ x, y, z, width, length, height ]
type HouseProps = Readonly<
  [
    CameraState,
    x: number,
    y: number,
    z: number,
    width: number,
    height: number,
    length: number
  ]
>

export class HouseState extends EntityState<> {
  z: number
  length: number

  camera: CameraState

  constructor (props: HouseProps) {
    super([props[1], props[2], props[4], props[5]])

    this.z = props[3]
    this.length = props[6]

    this.camera = props[0]
  }

  render () {
    this.renderTBuilding()
  }

  /* helpers */

  renderCube () {
    const t = this.length
    const ox = this.camera.x + 0.5 * Dimentions.width
    const oy = this.camera.y + 0.5 * Dimentions.height

    const x0 = v(ox, this.x, t)
    const y0 = v(oy, this.y, t)
    const x1 = v(ox, this.x + this.width, t)
    const y1 = v(oy, this.y + this.height, t)
    const x2 = this.x
    const y2 = this.y
    const x3 = this.x + this.width
    const y3 = this.y + this.height

    const xm = v(ox, this.x + 0.5 * this.width, t + 0.2)
    const y4 = v(oy, this.y, t + 0.2)
    const y5 = v(oy, this.y + this.height, t + 0.2)

    /**
     * Cube
     * (top side)
     * [4, 5] - [6, 5]
     * [0, 1] - [2, 1]
     * (right side)
     * [2, 1] - [6, 5]
     * [2, 3] - [6, 7]
     * (bottom side)
     * [4, 7] - [6, 7]
     * [0, 3] - [2, 3]
     */

    //  0, 1, 2, 3, 4, 5, 6, 7
    // x0,y0,x1,y1,x2,y2,x3,y3

    setColor('#c8afb9')
    if (y0 > y2) shape('fill', x2, y2, x3, y2, x1, y0, x0, y0)
    if (y1 < y3) shape('fill', x2, y3, x3, y3, x1, y1, x0, y1)

    setColor('#a493a4')
    shape('fill', x1, y0, x3, y2, x3, y3, x1, y1)

    setColor('#2a4062')
    shape('fill', x0, y0, x1, y0, x1, y1, x0, y1)
  }

  renderTBuilding () {
    const t = this.length
    const ox = this.camera.x + 0.5 * Dimentions.width
    const oy = this.camera.y + 0.5 * Dimentions.height

    const x0 = v(ox, this.x, t)
    const y0 = v(oy, this.y, t)
    const x1 = v(ox, this.x + this.width, t)
    const y1 = v(oy, this.y + this.height, t)
    const x2 = this.x
    const y2 = this.y
    const x3 = this.x + this.width
    const y3 = this.y + this.height

    const xm = v(ox, this.x + 0.5 * this.width, t + 0.2)
    const y4 = v(oy, this.y, t + 0.2)
    const y5 = v(oy, this.y + this.height, t + 0.2)

    /**
     * Cube
     * (top side)
     * [4, 5] - [6, 5]
     * [0, 1] - [2, 1]
     * (right side)
     * [2, 1] - [6, 5]
     * [2, 3] - [6, 7]
     * (bottom side)
     * [4, 7] - [6, 7]
     * [0, 3] - [2, 3]
     */

    //  0, 1, 2, 3, 4, 5, 6, 7
    // x0,y0,x1,y1,x2,y2,x3,y3

    setColor('#c8afb9')
    if (y0 > y2) shape('fill', x2, y2, x3, y2, x1, y0, xm, y4, x0, y0)
    if (y1 < y3) shape('fill', x2, y3, x3, y3, x1, y1, xm, y5, x0, y1)

    setColor('#a493a4')
    shape('fill', x1, y0, x3, y2, x3, y3, x1, y1)

    setColor('#2a4062')
    shape('fill', x0, y0, xm, y4, xm, y5, x0, y1)
    setColor('#5A668C')
    shape('fill', x1, y0, xm, y4, xm, y5, x1, y1)
  }

  /**
   * Cube
   * (top side)
   * [4, 5] - [6, 5]
   * [0, 1] - [2, 1]
   * (right side)
   * [2, 1] - [6, 5]
   * [2, 3] - [6, 7]
   * (bottom side)
   * [4, 7] - [6, 7]
   * [0, 3] - [2, 3]
   */
  genCubeCoords (): Readonly<
    [number, number, number, number, number, number, number, number]
  > {
    const t = this.length
    const ox = this.camera.x + 0.5 * Dimentions.width
    const oy = this.camera.y + 0.5 * Dimentions.height
    return [
      ox + t * (this.x - ox),
      oy + t * (this.y - oy),
      ox + t * (this.x + this.width - ox),
      oy + t * (this.y + this.height - oy),
      this.x,
      this.y,
      this.x + this.width,
      this.y + this.height
    ]
  }
}
