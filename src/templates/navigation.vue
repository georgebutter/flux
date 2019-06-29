<template>
  <admin-container>
    <section class="p-6">
      <div class="max-w-lg mx-auto">
        <div v-if="navigation && navigation.length" class="bg-white rounded shadow-lg px-4">
          <div class="flex -mx-4 border-b border-grey-lighter">
            <div class="w-full p-4">
              <h4>
                Navigation name
              </h4>
            </div>
          </div>
          <a :href="'/admin/navigation/' + navigation._id" class="flex -mx-4 rounded hover:bg-grey-lightest text-grey hover:text-black" v-for="navigation in navigation">
            <div class="w-1/3 p-4">
              <p class="underline-none">
                {{ navigation.name }}
              </p>
            </div>
          </a>
        </div>
        <div class="p-4 text-center" v-else>
          <div class="text-grey mb-4">
            <icon-navigation width="100" height="100"/>
          </div>
          <h2 class="mb-4">Create a new navigation</h2>
          <p class="mb-4">
            Create your first menu
          </p>
          <primary-button href="/admin/navigation/create">
            Create a new navigation
          </primary-button>
        </div>
      </div>
    </section>
  </admin-container>
</template>

<script>
import AdminContainer from '../snippets/admin-container.vue';
import PrimaryButton from '../components/primary-button.vue';
import IconNavigation from '../components/icon-navigation.vue';

export default {
  name: 'navigation',
  components: {
    "admin-container": AdminContainer,
    "primary-button": PrimaryButton,
    "icon-navigation": IconNavigation,
  },
  data () {
    const { navigation } = window.siteData;
    return {
      navigation: navigation
    }
  }
}
</script>
