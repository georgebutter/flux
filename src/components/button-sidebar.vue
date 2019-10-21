<template>
  <router-link :to="href" :class="['focus:outline-none active:outline-none hover:text-grey hover:border-grey p-4 border-l-4 overflow-hidden no-underline flex whitespace-no-wrap', active ? 'text-grey border-grey' : 'text-grey-light border-grey-light']">
    <span>
      <component :is="icon" width="20" height="20"/>
    </span>
    <span class="ml-4 whitespace-no-wrap">
      {{ text }}
    </span>
  </router-link>
</template>

<script>
import IconHouse from '../components/icon-house.vue';
import IconCollection from '../components/icon-collection.vue';
import IconNavigation from '../components/icon-navigation.vue';
import IconCog from '../components/icon-cog.vue';
import IconDevices from '../components/icon-devices.vue';
import IconUsers from '../components/icon-users.vue';
import IconApps from '../components/icon-apps.vue';
import IconItem from '../components/icon-item.vue';

export default {
  name: 'button-sidebar',
  components: {
    IconCollection,
    IconNavigation,
    IconHouse,
    IconCog,
    IconApps,
    IconDevices,
    IconUsers,
    IconItem,
  },
  props: {
    text: String,
    icon: String,
    href: String,
    active: Boolean
  }
}
</script>
