<template>
  <button v-else :disabled="disabled" :class="['py-2 px-10 inline-block rounded-full focus:outline-none active:outline-none border-2 transition-background-color relative', disabled ? 'bg-grey-lighter text-grey-light cursor-not-allowed border-grey-lighter' : 'bg-pink text-white hover:bg-pink-lighter hover:border-pink-lighter hover:text-pink border-pink']" @mousedown="startInitializing" @mouseup="stopInitializing" @mouseleave="stopInitializing">
    <slot v-if="!loading && !initializing"></slot>
    <loader v-if="loading && !initializing"/>
    <span class="block" v-if="!loading && initializing">
      Hold to complete
    </span>
    <span :class="['pointer-events-none block absolute bg-pink text-white rounded-full overflow-hidden max-w-0 py-2 whitespace-no-wrap pin', initializing ? 'max-w-full transition-max-width' : 'invisible']">
      <span class="block px-10">Hold to complete</span>
    </span>
  </button>
</template>

<script>
import Loader from './loader.vue';
export default {
  components: {
    loader: Loader,
  },
  methods: {
    startInitializing() {
      this.initializing = true;
    },
    stopInitializing() {
      this.initializing = false;
    }
  },
  data () {
    return {
      initializing: false
    }
  },
  props: {
    disabled: Boolean,
    loading: Boolean,
    href: {
      type: [String, Boolean],
      default: false,
    }
  }
}
</script>
