<template>
<div>
  <h2>BAR</h2>
  <foo :a="a"></foo>
</div>
</template>

<script>
import { JoiProps, Joi } from '..'

export default {
  name: 'bar',
  mixins: [
    JoiProps({
      a: Joi.object({
        c: Joi.string().default('C'),
      }).default()
    })
  ],
}
</script>

<style>
</style>

