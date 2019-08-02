<template>
  <admin-container>
    <section class="p-6">
      <div class="max-w-lg mx-auto">
        <div v-if="items && items.length">
          <brick>
            <div class="flex -mx-4 border-b border-grey-lighter">
              <div class="w-full p-4">
                <h4>
                  Item title
                </h4>
              </div>
            </div>
            <a :href="'/admin/items/' + item.id" class="flex -mx-4 rounded hover:bg-grey-lightest text-grey hover:text-black" v-for="item in items">
              <div class="w-1/3 p-4">
                <p class="underline-none">
                  {{ item.title }}
                </p>
              </div>
            </a>
          </brick>
          <div class="w-full text-right py-4">
            <primary-button href="/admin/items/create">
              Create a new item
            </primary-button>
          </div>
        </div>
        <div class="p-4 text-center" v-else>
          <div class="text-grey mb-4">
            <icon-item width="100" height="100"/>
          </div>
          <h2 class="mb-4">Create a new item</h2>
          <p class="mb-4">
            Items are groups of information that you can access on your site. For example, a blog can be a item of articles, or a menu can be a item of links.
          </p>
          <primary-button href="/admin/items/create">
            Create a new item
          </primary-button>
        </div>
      </div>
    </section>
  </admin-container>
</template>

<script>
import AdminContainer from '../snippets/admin-container.vue';
import PrimaryButton from '../components/primary-button.vue';
import IconItem from '../components/icon-item.vue';
import Brick from '../components/brick.vue';
export default {
  name: 'items',
  components: {
    "admin-container": AdminContainer,
    "primary-button": PrimaryButton,
    "icon-item": IconItem,
    "brick": Brick,
  },
  data () {
    const { items } = window.siteData;
    return {
      items: items
    }
  }
}
</script>
