const resolve = require('@rollup/plugin-node-resolve').default
const commonjs = require('@rollup/plugin-commonjs').default
const babel = require('@rollup/plugin-babel').default
const terser = require('@rollup/plugin-terser').default

const pkg = require('./package.json')

module.exports = [
  // ES Module build
  {
    input: 'src/index.js',
    output: {
      file: 'lib/index.esm.js',
      format: 'es'
    },
    external: ['vue'],
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled'
      })
    ]
  },
  // CommonJS build
  {
    input: 'src/index.js',
    output: {
      file: 'lib/index.js',
      format: 'cjs',
      exports: 'auto'
    },
    external: ['vue'],
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled'
      })
    ]
  },
  // UMD build
  {
    input: 'src/index.js',
    output: {
      file: 'lib/index.umd.js',
      format: 'umd',
      name: 'XzxIconVue2',
      globals: {
        'vue': 'Vue'
      }
    },
    external: ['vue'],
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled'
      })
    ]
  },
  // UMD build (minified)
  {
    input: 'src/index.js',
    output: {
      file: 'lib/index.umd.min.js',
      format: 'umd',
      name: 'XzxIconVue2',
      globals: {
        'vue': 'Vue'
      }
    },
    external: ['vue'],
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled'
      }),
      terser()
    ]
  }
]
