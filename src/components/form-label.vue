<template>
<label :class="show ? 'block mb-2' : 'visually-hidden'">
  <slot>
  </slot>
</label>
</template>

<script>
export default {
  name: 'form-label',
  props: {
    show: Boolean,
  }
}
</script>
