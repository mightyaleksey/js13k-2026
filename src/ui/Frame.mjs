/* @flow */

type FrameProps = Readonly<{
  x?: number,
  y?: number,
  width?: number,
  height?: number
}>

export class Frame {
  x: number
  y: number
  width: number
  height: number

  constructor (props: FrameProps) {
    this.x = props.x ?? 0
    this.y = props.y ?? 0
    this.width = props.width ?? 0
    this.height = props.height ?? 0
  }
}
