<template>
  <a :href="href" :class="['focus:outline-none active:outline-none bg-accent-lighter rounded text-accent mb-3 p-2 flex items-center overflow-hidden transition-width no-underline', sidebarOpen  ? 'w-full' : 'w-10']">
    <span>
      <component :is="icon" width="20" height="20"/>
    </span>
    <span class="ml-4 whitespace-no-wrap">
      {{ text }}
    </span>
  </a>
</template>

<script>
import IconHouse from '../components/icon-house.vue';
import IconCog from '../components/icon-cog.vue';

export default {
  components: {
    "icon-house": IconHouse,
    "icon-cog": IconCog,
  },
  props: {
    sidebarOpen: Boolean,
    text: String,
    icon: String,
    href: String,
  }
}
</script>
