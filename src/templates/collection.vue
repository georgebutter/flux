<template>
  <section class="p-6">
    <form v-on:submit="handleSubmit" v-if="collection" autocomplete="off" novalidate>
      <errors-block :errors="errors"/>
      <div class="flex mb-4">
        <div class="w-full px-2">
          <brick>
            <div class="mb-4">
              <form-label :show="true" for="Title">
                Title
              </form-label>
              <text-field id="Title" type="text" name="title" :value="collection.title" :error="fields.includes('title')" @onInput="createHandle"/>
            </div>
            <div class="mb-4">
              <form-label :show="true" for="Handle">
                Handle
              </form-label>
              <text-field id="Handle" type="text" name="handle" :value="collection.handle" :error="fields.includes('handle')" :readonly="true"/>
            </div>
            <div class="mb-4">
              <form-label :show="true" for="Permalink">
                Permalink
              </form-label>
              <text-field id="Permalink" type="text" name="permalink" :value="collection.permalink.permalink" :error="fields.includes('permalink')"/>
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
          </brick>
          <div class="flex">
            <div class="w-1/2">
              <primary-button type="submit" :loading="updating">
                Update collection
              </primary-button>
            </div>
            <div class="w-1/2 text-right">
              <warning-button type="button" initializingText="Hold to delete" :action="deleteCollection">
                Delete collection
              </warning-button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import axios from 'axios';
import ErrorsBlock from '../snippets/errors-block.vue';
import PrimaryButton from '../components/primary-button.vue';
import WarningButton from '../components/warning-button.vue';
import Brick from '../components/brick.vue';
import TextField from '../components/text-field.vue';
import EmailField from '../components/email-field.vue';
import FormLabel from '../components/form-label.vue';
import SelectField from '../components/select-field.vue';
import IconAddItem from '../components/icon-add-item.vue';
import Heading3 from '../components/heading-3.vue';
import { handleize } from '../helpers/';

export default {
  name: 'collection',
  components: {
    ErrorsBlock,
    PrimaryButton,
    WarningButton,
    Brick,
    TextField,
    EmailField,
    FormLabel,
    SelectField,
    IconAddItem,
    Heading3,
  },
  data () {
    return {
      collection: null,
      loading: false,
      errors: [],
      fields: [],
      updating: false
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.error = null
      this.loading = true
      axios.get(`/admin/collections/${this.$route.params.id}.json`)
      .then(res => {
        if (res.data.status === 'success') {
          this.collection = res.data.collections[0];
        }
        this.loading = false
      })
    },
    addTextItem () {
      this.additionalFields.push({
        type: 'text',
        id: 'test',
        title: 'Test',
      });
    },
    addSelectItem () {
      this.additionalFields.push({
        type: 'select',
        id: 'test-select',
        title: 'Select',
      });
    },
    createHandle (e) {
      this.handle = handleize(e.target.value);
      this.permalink = `/${this.handle}`;
    },
    deleteCollection () {
      const url = `/admin/collections/${this.collection.id}.json`;
      axios.delete(url).then(res => {
        if (res.data.status === 'success') {
          this.$router.push({ path: `/admin/collections` })
        }
      })
    },
    handleSubmit (e) {
      e.preventDefault();
      this.updating = true
      const url = `/admin/collections/${this.collection.id}/update.json`;
      axios.post(url, {
        title: e.target.title.value,
        permalink: e.target.permalink.value,
        handle: e.target.handle.value,
      }).then(res => {
        if (res.data.status === 'error') {
          this.errors = res.data.errors
          this.form = res.data.form
        } else {
          this.collection = collection
        }
        this.updating = false
      })
      .catch(err => {
        this.updating = false
      })
    }
  }
}
</script>
