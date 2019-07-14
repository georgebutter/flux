<template>
  <admin-container>
    <section class="p-6">
      <form action="/admin/navigation/create" method="post" autocomplete="off" novalidate>
        <errors-block :errors="errors"/>
        <div class="flex mb-4">
          <div class="w-3/5 px-2">
            <title-block :fields="fields" :value="form.title" :createHandle="createHandle"/>
            <linklist-form :fields="fields"/>
            <div class="flex">
              <div class="w-1/2 ">
                <primary-button type="submit">
                  Create navigation
                </primary-button>
              </div>
            </div>
          </div>
          <div class="w-2/5 px-2">
            <nav-handle :fields="fields" :handle="handle"/>
          </div>
        </div>
      </form>
    </section>
  </admin-container>
</template>

<script>
import PrimaryButton from '../components/primary-button.vue';
import AdminContainer from '../snippets/admin-container.vue';
import NavHandle from '../snippets/nav-handle.vue';
import ErrorsBlock from '../snippets/errors-block.vue';
import TitleBlock from '../snippets/title-block.vue';
import LinklistForm from '../snippets/linklist-form.vue';

export default {
  name: 'create-navigation',
  components: {
    "primary-button": PrimaryButton,
    "admin-container": AdminContainer,
    "errors-block": ErrorsBlock,
    "linklist-form": LinklistForm,
    "title-block": TitleBlock,
    "nav-handle": NavHandle,
  },
  data () {
    const { form, errors } = window.siteData;
    return {
      form: form,
      errors, errors,
      fields: errors ? errors.map(error => error.field) : [],
      handle: form.handle || '',
      links: form.links || []
    }
  },
  methods: {
    createHandle: function (e) {
      this.handle = this.handleize(e.target.value);
    },
    handleize: function (str) {
      return str.toLowerCase().replace(/[^\w\u00C0-\u024f]+/g, "-").replace(/^-+|-+$/g, "");
    }
  }
}
</script>
