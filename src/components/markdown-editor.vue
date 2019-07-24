<template>
  <div class="rounded text-base border focus:border-accent shadow-lg">
    <div class="flex items-center justify-center w-full border-b py-2">
      <div>
        <button type="button" role="button" @click="preview = !preview" class="outline-none focus:outline-none active:outline-none">
          <span v-if="preview">
            <icon-eye-hide/>
          </span>
          <span v-else>
            <icon-eye/>
          </span>
        </button>
      </div>
    </div>
    <textarea :class="[`w-full outline-none focus:outline-none active:outline-none h-${h} p-2`, preview ? `hidden`: ``]" :value="markdown" @input="update" :name="name"></textarea>
    <div :class="[`h-${h} p-2`, preview ? ``: `hidden`]" v-html="compiledMarkdown">
    </div>
  </div>
</template>

<script>
import marked from 'marked';

import IconHideEye from '../components/icon-eye-hide.vue';
import IconEye from '../components/icon-eye.vue';
export default {
  name: 'markdown-editor',
  components: {
    "icon-eye": IconEye,
    "icon-eye-hide": IconHideEye,
  },
  data () {
    return {
      markdown: '',
      preview: false,
      h: this.height || '64'
    }
  },
  computed: {
    compiledMarkdown () {
      return marked(this.markdown)
    }
  },
  methods: {
    update (e) {
      this.markdown = e.target.value
    }
  },
  props: {
    value: String,
    name: {
      type: String,
      required: true
    },
    error: Boolean,
    height: String,
  }
}
</script>
