/* @flow */

import { SPARK_SIZE, SPARK_SPEED } from '../constants.mjs'
import { random } from '../libs/random.mjs'
import { range } from '../libs/range.mjs'
import { SparkState } from '../states/entities/SparkState.mjs'

const directions = 7
const angles = range(directions).map((_, i) => (i * 360) / directions)

export function genExplosion (x: number, y: number): ReadonlyArray<SparkState> {
  const shift = random(45)
  return angles.map((a, i) => {
    const spark = new SparkState([x, y, i % 3])
    spark.directByAngle(a + shift, SPARK_SPEED)
    spark.shiftByAngle(a + shift, SPARK_SIZE)
    return spark
  })
}
