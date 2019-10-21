<template>
  <admin-container>
    <router-view></router-view>
  </admin-container>
</template>

<script>
import AdminContainer from '../snippets/admin-container.vue';
export default {
  name: 'adminApi',
  components: {
    AdminContainer
  }
}
</script>
