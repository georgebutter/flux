<template>
  <div class="inline-block relative w-full">
    <input @focus="clearError" @input="$emit('onInput', $event)" :value="value" :name="name" :placeholder="placeholder" :readonly="readonly" :class="['rounded p-2 w-full shadow-lg outline-none text-base border focus:border-accent', err ? 'border-pink text-pink' : 'border-grey-lighter text-grey', disabled ? 'bg-grey-light' : '' ]" type="text" :disabled="disabled"/>
    <div :class="['absolute pin-y pin-r px-2 text-pink', err ? 'flex items-center' : 'hidden']">
      <icon-error/>
    </div>
  </div>
</template>

<script>
import ErrorIcon from '../components/icon-error.vue';
export default {
  name: 'text-field',
  components: {
    "icon-error": ErrorIcon,
  },
  data () {
    return {
      err: this.error
    }
  },
  methods: {
    clearError() {
      this.err = false;
    }
  },
  props: {
    placeholder: String,
    value: String,
    name: String,
    error: Boolean,
    readonly: Boolean,
    disabled: Boolean,
  }
}
</script>
