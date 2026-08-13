# babel-plugin-inline-env-var

Forked from [babel-plugin-transform-inline-environment-variables](https://github.com/babel/minify/tree/master/packages/babel-plugin-transform-inline-environment-variables) to work with Babel 8.

Inline environment variables.

## Example

### In

```js
// assuming process.env.NODE_ENV is actually "development"
process.env.NODE_ENV
```

### Out

```js
'development'
```

## Installation

```sh
npm install babel-plugin-inline-env-var --save-dev
```

## Usage

### Via `babel.config.js` (Recommended)

**.babelrc**

```js
// without options
const config = {
  plugins: ['inline-env-var'],
}
export default config

// with options
const config = {
  plugins: [
    [
      'inline-env-var',
      {
        include: ['NODE_ENV'],
      },
    ],
  ],
}
export default config
```

### Via CLI

```sh
babel --plugins inline-env-var script.js
```

### Via Node API

```js
import { transformFileAsync } from '@babel/core'

const { code } = await transformFileAsync(filePath, {
  plugins: ['inline-env-var'],
})
```

## Options

- `include` - array of environment variables to include
- `exclude` - array of environment variables to exclude

## License

[MIT](https://opensource.org/licenses/MIT)
