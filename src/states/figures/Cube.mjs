/* @flow */

import { Dimentions, rect, setColor, shape } from '../../engine.mjs'
import { pixel } from '../../libs/render.mjs'
import { BaseState } from '../BaseState.mjs'
import { EntityState } from '../entities/EntityState.mjs'
import type { CameraState } from '../helpers/CameraState.mjs'

// x, y, z, width, length, height
type CubeProps = [CameraState, number, number, number, number, number, number]

export class Cube extends EntityState {
  x: number
  y: number
  z: number
  width: number
  length: number
  height: number

  camera: CameraState

  constructor (props: CubeProps) {
    super({})

    this.x = props[1]
    this.y = props[2]
    this.z = props[3]
    this.width = props[4]
    this.length = props[5]
    this.height = props[6]

    this.camera = props[0]
  }

  render () {
    const c = this.getCubeCoords()

    setColor('#c8afb9')
    if (c[1] > c[5])
      shape('fill', c[4], c[5], c[6], c[5], c[2], c[1], c[0], c[1])
    if (c[3] < c[7])
      shape('fill', c[4], c[7], c[6], c[7], c[2], c[3], c[0], c[3])

    setColor('#a493a4')
    shape('fill', c[2], c[1], c[6], c[5], c[6], c[7], c[2], c[3])

    setColor('#2a4062')
    shape('fill', c[0], c[1], c[2], c[1], c[2], c[3], c[0], c[3])
  }

  /* helpers */

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
  getCubeCoords () {
    const t = this.height
    const ox = this.camera.x + 0.5 * Dimentions.width
    const oy = this.camera.y + 0.5 * Dimentions.height
    return [
      ox + t * (this.x - ox),
      oy + t * (this.y - oy),
      ox + t * (this.x + this.width - ox),
      oy + t * (this.y + this.length - oy),
      this.x,
      this.y,
      this.x + this.width,
      this.y + this.length
    ]
  }
}
