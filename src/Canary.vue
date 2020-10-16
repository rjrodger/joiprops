<template>
<div>
  <h2>CANARY</h2>
  <p>A: {{ a }}</p>
  <p>Z: {{ gz }}</p>
  <p>B: {{ b }}</p>
  <p>G: {{ b.c.g }}</p>
  <p>K: {{ gk }}</p>
</div>
</template>

<script>
import { JoiProps, Joi } from '..'

export default {
  name: 'canary',
  mixins: [
    JoiProps({
      a: Joi.string().default('A'),
      z: Joi.string().default('Z'),
      b: Joi.object({
        e: Joi.string().required(),
        f: Joi.string(),
        h: Joi.string(),
        c: Joi.object({
          d: Joi.string().default('D'),
          g: Joi.string().required(),
        }).default()
      }).default(),
      k: Joi.object({
        // i: Joi.string().required(),
        j: Joi.string().default('J')
      }).default()
    })
  ],
  computed: {
    gz () {
      return ''+this.z
    },
    gk () {
      return this.k
    }
  }
}
</script>

<style>
</style>

