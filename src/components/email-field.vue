<template>
  <div class="inline-block relative w-full">
    <input :placeholder="placeholder" :class="['rounded p-2 w-full shadow-lg outline-none text-base border focus:border-grey-lighter', error ? 'border-pink text-pink' : 'border-transparent text-grey']" type="text"/>
    <div :class="['absolute pin-y pin-r px-2 text-pink', error ? 'flex items-center' : 'hidden']">
      <icon-error/>
    </div>
  </div>
</template>

<script>
import ErrorIcon from '../components/icon-error.vue';
export default {
  components: {
    "icon-error": ErrorIcon,
  },
  props: {
    placeholder: String,
    error: Boolean
  }
}
</script>
