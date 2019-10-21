<template>
  <section class="p-6">
    <div v-if="apps && apps.length">
      <div class="bg-white rounded shadow-lg px-4">
        <div class="flex -mx-4 border-b border-grey-lighter">
          <div class="w-1/3 p-4">
            <h4>
              Private app name
            </h4>
          </div>
          <div class="w-1/3 p-4">
            <h4>
              API key
            </h4>
          </div>
          <div class="w-1/3 p-4">
            <h4>
              Contact email
            </h4>
          </div>
        </div>
        <a :href="'/admin/apps/' + app.id" class="flex -mx-4 rounded hover:bg-grey-lightest text-grey hover:text-black" v-for="app in apps">
          <div class="w-1/3 p-4">
            <p class="underline-none">
              {{ app.name }}
            </p>
          </div>
          <div class="w-1/3 p-4">
            <p class="underline-none">
              {{ app.key }}
            </p>
          </div>
          <div class="w-1/3 p-4">
            <p class="underline-none">
              {{ app.email }}
            </p>
          </div>
        </a>
      </div>
      <div class="w-full text-right py-4">
        <primary-button href="/admin/apps/create">
          Create a new app
        </primary-button>
      </div>
    </div>
    <div class="p-4 text-center" v-else>
      <div class="text-grey mb-4">
        <icon-apps width="100" height="100"/>
      </div>
      <h2 class="mb-4">Create a new app</h2>
      <p class="mb-4">
        Apps can automate site processes and allow external services to interact with your site.
      </p>
      <primary-button href="/admin/apps/create">
        Create a new app
      </primary-button>
    </div>
  </section>
</template>

<script>
import PrimaryButton from '../components/primary-button.vue';
import IconApps from '../components/icon-apps.vue';
export default {
  name: 'apps',
  components: {
    PrimaryButton,
    IconApps,
  },
  data () {
    const { apps } = window.siteData;
    return {
      apps: apps
    }
  }
}
</script>
