<template>
  <admin-container>
    <section class="p-6">
      <form action="/admin/collections/create" method="post" autocomplete="off" novalidate>
        <div class="mb-4" v-if="errors">
          <ul class="list-reset">
            <li v-for="error in errors">
              <note colour="pink">{{ error.message }}</note>
            </li>
          </ul>
        </div>
        <div class="flex mb-4">
          <div class="w-2/3 px-2">
            <div class="bg-white rounded shadow-lg p-4 mb-4">
              <div class="mb-4">
                <form-label :show="true" for="Name">
                  Name
                </form-label>
                <text-field id="Name" type="text" name="name" :value="form.name" :error="fields.includes('name')" @onInput="createHandle"/>
              </div>
              <div class="mb-4">
                <form-label :show="true" for="Handle">
                  Handle
                </form-label>
                <text-field id="Handle" type="text" name="handle" :value="handle" :error="fields.includes('handle')" :disabled="true"/>
              </div>
              <div v-for="field in additionalFields" class="mb-4">
                <form-label :show="true" :for="field.id">
                  {{ field.title }}
                </form-label>
                <text-field v-if="field.type === 'text'" :id="field.id" type="text" :name="field.id"/>
                <select-field
                  v-else-if="field.type === 'select'"
                  :name="field.id"
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
              <div class="px-2">
                <primary-button type="submit">
                  Create collection
                </primary-button>
              </div>
            </div>
          </div>
          <div class="w-1/3 px-2">
            <div class="mb-4">
              <button class="text-left bg-white w-full p-2 flex rounded-lg shadow-lg font-bold items-center" type="button" role="button" @click="addTextItem">
                <span class="bg-primary rounded-xl text-white p-3 mr-2">
                  <icon-add-item width="24" height="24"/>
                </span>
                Add text field
              </button>
            </div>
            <div class="mb-4">
              <button class="text-left bg-white w-full p-2 flex rounded-lg shadow-lg font-bold items-center" type="button" role="button" @click="addSelectItem">
                <span class="bg-accent rounded-xl text-white p-3 mr-2">
                  <icon-add-item width="24" height="24"/>
                </span>
                 Add select
              </button>
            </div>
            <div class="mb-4">
              <button class="text-left bg-white w-full p-2 flex rounded-lg shadow-lg font-bold items-center" type="button" role="button">
                <span class="bg-yellow rounded-xl text-white p-3 mr-2">
                  <icon-add-item width="24" height="24"/>
                </span>
                 Add list
              </button>
            </div>
            <div class="mb-4">
              <button class="text-left bg-white w-full p-2 flex rounded-lg shadow-lg font-bold items-center" type="button" role="button">
                <span class="bg-green rounded-xl text-white p-3 mr-2">
                  <icon-add-item width="24" height="24"/>
                </span>
                 Add toggle
              </button>
            </div>
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
import IconAddItem from '../components/icon-add-item.vue';

export default {
  name: 'create-collection',
  components: {
    "note": Note,
    "primary-button": PrimaryButton,
    "admin-container": AdminContainer,
    "text-field": TextField,
    "email-field": EmailField,
    "form-label": FormLabel,
    "select-field": SelectField,
    "icon-add-item": IconAddItem,
  },
  data () {
    const { form, errors, handle } = window.siteData;
    return {
      form: form,
      errors, errors,
      fields: errors ? errors.map(error => error.field) : [],
      handle: handle || '',
      additionalFields: []
    }
  },
  methods: {
    addTextItem: function () {
      this.additionalFields.push({
        type: 'text',
        id: 'test',
        title: 'Test',
      });
    },
    addSelectItem: function () {
      this.additionalFields.push({
        type: 'select',
        id: 'test-select',
        title: 'Select',
      });
    },
    createHandle: function (e) {
      this.handle = this.handleize(e.target.value);
    },
    handleize: function (str) {
      return str.toLowerCase().replace(/[^\w\u00C0-\u024f]+/g, "-").replace(/^-+|-+$/g, "");
    }
  }
}
</script>
