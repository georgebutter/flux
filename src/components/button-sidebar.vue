<template>
  <a :href="href" :class="['focus:outline-none active:outline-none hover:text-grey hover:border-grey p-4 border-l-4 overflow-hidden no-underline flex whitespace-no-wrap', active ? 'text-grey border-grey' : 'text-grey-light border-grey-light']">
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
import IconDevices from '../components/icon-devices.vue';

export default {
  components: {
    "icon-house": IconHouse,
    "icon-cog": IconCog,
    "icon-devices": IconDevices,
  },
  props: {
    text: String,
    icon: String,
    href: String,
    active: Boolean
  }
}
</script>
