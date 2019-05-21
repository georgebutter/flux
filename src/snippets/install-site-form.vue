<template>
  <form action="/install/site" method="post" class="px-8 pt-6 pb-8 mb-4">
    <h1 class="mb-4 text-xl text-black">
      Create your site
    </h1>
    <div class="mb-4" v-if="errors">
      <ul class="list-reset">
        <li v-for="error in errors">
          <note colour="pink">{{ error.message }}</note>
        </li>
      </ul>
    </div>
    <div class="mb-4">
      <form-label for="SiteName"/>
      <text-field id="SiteName" name="name" :value="form.name" placeholder="Site name" :error="fields.includes('name')"/>
    </div>
    <div class="mb-4">
      <form-label for="Description"/>
      <text-field id="Description" name="description"  :value="form.description" placeholder="Description" :error="fields.includes('description')"/>
    </div>
    <div class="mb-6">
      <form-label for="Email"/>
      <email-field id="Email" name="email" :value="form.email" placeholder="Site email" :error="fields.includes('email')"/>
    </div>

    <div class="flex items-center justify-between">
      <primary-button type="submit">
        Create your site
      </primary-button>
    </div>
  </form>
</template>

<script>
import Note from '../components/note.vue';
import TextField from '../components/text-field.vue';
import EmailField from '../components/email-field.vue';
import FormLabel from '../components/form-label.vue';
import PrimaryButton from '../components/primary-button.vue';

export default {
  name: 'install-site-form',
  components: {
    "note": Note,
    "text-field": TextField,
    "email-field": EmailField,
    "primary-button": PrimaryButton,
    "form-label": FormLabel,
  },
  props: {
    errors: Array,
    fields: Array,
    form: Object
  }
}
</script>
