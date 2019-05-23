
<template>
  <div id="app" class="w-full flex flex-row">
    <sidebar></sidebar>
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
import Sidebar from '../snippets/sidebar.vue';

export default {
  name: 'dashboard',
  components: {
    "sidebar": Sidebar,
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
