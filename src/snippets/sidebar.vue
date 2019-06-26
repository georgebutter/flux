<template>
  <aside :class="['sidebar bg-white pin-b z-10 fixed overflow-y-auto transition-width', sidebarOpen  ? 'w-64' : 'w-14']">
    <button-sidebar
      icon="icon-house"
      text="Dashboard"
      href="/admin"
      :active="pageTitle === 'Dashboard'"
    />
    <button-sidebar
      icon="icon-users"
      text="Users"
      href="/admin/users"
      :active="pageTitle === 'Users'"
    />
    <button-sidebar
      icon="icon-collection"
      text="Collections"
      href="/admin/collections"
      :active="pageTitle === 'Collections'"
    />
    <button-sidebar
      icon="icon-devices"
      text="Themes"
      href="/admin/themes"
      :active="pageTitle === 'Themes' || pageTitle === 'Theme'"
    />
    <button-sidebar
      icon="icon-apps"
      text="Apps"
      href="/admin/apps"
      :active="pageTitle === 'Apps' || pageTitle === 'Create a new app'"
    />
    <button-sidebar
      icon="icon-cog"
      text="Settings"
      href="/admin/settings"
      :active="pageTitle === 'Settings'"
    />
    <button class="focus:outline-none active:outline-none hover:text-grey text-grey-light py-4 px-6 flex whitespace-no-wrap overflow-hidden"
    @click="$emit('toggleSideBar', $event)"
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
  props: {
    pageTitle: String,
    sidebarOpen: Boolean
  }
}
</script>

<style>
.sidebar {
  top: 50px;
}
</style>
