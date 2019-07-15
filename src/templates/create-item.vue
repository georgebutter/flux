<template>
  <admin-container>
    <section class="p-6">
      <form action="/admin/items/create" method="post" autocomplete="off" novalidate>
        <errors-block :errors="errors"/>
        <div class="flex mb-4">
          <div class="w-2/3 px-2">
            <div class="bg-white rounded shadow-lg p-4 mb-4">
              <div class="mb-4">
                <form-label :show="true" for="Title">
                  Title
                </form-label>
                <text-field id="Title" type="text" name="title" :value="title" :error="fields.includes('title')" @onInput="createHandle"/>
              </div>
              <div class="mb-4">
                <form-label :show="true" for="Handle">
                  Handle
                </form-label>
                <text-field id="Handle" type="text" name="handle" :value="handle" :error="fields.includes('handle')" :readonly="true"/>
              </div>
              <div v-for="field in additionalFields" class="mb-4 border-t py-4 border-1 border-grey-lighter">
                <div v-if="field.type === 'text'">
                  <heading-3>
                    Text
                  </heading-3>
                  <div class="mb-4">
                    <form-label :show="true" :for="`${field.id}-title`">
                      Title
                    </form-label>
                    <text-field :id="`${field.id}-title`" type="text" :name="`${field.id}-title`"/>
                  </div>
                  <div class="mb-4">
                    <form-label :show="true" :for="`${field.id}-handle`">
                      Handle
                    </form-label>
                    <text-field :id="`${field.id}-handle`" type="text" :name="`${field.id}-handle`"/>
                  </div>
                  <div class="mb-4">
                    <form-label :show="true" :for="`${field.id}-value`">
                      Value
                    </form-label>
                    <text-field :id="`${field.id}-value`" type="text" :name="`${field.id}-value`"/>
                  </div>
                </div>
                <div v-else-if="field.type === 'select'">

                </div>
              </div>
            </div>
            <div class="bg-white rounded shadow-lg p-4 mb-4">
              <form-label :show="true" :for="`collections`">
                Collections
              </form-label>              
            </div>
            <div class="px-2">
              <primary-button type="submit">
                Create item
              </primary-button>
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
import ErrorsBlock from '../snippets/errors-block.vue';
import PrimaryButton from '../components/primary-button.vue';
import AdminContainer from '../snippets/admin-container.vue';
import TextField from '../components/text-field.vue';
import EmailField from '../components/email-field.vue';
import FormLabel from '../components/form-label.vue';
import SelectField from '../components/select-field.vue';
import IconAddItem from '../components/icon-add-item.vue';
import Heading3 from '../components/heading-3.vue';

export default {
  name: 'create-item',
  components: {
    "errors-block": ErrorsBlock,
    "primary-button": PrimaryButton,
    "admin-container": AdminContainer,
    "text-field": TextField,
    "email-field": EmailField,
    "form-label": FormLabel,
    "select-field": SelectField,
    "icon-add-item": IconAddItem,
    "heading-3": Heading3,
  },
  data () {
    const { form, errors } = window.siteData;
    return {
      form: form,
      errors, errors,
      fields: errors ? errors.map(error => error.field) : [],
      handle: form.handle || '',
      title: form.title || '',
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
      this.permalink = `/${this.handle}`;
    },
    handleize: function (str) {
      return str.toLowerCase().replace(/[^\w\u00C0-\u024f]+/g, "-").replace(/^-+|-+$/g, "");
    }
  }
}
</script>
