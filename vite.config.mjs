import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

import { ectPlugin } from './plugins/vite-plugin-ect.mjs'
import { roadrollerPlugin } from './plugins/vite-plugin-roadroller.mjs'

import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * Environment flags:
 *
 * USE_RR_CONFIG=1 - use existing roadroller config ('readroller-config.json').
 */

const babelConfig = {
  include: /\.m?js$/,
  plugins: [
    'babel-plugin-syntax-hermes-parser',
    '@babel/plugin-transform-flow-strip-types'
  ],
  presets: ['@babel/preset-flow']
}

/**
 * @param {Object} props
 * @param {string} props.mode - development or production
 * @param {string} props.command - build or serve
 * @param {boolean} props.isSsrBuild
 * @param {boolean} props.isPreview
 */
export default defineConfig((props) => {
  switch (props.command) {
    case 'build':
      return {
        build: {
          assetsDir: '',
          assetsInlineLimit: 800,
          minify: true,
          modulePreload: { polyfill: false },
          outDir: resolve(dirname(fileURLToPath(import.meta.url)), 'docs'),
          target: 'es2020',
          emptyOutDir: true,
          rollupOptions: {
            output: {
              assetFileNames: '[name][extname]',
              codeSplitting: false
              // inlineDynamicImports: true
            }
          }
        },
        esbuild: true,
        plugins: [babel(babelConfig), roadrollerPlugin(), ectPlugin()]
      }

    default:
      return { plugins: [babel(babelConfig)], server: { port: 1234 } }
  }
})
