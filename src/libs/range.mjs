/* @flow */

export function range (start: number, stop?: number): Array<number> {
  if (stop == null) {
    stop = start
    start = 0
  }

  const r = []
  for (let i = start; i < stop; ++i) {
    r.push(i)
  }

  return r
}
