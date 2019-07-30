<template>
<brick>
  <form-label :show="true" for="Title">
    Title
  </form-label>
  <text-field id="Title" type="text" name="title" :value="title" :error="fields.includes('title')" @onInput="createHandle"/>
</brick>
</template>

<script>
import TextField from '../components/text-field.vue';
import FormLabel from '../components/form-label.vue';
import Brick from '../components/brick.vue';

export default {
  name: 'title-block',
  components: {
    "text-field": TextField,
    "form-label": FormLabel,
    "brick": Brick,
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
