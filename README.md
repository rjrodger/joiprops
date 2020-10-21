# joiprops
Use Joi Schemas for your Vue component prop validation (and deep structure defaults).

[![npm version](https://badge.fury.io/js/joiprops.svg)](https://badge.fury.io/js/joiprops)
[![Build Status](https://travis-ci.com/rjrodger/joiprops.svg?branch=main)](https://travis-ci.com/rjrodger/joiprops)
[![Coverage Status](https://coveralls.io/repos/github/rjrodger/joiprops/badge.svg?branch=main)](https://coveralls.io/github/rjrodger/joiprops?branch=main)
[![Maintainability](https://api.codeclimate.com/v1/badges/29eef52f3d37f09a2d26/maintainability)](https://codeclimate.com/github/rjrodger/joiprops/maintainability)
[![dependencies Status](https://david-dm.org/rjrodger/joiprops/status.svg)](https://david-dm.org/rjrodger/joiprops)


# Why?

Vue props that have deep object structure (including defaults) cannot
be easily defined using standard Vue prop validation which has
all-or-nothing defaults.

The [Joi](https://joi.dev/) schema validator provides a way to do this.


# How?

A Vue mixin is used as this provides sufficient access to the prop
definitions before the component lifecycle starts.


# Quick Example

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

# Important Notes

* Access to `Joi` is provided so you don't need to import it separately: `import { JoiPrps, Joi } from 'joiprops'`
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


