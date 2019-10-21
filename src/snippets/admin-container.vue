<template>
  <div id="app" class="w-full flex flex-row">
    <admin-header :site="site"/>
    <sidebar :pageTitle="this.$route.name" :sidebarOpen="sidebarOpen" v-on:toggleSideBar="toggleSideBar"/>
    <main :class="['pt-12 w-full transition-padding-left', sidebarOpen ? 'pl-64' : 'pl-16']">
      <section class="p-6">
        <h1>{{ this.$route.name }}</h1>
      </section>
      <slot></slot>
    </main>
  </div>
</template>
<script>
import Sidebar from '../snippets/sidebar.vue';
import AdminHeader from '../snippets/admin-header.vue';

export default {
  name: 'admin-container',
  components: {
    Sidebar,
    AdminHeader,
  },
  data () {
    const storage = localStorage.getItem('sidebarOpen');
    return {
      site: null,
      sidebarOpen: storage === 'true' || storage === null,
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
