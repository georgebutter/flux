<template>
  <button v-else :disabled="disabled" :class="['py-2 px-10 inline-block rounded-full focus:outline-none active:outline-none border-2 transition-background-color relative', disabled ? 'bg-grey-lighter text-grey-light cursor-not-allowed border-grey-lighter' : 'bg-pink text-white hover:bg-pink-lighter hover:border-pink-lighter hover:text-pink border-pink', loading ? 'pointer-events-none' : '']" @mousedown="startInitializing" @mouseup="stopInitializing" @mouseleave="stopInitializing">
    <slot v-if="!loading && !initializing"></slot>
    <loader v-if="loading && !initializing"/>
    <span class="block" v-if="!loading && initializing">
      {{ initializingText }}
    </span>
    <span :class="['pointer-events-none block absolute bg-pink text-white rounded-full overflow-hidden max-w-0 py-2 whitespace-no-wrap pin', initializing ? 'max-w-full transition-max-width' : 'invisible']">
      <span class="block px-10">{{ initializingText }}</span>
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
      this.timeout = setTimeout(() => {
        this.initializing = false;
        this.loading = true;
        this.action();
      }, 2500)
    },
    stopInitializing() {
      this.initializing = false;
      clearTimeout(this.timeout);
    }
  },
  data () {
    return {
      initializing: false,
      loading: false,
      timeout: null
    }
  },
  props: {
    disabled: Boolean,
    initializingText: {
      type: String,
      default: 'Hold to complete'
    },
    action: Function,
    href: {
      type: [String, Boolean],
      default: false,
    }
  }
}
</script>
