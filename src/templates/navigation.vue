<template>
  <section class="p-6">
    <div class="max-w-lg mx-auto">
      <div v-if="navigation && navigation.length">
        <brick>
          <div class="flex -mx-4 border-b border-grey-lighter">
            <div class="w-1/3 p-4">
              <h4>
                Title
              </h4>
            </div>
            <div class="w-1/3 p-4">
              <h4>
                Handle
              </h4>
            </div>
          </div>
          <a :href="'/admin/navigation/' + navigation.id" class="flex -mx-4 rounded hover:bg-grey-lightest text-grey hover:text-black" v-for="navigation in navigation">
            <div class="w-1/3 p-4">
              <p class="underline-none">
                {{ navigation.title }}
              </p>
            </div>
            <div class="w-1/3 p-4">
              <p class="underline-none">
                {{ navigation.handle }}
              </p>
            </div>
          </a>
        </brick>
        <div class="max-w-lg mx-auto text-right py-4">
          <primary-button href="/admin/navigation/create">
            Create a new navigation
          </primary-button>
        </div>
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
</template>

<script>
import PrimaryButton from '../components/primary-button.vue';
import Brick from '../components/brick.vue';
import IconNavigation from '../components/icon-navigation.vue';

export default {
  name: 'navigation',
  components: {
    PrimaryButton,
    Brick,
    IconNavigation,
  },
  data () {
    const { navigation } = window.siteData;
    return {
      navigation: navigation
    }
  }
}
</script>
