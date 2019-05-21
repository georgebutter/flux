<template>
  <button :disabled="disabled" :class="['py-2 px-10 inline-block rounded outline-none border-2', disabled ? 'text-grey-light border-grey-light cursor-not-allowed' : 'bg-transparent text-accent border-accent hover:bg-accent hover:text-white']">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'secondary-button',
  props: {
    disabled: Boolean
  }
}
</script>
