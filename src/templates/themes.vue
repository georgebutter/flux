<template>
  <section class="p-6">
    <brick>
      <div v-for="theme in themes">
        <div class="flex">
          <div class="w-1/2">
            <h2>{{ theme }}</h2>
          </div>
          <div class="w-1/2 text-right">
            <primary-button :href="'/admin/themes/' + theme">
              Edit code
            </primary-button>
          </div>
        </div>
      </div>
    </brick>
  </section>
</template>

<script>
import PrimaryButton from '../components/primary-button.vue';
import Brick from '../components/brick.vue';

export default {
  name: 'themes',
  components: {
    PrimaryButton,
    Brick,
  },
  data () {
    const { themes } = window.siteData;
    return {
      themes: themes,
    }
  }
}
</script>
