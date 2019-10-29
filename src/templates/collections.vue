<template>
  <section class="p-6">
    <div class="max-w-lg mx-auto">
      <div v-if="loading">
        <brick>
          <div class="flex -mx-4 border-b border-grey-lighter">
            <div class="w-full p-4">
              <h4>
                Collection title
              </h4>
            </div>
          </div>
        </brick>
      </div>
      <div v-else>
        <div v-if="collections && collections.length">
          <brick>
            <div class="flex -mx-4 border-b border-grey-lighter">
              <div class="w-full p-4">
                <h4>
                  Collection title
                </h4>
              </div>
            </div>
            <router-link :to="`/admin/collections/${collection._id}`" class="flex -mx-4 rounded hover:bg-grey-lightest text-grey hover:text-black" v-for="collection in collections">
              <div class="w-1/3 p-4">
                <p class="underline-none">
                  {{ collection.title }}
                </p>
              </div>
            </router-link>
          </brick>
          <div class="w-full text-right py-4">
            <primary-button href="/admin/collections/create">
              Create a new collection
            </primary-button>
          </div>
        </div>
        <div class="p-4 text-center" v-else>
          <div class="text-grey mb-4">
            <icon-collection width="100" height="100"/>
          </div>
          <h2 class="mb-4">Create a new collection</h2>
          <p class="mb-4">
            Collections are groups of information that you can access on your site. For example, a blog can be a collection of articles, or a menu can be a collection of links.
          </p>
          <primary-button href="/admin/collections/create" :loading="sending">
            Create a new collection
          </primary-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PrimaryButton from '../components/primary-button.vue';
import IconCollection from '../components/icon-collection.vue';
import Brick from '../components/brick.vue';
import axios from 'axios';

export default {
  name: 'collections',
  components: {
    PrimaryButton,
    IconCollection,
    Brick,
  },
  data () {
    return {
      collections: null,
      loading: false,
      error: false,
      sending: false
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
      this.error = this.collections = null
      this.loading = true
      console.log('fetching data')
      axios.get(`/admin/collections.json`)
      .then(res => {
        console.log(res)
        if (res.data.status === 'success') {
          this.collections = res.data.collections;
        }
        this.loading = false
      })
    }
  }
}
</script>
