/* @flow */

export class Animation {
  currentFrame: number
  frames: ReadonlyArray<number>
  frameTime: number
  timer: number

  constructor (frames: ReadonlyArray<number>, frameTime: number) {
    this.currentFrame = 0
    this.frames = frames
    this.frameTime = frameTime
    this.timer = 0
  }

  getCurrentFrame (): number {
    return this.frames[this.currentFrame]
  }

  update (delta: number) {
    this.timer += delta

    if (this.timer >= this.frameTime) {
      this.timer -= this.frameTime
      this.currentFrame = (this.currentFrame + 1) % this.frames.length
    }
  }
}
