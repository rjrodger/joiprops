<template>
<div>
  <h2>FOO</h2>
  <p>A: {{ a }}</p>
</div>
</template>

<script>
import { JoiProps, Joi } from '..'

export default {
  name: 'foo',
  mixins: [
    JoiProps({
      a: Joi.object({
        b: Joi.string().default('B'),
        c: Joi.string(),
      }).default()
    })
  ],
}
</script>

<style>
</style>

