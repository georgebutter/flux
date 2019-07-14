<template>
<div class="bg-white rounded-lg shadow-lg p-4 mb-4">
  <form-label :show="true" for="Title">
    Title
  </form-label>
  <text-field id="Title" type="text" name="title" :value="title" :error="fields.includes('title')" @onInput="createHandle"/>
</div>
</template>

<script>
import TextField from '../components/text-field.vue';
import FormLabel from '../components/form-label.vue';

export default {
  name: 'title-block',
  components: {
    "text-field": TextField,
    "form-label": FormLabel,
  },
  data () {
    return {
      title: this.value || ''
    }
  },
  props: {
    fields: Array,
    value: String,
    createHandle: Function
  }
}
</script>
