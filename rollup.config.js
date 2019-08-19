import del from 'rollup-plugin-delete'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
// import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

export default [
  {
    input: 'src/index.js',
    output: [
      { file: pkg.module, format: 'es' },
      { file: pkg.main, format: 'cjs' },
      {
        name: 'apm',
        file: pkg.browser,
        format: 'iife',
      },
    ],
    plugins: [
      del({ targets: 'dist/*' }),
      resolve(),
      commonjs({
        namedExports: {
          [require.resolve('es6-promise')]: ['Promise'],
        },
      }),
      babel({
        presets: ['@babel/env'],
        runtimeHelpers: true,
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            {
              corejs: 3,
            },
          ],
        ],
      }),
      // terser(),
    ],
    onwarn(warning, rollupWarn) {
      if (warning.code !== 'CIRCULAR_DEPENDENCY') {
        rollupWarn(warning)
      }
    },
  },
]
