
<template>
  <div id="app" class="flex flex-col w-full">
    <div class="flex h-full">
      <div class="w-1/2 h-full bg-gradient-t-primary flex justify-center items-center">
        <div class="w-full h-full px-12 lg:px-32 max-w-lg">
          <illustration-login/>
        </div>
      </div>
      <div class="w-1/2 h-full flex items-center">
        <div class="w-full max-w-sm">
          <admin-login-form :errors="errors" :form="form" :fields="fields"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IllustrationLogin from '../components/illustration-login.vue';
import LoginForm from '../snippets/admin-login-form.vue';

export default {
  name: 'app',
  components: {
    "illustration-login": IllustrationLogin,
    "admin-login-form": LoginForm,
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
