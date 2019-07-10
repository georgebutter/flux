<template>
  <admin-container>
    <section class="p-6">
      <form :action="`/admin/navigation/${navigation._id}/update`" method="post" autocomplete="off" novalidate>
        <div class="mb-4" v-if="errors">
          <ul class="list-reset">
            <li v-for="error in errors">
              <note colour="pink">{{ error.message }}</note>
            </li>
          </ul>
        </div>
        <div class="flex mb-4">
          <div class="w-3/5 px-2">
            <div class="bg-white rounded-lg shadow-lg p-4 mb-4">
              <form-label :show="true" for="Title">
                Title
              </form-label>
              <text-field id="Title" type="text" name="title" :value="navigation.title" :error="fields.includes('title')" @onInput="createHandle"/>
            </div>
            <div class="bg-white rounded-lg shadow-lg px-4 pt-4 mb-4">
              <heading-3>
                Menu items
              </heading-3>
              <div v-if="links.length">
                <div v-for="(link, index) in links" class="mb-4 border-t py-4 border-1 border-grey-lighter">
                  <div>
                    <div class="mb-4">
                      <form-label :show="true" :for="`title-${index}`">
                        Title
                      </form-label>
                      <text-field :id="`title-${index}`" type="text" :name="`title-${index}`" :value="link.title"/>
                    </div>
                    <div class="mb-4">
                      <form-label :show="true" :for="`url-${index}`">
                        Link
                      </form-label>
                      <text-field :id="`url-${index}`" type="text" :name="`url-${index}`" :value="link.url"/>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="bg-grey-lighter -mx-4 py-8 text-center">
                  <p class="text-grey-light">This menu has no links</p>
                </div>
              </div>
              <div class="-mx-4">
                <button type="button" role="button" class="bg-green text-white block w-full outline-none focus:outline-none py-6 px-4 mb-4 hover:bg-green-lighter hover:text-green rounded-b-lg transition-background-color flex justify-center" @click="createLink">
                  <icon-add-item width="20" height="20"/><span class="ml-4">Add menu item</span>
                </button>
              </div>
            </div>
            <div class="flex">
              <div class="w-1/2 ">
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
            <div class="bg-white shadow-lg rounded p-4">
              <div class="mb-4">
                <form-label :show="true" for="Handle">
                  Handle
                </form-label>
                <text-field id="Handle" type="text" name="handle" :value="handle" :error="fields.includes('handle')" :readonly="true"/>
              </div>
              <p class="mb-4 text-grey-light">The handle is used to access the navigation in your website</p>
              <code class="whitespace-pre-wrap text-grey-light text-sm">
{% for link in linklists.{{ handle }}.links %}
  <span v-pre>{{ link.title }}</span>
{% endfor %}
              </code>
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
import WarningButton from '../components/warning-button.vue';
import AdminContainer from '../snippets/admin-container.vue';
import TextField from '../components/text-field.vue';
import EmailField from '../components/email-field.vue';
import FormLabel from '../components/form-label.vue';
import SelectField from '../components/select-field.vue';
import IconAddItem from '../components/icon-add-item.vue';
import Heading3 from '../components/heading-3.vue';

export default {
  name: 'create-navigation',
  components: {
    "note": Note,
    "primary-button": PrimaryButton,
    "warning-button": WarningButton,
    "admin-container": AdminContainer,
    "text-field": TextField,
    "email-field": EmailField,
    "form-label": FormLabel,
    "select-field": SelectField,
    "heading-3": Heading3,
    "icon-add-item": IconAddItem,
  },
  data () {
    const { navigation, errors } = window.siteData;
    return {
      navigation: navigation,
      errors, errors,
      fields: errors ? errors.map(error => error.field) : [],
      handle: navigation.handle || '',
      links: navigation.links || []
    }
  },
  methods: {
    createLink () {
      this.links.push({
        title: '',
        url: ''
      })
    },
    createHandle (e) {
      this.handle = this.handleize(e.target.value);
    },
    handleize (str) {
      return str.toLowerCase().replace(/[^\w\u00C0-\u024f]+/g, "-").replace(/^-+|-+$/g, "");
    },
    deleteNavigation () {
      console.log(this.navigaton)
    }
  }
}
</script>
