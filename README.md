# issue-example

1. clone this repo
2. open `index.html` in browser

## problem

[issue](https://github.com/rollup/rollup-plugin-babel/issues/254#issuecomment-423762114)

## how to fix

```diff
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
+  exclude: [/runtime-corejs3/, /core-js/],
}),
```
