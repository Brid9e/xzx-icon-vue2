import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

const pkg = require('./package.json')

export default [
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
        babelrc: true
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
        babelrc: true
      })
    ]
  },
  // UMD build
  {
    input: 'src/index.js',
    output: {
      file: 'lib/index.umd.js',
      format: 'umd',
      name: 'XzxIconVue2'
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        babelrc: true
      })
    ]
  },
  // UMD build (minified)
  {
    input: 'src/index.js',
    output: {
      file: 'lib/index.umd.min.js',
      format: 'umd',
      name: 'XzxIconVue2'
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        babelrc: true
      }),
      terser()
    ]
  }
]
