<template>
  <aside class="bg-white flex-shrink h-full p-4 z-10 border-r-2 border-grey-lighter">
    <button-sidebar
      :sidebarOpen="sidebarOpen"
      icon="icon-house"
      text="Dashboard"
      href="/admin"
    >
    </button-sidebar>
    <button-sidebar
      :sidebarOpen="sidebarOpen"
      icon="icon-devices"
      text="Themes"
      href="/admin/themes">
    </button-sidebar>
    <button-sidebar
      :sidebarOpen="sidebarOpen"
      icon="icon-cog"
      text="Settings">
    </button-sidebar>
    <button :class="['focus:outline-none active:outline-none hover:text-accent-light rounded text-grey-light mb-3 p-2 flex items-center overflow-hidden transition-width', sidebarOpen  ? 'w-full' : 'w-10']"
    @click="sidebarOpen = !sidebarOpen"
    >
      <span>
        <icon-close-menu v-if="sidebarOpen" width="20" height="20"/>
        <icon-open-menu v-else width="20" height="20"/>
      </span>
      <span class="ml-4 whitespace-no-wrap">
        Toggle Sidebar
      </span>
    </button>
  </aside>
</template>

<script>
import SideBarButton from '../components/button-sidebar.vue';
import IconOpenMenu from '../components/icon-open-menu.vue';
import IconCloseMenu from '../components/icon-close-menu.vue';

export default {
  name: 'sidebar',
  components: {
    "button-sidebar": SideBarButton,
    "icon-close-menu": IconCloseMenu,
    "icon-open-menu": IconOpenMenu,
  },
  data () {
    return {
      sidebarOpen: true,
    }
  }
}
</script>
