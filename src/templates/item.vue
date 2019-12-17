<template>
  <section class="p-6">
    <form v-on:submit="handleSubmit" v-if="item" autocomplete="off" novalidate>
      <errors-block :errors="errors"/>
      <div class="flex flex-wrap flex-row-reverse lg:flex-row mb-4">
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
            <form-label :show="true" for="description">
              Description
            </form-label>
            <markdown-editor name="description" :value="description" @onChange="setDescription($event)"/>
          </brick>
          <brick>
            <form-label :show="true" for="excerpt">
              Excerpt
            </form-label>
            <markdown-editor name="excerpt" :value="excerpt" height="32" @onChange="setExcerpt($event)"/>
          </brick>

          <brick>
            <form-label :show="true">
              Tags
            </form-label>
            <tag-select namePrefix="tags" :selectedTags="tags"/>
          </brick>
          <brick>
            <form-label :show="true" :for="`collections`">
              Collections
            </form-label>
            <asset-select
              namePrefix="collections"
              asset="collections"
              :selectedIds="collections"
              @onChange="setCollections($event)"
            />
          </brick>

          <div class="flex">
            <div class="w-1/2">
              <primary-button type="submit" :loading="updating">
                Update item
              </primary-button>
            </div>
            <div class="w-1/2 text-right">
              <warning-button type="button" initializingText="Hold to delete" :action="deleteItem">
                Delete item
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
import _ from 'lodash';
import ErrorsBlock from '../snippets/errors-block.vue';
import Brick from '../components/brick.vue';
import PrimaryButton from '../components/primary-button.vue';
import WarningButton from '../components/warning-button.vue';
import AdminContainer from '../snippets/admin-container.vue';
import TextField from '../components/text-field.vue';
import EmailField from '../components/email-field.vue';
import FormLabel from '../components/form-label.vue';
import SelectField from '../components/select-field.vue';
import IconAddItem from '../components/icon-add-item.vue';
import Heading3 from '../components/heading-3.vue';
import AssetSelect from '../components/asset-select.vue';
import TagSelect from '../components/tag-select.vue';
import MarkdownEditor from '../components/markdown-editor.vue';
import { handleize } from '../helpers/';

export default {
  name: 'item',
  components: {
    ErrorsBlock,
    Brick,
    PrimaryButton,
    WarningButton,
    AdminContainer,
    TextField,
    EmailField,
    FormLabel,
    SelectField,
    IconAddItem,
    Heading3,
    MarkdownEditor,
    TagSelect,
    AssetSelect,
  },
  data () {
    return {
      item: null,
      errors: [],
      fields: [],
      handle: '',
      title: '',
      description: '',
      excerpt: '',
      collections: [],
      tags: [],
      updating: false,
      loading: false
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
      axios.get(`/admin/items/${this.$route.params.id}.json`)
      .then(res => {
        if (res.data.status === 'success') {
          this.item = res.data.items[0];
          this.handle = this.item.handle;
          this.excerpt = this.item.excerpt;
          this.description = this.item.description;
          this.collections = this.item.collections;
          this.title = this.item.title;
          this.tags = this.item.tags;
        }
        this.loading = false
      })
    },
    createHandle (e) {
      this.title = e.target.value;
      this.handle = handleize(e.target.value);
      this.permalink = `/${this.handle}`;
    },
    deleteItem () {
      const url = `/admin/items/${this.item.id}`;
      axios.delete(url).then(res => {
        window.location.href = '/admin/items';
      })
    },
    setDescription (e) {
      this.description = e;
    },
    setExcerpt (e) {
      this.excerpt = e;
    },
    setCollections (e) {
      console.log(e)
      this.collections = e
    },
    handleSubmit (e) {
      e.preventDefault();
      this.updating = true
      const url = `/admin/items/${this.item.id}.json`;
      axios.put(url, {
        title: this.title,
        handle: this.handle,
        excerpt: this.excerpt,
        description: this.description,
        collections: this.collections,
        tags: this.tags
      }).then(res => {
        if (res.data.status === 'error') {
          this.errors = res.data.errors
        } else {
          this.item = item
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
