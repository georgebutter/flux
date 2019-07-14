<template>
<div class="mb-4" v-if="errors">
  <ul class="list-reset">
    <li v-for="error in errors">
      <note colour="pink">{{ error.message }}</note>
    </li>
  </ul>
</div>
</template>


<script>
import Note from '../components/note.vue';

export default {
  name: 'errors-block',
  components: {
    "note": Note,
  },
  props: {
    errors: Array
  }
}
</script>
