<template>
  <router-link v-if="href !== false" :to="href" :disabled="disabled" :class="['py-2 px-10 inline-block rounded-full focus:outline-none active:outline-none border-2 no-underline transition-background-color', disabled ? 'bg-grey-lighter text-grey-light cursor-not-allowed border-grey-lighter' : 'bg-accent text-white hover:bg-accent-lighter hover:border-accent-lighter hover:text-accent border-accent']" @click="$emit('onClick', $event)">
    <slot v-if="!loading"></slot>
    <loader v-if="loading"/>
  </router-link>
  <button v-else :disabled="disabled" :class="['py-2 px-10 inline-block rounded-full focus:outline-none active:outline-none border-2 transition-background-color', disabled ? 'bg-grey-lighter text-grey-light cursor-not-allowed border-grey-lighter' : 'bg-accent text-white hover:bg-accent-lighter hover:border-accent-lighter hover:text-accent border-accent']" @click="$emit('onClick', $event)">
    <slot v-if="!loading"></slot>
    <loader v-if="loading"/>
  </button>
</template>

<script>
import Loader from './loader.vue';
export default {
  components: {
    loader: Loader,
  },
  props: {
    disabled: Boolean,
    loading: {
      type: Boolean,
      default: false
    },
    href: {
      type: [String, Boolean],
      default: false,
    }
  }
}
</script>
