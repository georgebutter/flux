<template>
  <div id="app" class="w-full flex flex-row">
    <admin-header :site="site"/>
    <sidebar :pageTitle="pageTitle"/>
    <main class="pl-64 pt-12 w-full">
      <section class="p-6">
        <h1>{{ pageTitle }}</h1>
      </section>
      <slot></slot>
    </main>
  </div>
</template>
<script>
import Sidebar from '../snippets/sidebar.vue';
import AdminHeader from '../snippets/admin-header.vue';

export default {
  name: 'dashboard',
  components: {
    "sidebar": Sidebar,
    "admin-header": AdminHeader,
  },
  data () {
    const { site, template, suffix, page_title } = window.siteData;
    return {
      suffix: suffix,
      template: template,
      site: site,
      sidebarOpen: true,
      pageTitle: page_title
    }
  }
}
</script>
<style src="../styles/main.css"></style>
