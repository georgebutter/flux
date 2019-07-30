<template>
  <div id="app" class="w-full flex flex-row">
    <admin-header :site="site"/>
    <sidebar :pageTitle="pageTitle" :sidebarOpen="sidebarOpen" v-on:toggleSideBar="toggleSideBar"/>
    <main :class="['pt-12 w-full transition-padding-left', sidebarOpen ? 'pl-64' : 'pl-16']">
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
    const storage = localStorage.getItem('sidebarOpen');
    return {
      suffix: suffix,
      template: template,
      site: site,
      sidebarOpen: storage === 'true' || storage === null,
      pageTitle: page_title
    }
  },
  methods: {
    toggleSideBar() {
      this.sidebarOpen = !this.sidebarOpen;
      localStorage.setItem('sidebarOpen', this.sidebarOpen);
    }
  }
}
</script>
<style src="../styles/main.css"></style>
