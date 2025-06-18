import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

// 简单的copy插件
function copy(targets) {
  return {
    name: 'copy',
    generateBundle() {
      const fs = require('fs')
      const path = require('path')

      targets.forEach(({ src, dest }) => {
        const destDir = path.dirname(dest)
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true })
        }
        fs.copyFileSync(src, dest)
      })
    }
  }
}

export default [
  // ES Module build
  {
    input: 'src/index.js',
    output: {
      file: 'lib/index.esm.js',
      format: 'es'
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**'
      }),
      copy([
        { src: 'xzx-icon-svg.js', dest: 'lib/xzx-icon-svg.js' }
      ])
    ],
    external: ['vue']
  },
  // CommonJS build
  {
    input: 'src/index.js',
    output: {
      file: 'lib/index.js',
      format: 'cjs',
      exports: 'named'
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**'
      })
    ],
    external: ['vue']
  },
  // UMD build for CDN
  {
    input: 'src/index.js',
    output: {
      file: 'lib/index.umd.js',
      format: 'umd',
      name: 'XzxIconVue2',
      exports: 'named',
      globals: {
        vue: 'Vue'
      }
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**'
      })
    ],
    external: ['vue']
  },
  // Minified UMD build
  {
    input: 'src/index.js',
    output: {
      file: 'lib/index.umd.min.js',
      format: 'umd',
      name: 'XzxIconVue2',
      exports: 'named',
      globals: {
        vue: 'Vue'
      }
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**'
      }),
      terser()
    ],
    external: ['vue']
  }
]
