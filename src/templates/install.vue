
<template>
  <div id="app" class="flex flex-col w-full">
    <div class="flex h-full">
      <div class="w-1/2 h-full bg-gradient-t-primary flex justify-center items-center">
        <div class="w-full h-full px-12 lg:px-32 max-w-lg">
          <illustration v-if="suffix === 'site'"/>
          <illustration-admin v-if="suffix === 'admin'"/>
        </div>
      </div>
      <div class="w-1/2 h-full flex items-center">
        <div class="w-full max-w-sm">
          <install-site-form v-if="suffix === 'site'" :errors="errors" :form="form" :fields="fields"/>
          <install-admin-form v-if="suffix === 'admin'" :errors="errors" :form="form" :fields="fields"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Illustration from '../components/illustration.vue';
import IllustrationAdmin from '../components/illustration-admin.vue';

import SiteForm from '../snippets/install-site-form.vue';
import AdminForm from '../snippets/install-admin-form.vue';

export default {
  name: 'app',
  components: {
    "illustration": Illustration,
    "illustration-admin": IllustrationAdmin,
    "install-site-form": SiteForm,
    "install-admin-form": AdminForm,
  },
  data () {
    const { errors, form, template, suffix } = window.siteData;
    return {
      errors: errors,
      fields: errors ? errors.map(error => error.field) : [],
      form: form,
      suffix: suffix,
      template: template,
    }
  }
}
</script>

<style src="../styles/main.css"></style>
