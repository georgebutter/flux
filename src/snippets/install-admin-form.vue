<template>
  <form action="/install/admin" method="post" autocomplete="off" novalidate class="px-8 pt-6 pb-8 mb-4">
    <h1 class="mb-4 text-xl text-black">
      Create an admin account
    </h1>
    <div class="mb-4" v-if="errors">
      <ul class="list-reset">
        <li v-for="error in errors">
          <note colour="pink">{{ error.message }}</note>
        </li>
      </ul>
    </div>
    <div class="mb-4">
      <form-label for="Username"/>
      <text-field id="Username" type="text" name="username" placeholder="Username" :value="form.username" :error="fields.includes('name')"/>
    </div>
    <div class="mb-4">
      <form-label for="Email"/>
      <email-field id="Email" name="email"  :value="form.email" placeholder="Email" :error="fields.includes('email')"/>
    </div>
    <div class="mb-4">
      <form-label for="Password"/>
      <password-field id="Password" name="password" :value="form.password" placeholder="Password" :error="fields.includes('password')"/>
    </div>
    <div class="mb-6">
      <form-label for="ConfirmPassword"/>
      <password-field id="ConfirmPassword" name="confirm" :value="form.confirm" placeholder="Confirm password" :error="fields.includes('confirm')"/>
    </div>

    <div class="flex items-center justify-between">
      <primary-button type="submit">
        Create admin
      </primary-button>
    </div>
  </form>
</template>

<script>
import Note from '../components/note.vue';
import TextField from '../components/text-field.vue';
import EmailField from '../components/email-field.vue';
import PasswordField from '../components/password-field.vue';
import FormLabel from '../components/form-label.vue';
import PrimaryButton from '../components/primary-button.vue';

export default {
  name: 'install-admin-form',
  components: {
    "note": Note,
    "text-field": TextField,
    "email-field": EmailField,
    "password-field": PasswordField,
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
