<template>
  <section class="p-6">
    <form v-on:submit="handleSubmit" autocomplete="off" novalidate>
      <errors-block :errors="errors"/>
      <div class="flex mb-4">
        <div class="w-full px-2">
          <brick>
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
          </brick>
          <brick>
            <form-label :show="true" :for="`collections`">
              Collections
            </form-label>
            <asset-select namePrefix="collections" asset="collections"/>
          </brick>
          <div class="px-2">
            <primary-button type="submit">
              Create item
            </primary-button>
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
import Brick from '../components/brick.vue';
import AdminContainer from '../snippets/admin-container.vue';
import TextField from '../components/text-field.vue';
import FormLabel from '../components/form-label.vue';
import Heading3 from '../components/heading-3.vue';
import AssetSelect from '../components/asset-select.vue';

export default {
  name: 'create-item',
  components: {
    ErrorsBlock,
    PrimaryButton,
    Brick,
    AdminContainer,
    TextField,
    FormLabel,
    Heading3,
    AssetSelect,
  },
  data () {
    return {
      errors: [],
      fields:[],
      handle: '',
      title: '',
      updating: false
    }
  },
  methods: {
    createHandle(e) {
      this.handle = this.handleize(e.target.value);
      this.permalink = `/${this.handle}`;
    },
    handleize(str) {
      return str.toLowerCase().replace(/[^\w\u00C0-\u024f]+/g, '-').replace(/^-+|-+$/g, '');
    },
    handleSubmit(e) {
      e.preventDefault();
      this.updating = true
      const url = `/admin/items/create.json`;
      axios.post(url, {
        title: e.target.title.value,
        handle: e.target.handle.value,
      }).then(res => {
        if (res.data.status === 'error') {
          this.errors = res.data.errors
        } else {
          const { item } = res.data
          this.$router.push({ path: `/admin/items/${item._id}` })
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
