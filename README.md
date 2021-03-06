# joiprops
Use [Joi Schemas](https://joi.dev/) for your [Vue](https://vuejs.org/) component prop validation (and deep structure defaults).

[![npm version](https://badge.fury.io/js/joiprops.svg)](https://badge.fury.io/js/joiprops)
[![Build Status](https://travis-ci.com/rjrodger/joiprops.svg?branch=main)](https://travis-ci.com/rjrodger/joiprops)
[![Coverage Status](https://coveralls.io/repos/github/rjrodger/joiprops/badge.svg?branch=main)](https://coveralls.io/github/rjrodger/joiprops?branch=main)
[![Maintainability](https://api.codeclimate.com/v1/badges/29eef52f3d37f09a2d26/maintainability)](https://codeclimate.com/github/rjrodger/joiprops/maintainability)
[![dependencies Status](https://david-dm.org/rjrodger/joiprops/status.svg)](https://david-dm.org/rjrodger/joiprops)


## Why?

Vue props that have deep object structure (including defaults) cannot
be easily defined using standard Vue prop validation which has
[all-or-nothing defaults](https://vuejs.org/v2/api/#props).

The [Joi](https://joi.dev/) schema validator provides a way to do this.


## How?

A Vue mixin is used as this provides sufficient access to the prop
definitions before the component lifecycle starts.


## Quick Example

This example creates an `a` prop (notice that you don't need to define
this in the traditional `props` component attribute) that is a object
with partial defaults. Using the standard Vue prop `default` function
would obliterate the value of `a.c`, whereas the _joiprops_ mixin
preserves the value.

```
// file: Foo.vue
<template>
<div>
  <h1>Foo</h1>
  <p>A: {{ a }}</p>
</div>
</template>

<script>
import { JoiProps, Joi } from 'joiprops'

export default {
  name: '',
  mixins: [
    JoiProps({
      a: Joi.object({
        b: Joi.string().default('B'),
        c: Joi.string()
      }).default()
    })
  ],
}
</script>


// file: App.vue
<template>
<div>
  <h1>APP</h1>
  <foo :a="a"></foo>
</div>
</template>

<script>
export default {
  name: "app",
  data: function() {
    return {
      a: {
        c: 'C'
      }
    }
  },
}
</script>

// HTML:
<div>
  <h1>APP</h1>
  <div>
    <h1>Foo</h1>
    <p>A: { "c": "C", "b": "B" }</p>
  </div>
</div>
```

## Install

```sh
npm install joiprops
```


## Important Notes

* Access to `Joi` is provided so you don't need to import it separately: `import { JoiPrps, Joi } from 'joiprops'`
  * When bundling (and perhaps using `Joi` elsewhere), you may wish to import `dist/joiprops.js` directly for better tree shaking. You need to import the dependencies [joiprops](https://www.npmjs.com/package/joiprops) and [nua](https://www.npmjs.com/package/nua) separately yourself.
* `JoiProps` is a function that builds a mixin from your Joi schema. Use it like so:
```
export default {
  ...
  mixins: [
    ...
    JoiProps({...})
    ...
  ]
  ...
}
```
* The first argument to `JoiProps` can be a plain object or a `Joi` schema. In either case, the top level keys become the props of the Vue component.
* You can use traditional props at the same time as `JoiProps` if you define your schema with a plain object, or the schema you provide allows for unknown keys.
* `Joi` is big-ish, and not orginally designed for browsers, but I guess if you've read this far, you, like me, kind like it in your web apps anyway...


## Convenience Schemas

Joi schemacs can be little verbose, so _joiprops_ provides some
convenience abbreviations:

```
import { JoiProps, Joi, JO, JS } from 'joiprops'

const props = JoiProps({
  foo: JO({
    bar: JS('BAR')
  })
})

// equivalent:
const props = JoiProps({
  foo: Joi.object({
    bar: Joi.string('BAR')
  })
})
```

The available abbreviations are:
* `JO()`: `Joi.object()`
* `JA()`: `Joi.array()`
* `JS()`: `Joi.string()`
* `JN()`: `Joi.number()`
* `JB()`: `Joi.boolean()`
* `JT`: `Joi.boolean().default(true)`
* `JF`: `Joi.boolean().default(false)`
* `JS(stringValue)`: `Joi.string().default(stringValue)`
* `JN(numberValue)`: `Joi.number().default(numberValue)`
* `JB(booleanValue)`: `Joi.boolean().default(booleanValue)`
* `JO(objectSchema)`: `Joi.object(objectSchema)`
* `JA(itemSchema)`: `Joi.array().items(itemSchema)`
* `JS(Jr)`: `Joi.string().required()`
* `JN(Jr)`: `Joi.number().required()`
* `JB(Jr)`: `Joi.boolean().required()`
* `JA(Jr)`: `Joi.array().required()`
* `JO(Jr)`: `Joi.object().required()`
* `JOd(objectValue)`: `Joi.object().default(objectValue)`
* `JAd(arrayValue)`: `Joi.object().default(arrayValue)`
* `JOu(objectSchema)`: `Joi.object().default(objectValue)`

Import the abbreviations as needed from `JoiProps`:
```
import { JoiProps, Joi, JT, JF, JB, JS, JN, JO, JA, JOu, JOd, JAd, Jr } from 'joiprops'
```


# Building

* The main code is TypeScript, but the tests are JavaScript.
  * Run `npm run watch` to compile on demand.
* The project is also a [vue-cli](https://cli.vuejs.org/) app for browser testing.
  * Run `npm run serve` as normal.
  
  
## License

Copyright (c) 2020 Richard Rodger.
Licensed under [MIT](./LICENSE).
