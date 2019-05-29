<template>
  <admin-container>
    <section class="p-6">
      <h2>Test</h2>
    </section>
  </admin-container>
</template>

<script>
import AdminContainer from '../snippets/admin-container.vue';

export default {
  name: 'settings',
  components: {
    "admin-container": AdminContainer,
  }
}
</script>
