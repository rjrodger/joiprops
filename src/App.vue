<template>
<div>
  <h1>TESTBED</h1>

  DEEPER: <bar :a="aa"></bar>
  
  <hr />
  
  <canary
    :a="a"
    :b="b"
    >
    </canary>

  a<input v-model="a" /><br />
  b.e<input v-model="b.e" /><br />
  b.f<input v-model="b.f" /><br />
  b.c.g<input v-model="b.c.g" /><br />
  
</div>
</template>

<script>

export default {
  name: "app",
  data: function() {
    return {
      a: 'A',
      b: { e: 'E', c: { g:'G'} },

      aa: {}
    }
  },
}
</script>

<style>
</style>
