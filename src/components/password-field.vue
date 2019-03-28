<template>
  <div class="inline-block relative w-full">
    <input :disabled="disabled" class="rounded p-2 shadow-lg outline-none text-base border border-transparent focus:border-grey-lighter text-grey w-full" :type="view ? 'text' : 'password'" placeholder="Password">
    <div :class="['absolute pin-y pin-r flex items-center px-2 cursor-pointer', view ? 'text-grey hover:text-grey-light' : 'hover:text-grey text-grey-light']" @click="toggleView">
      <span :class="view ? 'hidden' : ''">
        <icon-eye/>
      </span>
      <span :class="view ? '' : 'hidden'">
        <icon-eye-hide/>
      </span>
    </div>
  </div>
</template>

<script>
import EyeIcon from '../components/icon-eye.vue';
import EyeHideIcon from '../components/icon-eye-hide.vue';
export default {
  data: () => ({
    view: false
  }),
  methods: {
    toggleView() {
      this.view = !this.view;
    }
  },
  components: {
    "icon-eye": EyeIcon,
    "icon-eye-hide": EyeHideIcon,
  },
  props: {
    disabled: Boolean,
  }
}
</script>
