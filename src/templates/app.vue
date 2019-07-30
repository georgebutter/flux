<template>
  <admin-container>
    <section class="p-6">
      <form :action="`/admin/apps/${app._id}/update`" method="post" autocomplete="off" novalidate>
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
                <text-field id="Name" type="text" name="name" placeholder="App name" :value="app.name" :error="fields.includes('name')"  @onInput="update"/>
              </div>
              <div class="mb-4">
                <form-label for="Email">
                  Emergency developer email
                </form-label>
                <email-field id="Email" name="email"  :value="app.email" placeholder="Developer email" @onInput="update" :error="fields.includes('email')"/>
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
                <div class="w-full mb-4">
                  <label class="mb-2" for="Key">
                    API Key
                  </label>
                  <text-field id="Key" :value="app.key" :readonly="true"/>
                </div>
              </div>
              <div class="flex">
                <div class="w-full mb-4">
                  <label class="mb-2" for="APIPassword">
                    API Password
                  </label>
                  <password-field id="APIPassword" :value="app.password" :readonly="true"/>
                </div>
              </div>
              <div class="flex">
                <div class="w-3/4">
                  <h4 class="mb-4 text-grey">
                    Themes and theme assets
                  </h4>
                  <p class="text-grey-light">
                    read_themes, write_themes
                  </p>
                </div>
                <div class="w-1/4 justify-end">
                  <select-field
                    name="themes"
                    :error="fields.includes('themes')"
                    @onChange="update"
                    :selectedValue="newData.themes"
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
        <div class="flex mb-4 justify-end">
          <div class="px-2">
            <primary-button type="submit" :disabled="!updated">
              Update app
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
import Brick from '../components/brick.vue';
import AdminContainer from '../snippets/admin-container.vue';
import TextField from '../components/text-field.vue';
import PasswordField from '../components/password-field.vue';
import EmailField from '../components/email-field.vue';
import FormLabel from '../components/form-label.vue';
import SelectField from '../components/select-field.vue';

export default {
  name: 'create-app',
  components: {
    "note": Note,
    "primary-button": PrimaryButton,
    "brick": Brick,
    "admin-container": AdminContainer,
    "password-field": PasswordField,
    "text-field": TextField,
    "email-field": EmailField,
    "form-label": FormLabel,
    "select-field": SelectField
  },
  methods: {
    update(event) {
      this.newData[event.target.name] = event.target.value;
      if (
        this.newData.name !== this.app.name ||
        this.newData.email !== this.app.email ||
        this.newData.themes !== this.app.themes
      ) {
        this.updated = true;
      } else {
        this.updated = false;
      }
    }
  },
  data () {
    const { app, errors } = window.siteData;
    const appData = Object.assign({}, app, {});
    const newData = Object.assign({}, app, {});
    return {
      newData: newData,
      app: appData,
      updated: false,
      errors, errors,
      fields: errors ? errors.map(error => error.field) : [],
    }
  }
}
</script>
