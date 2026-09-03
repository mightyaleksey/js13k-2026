/* @flow */

import {
  PARTICLE_DURATION,
  PARTICLE_SIZE,
  PARTICLE_SPEED,
  TILE_SIZE
} from '../../constants.mjs'
import {
  circle,
  line,
  rect,
  restore,
  rotate,
  save,
  setColor,
  shape,
  translate
} from '../../engine.mjs'
import { random } from '../../libs/random.mjs'
import { range } from '../../libs/range.mjs'
import { DelayedDeathStatus } from '../../statuses/DelayedDeathStatus.mjs'
import { RotationStatus } from '../../statuses/RotationStatus.mjs'
import { EntityState } from './EntityState.mjs'

const anglesCount = 7
const angles = range(anglesCount).map((_, i) => (360 / anglesCount) * i)
const opacity = 1

const palette = [
  '#fec89a',
  '#f49595',
  '#eeceda',
  '#f3d17c',
  '#d0edef',
  '#f1deee'
]

export function genParticles (
  x: number,
  y: number,
  t: number
): ReadonlyArray<ParticleState> {
  const offset = random(30)
  return angles.map((a) =>
    new ParticleState([x, y, t]).byAngle(a + offset, PARTICLE_SPEED))
}

export type ParticleProps = Readonly<[x: number, y: number, t: number]>

export class ParticleState extends EntityState<> {
  angle: number
  type: number

  constructor (props: ParticleProps) {
    super([props[0], props[1], PARTICLE_SIZE, PARTICLE_SIZE])

    this.angle = 0
    this.type = props[2]

    this.statuses.push(
      new DelayedDeathStatus([0, PARTICLE_DURATION]),
      new RotationStatus([0.1, 0])
    )

    this.isCollidable = false
  }

  render () {
    super.render()

    const ow = 0.5 * this.width
    const oh = 0.5 * this.height

    save()
    translate(this.x + ow, this.y + oh)
    rotate(this.angle)
    translate(-this.x - ow, -this.y - oh)

    switch (this.type) {
      case 0: {
        const r = 0.5 * this.width
        setColor(palette[0], opacity)
        circle('line', this.x + ow, this.y + ow, ow)
        break
      }

      case 1: {
        const r = 0.5 * this.width
        setColor(palette[1], opacity)
        circle('fill', this.x + ow, this.y + ow, ow)
        setColor(palette[0])
        circle('line', this.x + ow, this.y + ow, ow)
        break
      }

      case 2: {
        setColor(palette[2], opacity)
        rect('line', this.x, this.y, this.width, this.height)
        break
      }

      case 3: {
        setColor(palette[3], opacity)
        rect('fill', this.x, this.y, this.width, this.height)
        setColor(palette[2])
        rect('line', this.x, this.y, this.width, this.height)
        break
      }

      case 4: {
        setColor(palette[4], opacity)
        line(this.x + ow, this.y, this.x + ow, this.y + this.height)
        line(this.x, this.y + oh, this.x + this.width, this.y + oh)
      }
    }

    restore()
  }
}
