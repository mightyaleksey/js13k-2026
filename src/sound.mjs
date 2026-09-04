/* @flow */

import { nullthrows } from './libs/nullthrows.mjs'
import { zzfx, zzfxP, zzfxSV } from './libs/zzfxm/zzfx.mjs'
import { zzfxM } from './libs/zzfxm/zzfxm.min.mjs'

type SoundType =

    | 'error'
    | 'match'
    | 'select'
    | 'death'
    | 'hit'
    | 'laser'
    | 'pickup'
    | 'powerup'

const _music = { buffer: null, current: null }
const _soundBank: { [SoundType]: Array<unknown> } = {}

export async function initSoundBank () {
  _soundBank.death = [
    ,
    ,
    48,
    0.05,
    0.24,
    0.47,
    4,
    3,
    3,
    -5,
    ,
    ,
    ,
    1,
    ,
    0.1,
    ,
    0.3,
    0.09
  ]
  _soundBank.hit = [
    ,
    ,
    438,
    0.02,
    0.03,
    0.17,
    4,
    2.6,
    ,
    ,
    ,
    ,
    0.04,
    0.9,
    12,
    0.1,
    ,
    0.46,
    0.02,
    0.08,
    198
  ]
  _soundBank.laser = [
    1.1,
    ,
    227,
    0.01,
    0.17,
    0.07,
    2,
    0.6,
    6,
    17,
    ,
    ,
    ,
    ,
    15,
    0.5,
    0.27,
    0.92,
    0.2,
    ,
    794
  ]
  _soundBank.pickup = [
    ,
    ,
    397,
    ,
    0.03,
    0.07,
    ,
    0.6,
    1,
    -37,
    240,
    0.05,
    ,
    ,
    ,
    ,
    ,
    0.87,
    0.01
  ]
  _soundBank.powerup = [
    ,
    ,
    460,
    0.1,
    0.23,
    0.15,
    1,
    2.8,
    9,
    ,
    280,
    0.08,
    0.06,
    ,
    ,
    ,
    ,
    0.71,
    0.21
  ]
}

export function playSound (name: SoundType) {
  const sound = nullthrows(_soundBank[name])
  zzfxSV(0.1)
  zzfx(...sound)
}

export function playMusic () {
  if (_music.current == null) {
    zzfxSV(0.4)
    _music.current = zzfxP(..._music.buffer)
    _music.current.loop = true
  }
}

function _renderSond (song: Array<unknown>): Promise<empty> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(zzfxM(...song)), 20)
  })
}
