<template>
  <header class="pin-x pin-t fixed w-full flex bg-grey text-grey-light py-4 z-10">
    <div class="w-1/2 px-4">
      {{ site.name }}
    </div>
    <div class="w-1/2 px-4 text-right">
      <a class="no-underline text-grey-light" href="/admin/logout">
        Logout
      </a>
    </div>
  </header>
</template>

<script>
export default {
  name: 'admin-header',
  props: {
    site: Object
  }
}
</script>
