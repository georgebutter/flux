
<template>
  <div id="app" class="w-full flex flex-row">
    <sidebar>
    </sidebar>
    <main class="flex-grow">
      <header class="w-full flex bg-white shadow py-4">
        <div class="w-1/2 px-4">
          {{ site.name }}
        </div>
        <div class="w-1/2 px-4 text-right">
          <a class="no-underline" href="/admin/logout">Logout</a>
        </div>
      </header>
      <section class="p-6">
        <h1>Themes</h1>
      </section>
      <section class="p-6">
        <div class="bg-white rounded shadow-lg p-4">
          <div v-for="theme in themes">
            <div class="flex">
              <div class="w-1/2">
                <h2>{{ theme }}</h2>
              </div>
              <div class="w-1/2 text-right">
                <primary-button :href="'/admin/themes/' + theme">
                  Edit code
                </primary-button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import PrimaryButton from '../components/primary-button.vue';
import Sidebar from '../snippets/sidebar.vue';

export default {
  name: 'themes',
  components: {
    "primary-button": PrimaryButton,
    "sidebar": Sidebar,
  },
  data () {
    const { site, template, suffix, themes } = window.siteData;
    return {
      suffix: suffix,
      template: template,
      site: site,
      sidebarOpen: true,
      themes: themes
    }
  }
}
</script>
<style src="../styles/main.css"></style>
