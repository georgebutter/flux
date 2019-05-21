
<template>
  <div id="app" class="w-full flex flex-row">
    <aside class="bg-white flex-shrink h-full p-4 z-10 border-r-2 border-grey-lighter">
      <button :class="['focus:outline-none active:outline-none bg-accent-lighter rounded text-accent mb-3 p-2 flex items-center overflow-hidden transition-width', sidebarOpen  ? 'w-full' : 'w-10']">
        <span>
          <icon-house width="20" height="20"/>
        </span>
        <span class="ml-4 whitespace-no-wrap">
          Dashboard
        </span>
      </button>
      <button :class="['focus:outline-none active:outline-none hover:text-accent-light rounded text-grey-light mb-3 p-2 flex items-center overflow-hidden transition-width', sidebarOpen  ? 'w-full' : 'w-10']">
        <span>
          <icon-cog width="20" height="20"/>
        </span>
        <span class="ml-4 whitespace-no-wrap">
          Settings
        </span>
      </button>
      <button :class="['focus:outline-none active:outline-none hover:text-accent-light rounded text-grey-light mb-3 p-2 flex items-center overflow-hidden transition-width', sidebarOpen  ? 'w-full' : 'w-10']"
      @click="sidebarOpen = !sidebarOpen"
      >
        <span>
          <icon-close-menu width="20" height="20"/>
        </span>
        <span class="ml-4 whitespace-no-wrap">
          Toggle Sidebar
        </span>
      </button>
    </aside>
    <main class="flex-grow">
      <header class="w-full flex bg-white shadow">
        <div class="w-1/2 px-4">
          {{ site.name }}
        </div>
        <div class="w-1/2 px-4 text-right">
          <a href="/admin/logout">Logout</a>
        </div>
      </header>
    </main>
  </div>
</template>

<script>
import IconHouse from '../components/icon-house.vue';
import IconCog from '../components/icon-cog.vue';
import IconOpenMenu from '../components/icon-open-menu.vue';
import IconCloseMenu from '../components/icon-close-menu.vue';

export default {
  name: 'dashboard',
  components: {
    "icon-house": IconHouse,
    "icon-close-menu": IconCloseMenu,
    "icon-open-menu": IconOpenMenu,
    "icon-cog": IconCog,
  },
  data () {
    const { site, template, suffix } = window.siteData;
    return {
      suffix: suffix,
      template: template,
      site: site,
      sidebarOpen: true
    }
  }
}
</script>
<style src="../styles/main.css"></style>
