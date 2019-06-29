<template>
  <div class="inline-block relative w-full">
    <input @focus="clearError" @input="$emit('onInput', $event)" :value="value" :name="name" :placeholder="placeholder" :class="['rounded p-2 w-full shadow-lg outline-none text-base border focus:border-accent', error ? 'border-pink text-pink' : 'border-grey-lighter text-grey']" type="email"/>
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
  methods: {
    clearError() {
      this.error = false;
    }
  },
  props: {
    placeholder: String,
    value: String,
    name: String,
    error: Boolean
  }
}
</script>
