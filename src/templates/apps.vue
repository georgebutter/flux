<template>
  <admin-container>
    <section class="p-6">
      <div v-if="apps && apps.length" class="bg-white rounded shadow-lg p-4">
        <div v-for="app in apps">
          <div class="flex">
            <div class="w-1/2">
              <h2>{{ app.name }}</h2>
            </div>
            <div class="w-1/2 text-right">
              <primary-button :href="'/admin/apps/' + app.id">
                Edit
              </primary-button>
            </div>
          </div>
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
  </admin-container>
</template>

<script>
import AdminContainer from '../snippets/admin-container.vue';
import PrimaryButton from '../components/primary-button.vue';
import IconApps from '../components/icon-apps.vue';
export default {
  name: 'apps',
  components: {
    "primary-button": PrimaryButton,
    "admin-container": AdminContainer,
    "icon-apps": IconApps,
  },
  data () {
    const { apps } = window.siteData;
    return {
      apps: apps
    }
  }
}
</script>
