/* @flow */

type RGB = [number, number, number]

export function hex2rgb (hex: string): RGB {
  // accepts full form, like #aabbcc (not #abc)
  // $FlowFixMe[invalid-tuple-arity]
  return [1, 3, 5].map((p) => parseInt(hex.substring(p, p + 2), 16))
}

export function rgb2hex (rgb: RGB): string {
  return '#' + rgb.map((d) => (d >> 0).toString(16).padStart(2, '0')).join('')
}

export function brightness ([r, g, b]: RGB): number {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function desaturate (hex: string, t: number): string {
  const rgb = hex2rgb(hex)
  const y = brightness(rgb)
  // $FlowFixMe[invalid-tuple-arity]
  return rgb2hex(rgb.map((d) => d * (1 - t) + y * t))
}
