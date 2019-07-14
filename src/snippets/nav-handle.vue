<template>
<div class="bg-white shadow-lg rounded p-4">
  <div class="mb-4">
    <form-label :show="true" for="Handle">
      Handle
    </form-label>
    <text-field id="Handle" type="text" name="handle" :value="handle" :error="fields.includes('handle')"/>
  </div>
  <p class="mb-4 text-grey-light">The handle is used to access the navigation in your website</p>
  <code class="whitespace-pre-wrap text-grey-light text-sm">
{% for link in linklists.{{ handle }}.links %}
<span v-pre>{{ link.title }}</span>
{% endfor %}
  </code>
</div>
</template>

<script>
import TextField from '../components/text-field.vue';
import FormLabel from '../components/form-label.vue';

export default {
  name: 'nav-handle',
  components: {
    "text-field": TextField,
    "form-label": FormLabel,
  },
  props: {
    fields: Array,
    handle: String
  }
}
</script>
