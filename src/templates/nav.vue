<template>
  <admin-container>
    <section class="p-6">
      <form :action="`/admin/navigation/${navigation._id}/update`" method="post" autocomplete="off" novalidate>
        <errors-block :errors="errors"/>
        <div class="flex mb-4">
          <div class="w-3/5 px-2">
            <title-block :fields="fields" :value="navigation.title" :createHandle="createHandle"/>
            <linklist-form :fields="fields"/>
            <div class="flex">
              <div class="w-1/2">
                <primary-button type="submit">
                  Update navigation
                </primary-button>
              </div>
              <div class="w-1/2 text-right">
                <warning-button type="button" initializingText="Hold to delete" :action="deleteNavigation">
                  Delete navigation
                </warning-button>
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
import axios from 'axios';
import PrimaryButton from '../components/primary-button.vue';
import WarningButton from '../components/warning-button.vue';
import AdminContainer from '../snippets/admin-container.vue';
import ErrorsBlock from '../snippets/errors-block.vue';
import NavHandle from '../snippets/nav-handle.vue';
import TitleBlock from '../snippets/title-block.vue';
import LinklistForm from '../snippets/linklist-form.vue';

export default {
  name: 'create-navigation',
  components: {
    "primary-button": PrimaryButton,
    "warning-button": WarningButton,
    "admin-container": AdminContainer,
    "errors-block": ErrorsBlock,
    "nav-handle": NavHandle,
    "title-block": TitleBlock,
    "linklist-form": LinklistForm,
  },
  data () {
    const { navigation, errors } = window.siteData;
    return {
      navigation: navigation,
      errors, errors,
      fields: errors ? errors.map(error => error.field) : [],
      handle: navigation.handle || '',
    }
  },
  methods: {
    createHandle (e) {
      this.handle = this.handleize(e.target.value);
    },
    handleize (str) {
      return str.toLowerCase().replace(/[^\w\u00C0-\u024f]+/g, "-").replace(/^-+|-+$/g, "");
    },
    deleteNavigation () {
      const url = `/admin/navigation/${this.navigation._id}`;
      axios.delete(url).then(res => {
        window.location.href = '/admin/navigation';
      })
    }
  }
}
</script>
