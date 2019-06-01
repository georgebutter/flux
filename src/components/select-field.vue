<template>
  <div class="relative">
    <select @focus="clearError" :name="name" :class="['block appearance-none w-full bg-grey-lightrounded p-2 shadow-lg outline-none text-base border focus:border-grey-lighter border-transparent text-grey', error ? 'border-pink text-pink' : 'border-transparent text-grey']">
      <option v-for="option in options" :value="option.value">
        {{ option.text }}
      </option>
    </select>
    <div :class="['absolute pin-y pin-r px-2 flex items-center', error ? ' text-pink' : 'text-grey']">
      <icon-arrow-down width="16" height="16"/>
    </div>
  </div>
</template>

<script>
import ErrorIcon from '../components/icon-error.vue';
import ArrowDownIcon from '../components/icon-arrow-down.vue';
export default {
  name: 'text-field',
  components: {
    "icon-error": ErrorIcon,
    "icon-arrow-down": ArrowDownIcon,
  },
  methods: {
    clearError() {
      this.error = false;
    }
  },
  props: {
    options: String,
    name: String,
    error: Boolean
  }
}
</script>
