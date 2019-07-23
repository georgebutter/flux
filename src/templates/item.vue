<template>
  <admin-container>
    <section class="p-6">
      <form :action="`/admin/items/${item._id}/update`" method="post" autocomplete="off" novalidate>
        <errors-block :errors="errors"/>
        <div class="flex mb-4">
          <div class="w-3/5 px-2">
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
            </div>
            <div class="bg-white rounded shadow-lg p-4 mb-4">
              <form-label :show="true" :for="`collections`">
                Collections
              </form-label>
              <asset-select namePrefix="collections" asset="collections" :selectedIds="item.collections"/>
            </div>
            <div class="flex">
              <div class="w-1/2">
                <primary-button type="submit">
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
          <div class="w-2/5 px-2">
            <div class="bg-white rounded shadow-lg p-4 mb-4">
              <form-label :show="true">
                Tags
              </form-label>
              <tag-select namePrefix="tags" :selectedTags="tags"/>
            </div>
          </div>
        </div>
      </form>
    </section>
  </admin-container>
</template>

<script>
import axios from 'axios';
import ErrorsBlock from '../snippets/errors-block.vue';
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

export default {
  name: 'create-item',
  components: {
    "errors-block": ErrorsBlock,
    "primary-button": PrimaryButton,
    "warning-button": WarningButton,
    "admin-container": AdminContainer,
    "text-field": TextField,
    "email-field": EmailField,
    "form-label": FormLabel,
    "select-field": SelectField,
    "icon-add-item": IconAddItem,
    "heading-3": Heading3,
    "tag-select": TagSelect,
    "asset-select": AssetSelect,
  },
  data () {
    const { item, errors } = window.siteData;
    return {
      item: item,
      errors, errors,
      fields: errors ? errors.map(error => error.field) : [],
      handle: item.handle || '',
      title: item.title || '',
      tags: item.tags || []
    }
  },
  methods: {
    createHandle (e) {
      this.handle = this.handleize(e.target.value);
      this.permalink = `/${this.handle}`;
    },
    handleize (str) {
      return str.toLowerCase().replace(/[^\w\u00C0-\u024f]+/g, "-").replace(/^-+|-+$/g, "");
    },
    deleteItem () {
      const url = `/admin/items/${this.item._id}`;
      axios.delete(url).then(res => {
        window.location.href = '/admin/items';
      })
    }
  }
}
</script>
