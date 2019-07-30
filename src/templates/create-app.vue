<template>
  <admin-container>
    <section class="p-6">
      <form action="/admin/apps/create" method="post" autocomplete="off" novalidate>
        <div class="mb-4" v-if="errors">
          <ul class="list-reset">
            <li v-for="error in errors">
              <note colour="pink">{{ error.message }}</note>
            </li>
          </ul>
        </div>
        <div class="flex mb-4">
          <div class="w-1/3 px-2">
            <h3 class="mb-4 text-grey">
              App details
            </h3>
            <p class="text-grey">
              Provide a name for your app so that it is easily identifiable and an email adress that can be contacted with any queries about it.
            </p>
          </div>
          <div class="w-2/3 px-2">
            <brick>
              <div class="mb-4">
                <form-label for="Name">
                  App name
                </form-label>
                <text-field id="Name" type="text" name="name" placeholder="App name" :value="form.name" :error="fields.includes('name')"/>
              </div>
              <div class="mb-4">
                <form-label for="Email">
                  Emergency developer email
                </form-label>
                <email-field id="Email" name="email"  :value="form.email" placeholder="Developer email" :error="fields.includes('email')"/>
              </div>
            </brick>
          </div>
        </div>
        <div class="flex mb-4">
          <div class="w-1/3 px-2">
            <h3 class="mb-4 text-grey">
              Admin API
            </h3>
            <p class="text-grey">
              Choose which permissions you would like this app to have access to.
            </p>
          </div>
          <div class="w-2/3 px-2">
            <brick>
              <div class="flex">
                <div class="w-3/4">
                  <h4 class="mb-4 text-grey">
                    Themes and theme assets
                  </h4>
                  <p class="text-grey-light">
                    read_themes, write_themes
                  </p>
                </div>
                <div class="w-1/4 items-end">
                  <select-field
                    name="themes"
                    :error="fields.includes('themes')"
                    :options="[
                      {
                        value: 'none',
                        text: 'No access'
                      },
                      {
                        value: 'read',
                        text: 'Read access'
                      },
                      {
                        value: 'readwrite',
                        text: 'Read and write'
                      }
                    ]"
                  />
                </div>
              </div>
            </brick>
          </div>
        </div>
        <div class="flex mb-4 items-end">
          <div class="px-2">
            <primary-button type="submit">
              Create app
            </primary-button>
          </div>
        </div>
      </form>
    </section>
  </admin-container>
</template>

<script>
import Note from '../components/note.vue';
import PrimaryButton from '../components/primary-button.vue';
import AdminContainer from '../snippets/admin-container.vue';
import TextField from '../components/text-field.vue';
import EmailField from '../components/email-field.vue';
import FormLabel from '../components/form-label.vue';
import SelectField from '../components/select-field.vue';
import Brick from '../components/brick.vue';

export default {
  name: 'create-app',
  components: {
    "note": Note,
    "primary-button": PrimaryButton,
    "admin-container": AdminContainer,
    "text-field": TextField,
    "email-field": EmailField,
    "form-label": FormLabel,
    "select-field": SelectField,
    "brick": Brick,
  },
  data () {
    const { form, errors } = window.siteData;
    return {
      form: form,
      errors, errors,
      fields: errors ? errors.map(error => error.field) : [],
    }
  }
}
</script>
