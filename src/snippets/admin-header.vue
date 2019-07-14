<template>
  <header class="pin-x pin-t fixed w-full flex bg-grey text-grey-light py-4 z-10">
    <div class="w-1/2 px-4">
      <a href="/" class="no-underline text-grey-light">{{ site.name }}</a>
    </div>
    <div class="w-1/2 px-4 text-right">
      <a class="no-underline text-grey-light" href="/admin/logout">
        Logout
      </a>
    </div>
  </header>
</template>

<script>
import Logo from '../components/logo.vue';

export default {
  name: 'admin-header',
  components: {
    "logo": Logo,
  },
  props: {
    site: Object
  }
}
</script>
