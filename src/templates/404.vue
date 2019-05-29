
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
          <div class="px-8 pt-6 pb-8 mb-4">
            <h1 class="mb-4 text-xl text-black">
              404
            </h1>
            <p>Oops! We couldn't find that page</p>
          </div>
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
