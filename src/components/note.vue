<template>
<span :class="`text-sm p-2 mr-2 mb-2 bg-${colour}${inverse ? '-lighter' : ''} rounded uppercase text-${colour}${inverse ? '' : '-lighter'} inline-block`">
  <slot></slot>
</span>
</template>

<script>
export default {
  props: {
    colour: String,
    inverse: Boolean
  }
}
</script>
