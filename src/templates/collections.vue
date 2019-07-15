<template>
  <admin-container>
    <section class="p-6">
      <div class="max-w-lg mx-auto">
        <div v-if="collections && collections.length" class="bg-white rounded shadow-lg px-4">
          <div class="flex -mx-4 border-b border-grey-lighter">
            <div class="w-full p-4">
              <h4>
                Collection title
              </h4>
            </div>
          </div>
          <a :href="'/admin/collections/' + collection._id" class="flex -mx-4 rounded hover:bg-grey-lightest text-grey hover:text-black" v-for="collection in collections">
            <div class="w-1/3 p-4">
              <p class="underline-none">
                {{ collection.title }}
              </p>
            </div>
          </a>
        </div>
        <div class="p-4 text-center" v-else>
          <div class="text-grey mb-4">
            <icon-collection width="100" height="100"/>
          </div>
          <h2 class="mb-4">Create a new collection</h2>
          <p class="mb-4">
            Collections are groups of information that you can access on your site. For example, a blog can be a collection of articles, or a menu can be a collection of links.
          </p>
          <primary-button href="/admin/collections/create">
            Create a new collection
          </primary-button>
        </div>
      </div>
    </section>
  </admin-container>
</template>

<script>
import AdminContainer from '../snippets/admin-container.vue';
import PrimaryButton from '../components/primary-button.vue';
import IconCollection from '../components/icon-collection.vue';

export default {
  name: 'collections',
  components: {
    "admin-container": AdminContainer,
    "primary-button": PrimaryButton,
    "icon-collection": IconCollection,
  },
  data () {
    const { collections } = window.siteData;
    return {
      collections: collections
    }
  }
}
</script>
