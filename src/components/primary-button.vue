<template>
  <button :disabled="disabled" :class="['py-2 px-10 uppercase inline-block rounded outline-none border-2', disabled ? 'bg-grey-lighter text-grey-light cursor-not-allowed border-grey-lighter' : 'bg-accent text-white hover:bg-accent-lighter hover:border-accent-lighter hover:text-accent border-accent']">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    disabled: Boolean
  }
}
</script>
