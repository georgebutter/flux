<template>
<div>
  <div class="inline-block relative w-full z-20 mb-2">
    <div class="absolute pin-y translate-y:-100 z-20" v-if="error.length">
      <tooltip colour="pink">
        {{ error }}
      </tooltip>
    </div>
    <div class="inline-block relative w-full">
      <input :disabled="disabled" :class="['rounded p-2 shadow-lg outline-none text-base border w-full', error.length ? 'focus:border-pink border-pink text-pink' : 'border-grey-lighter text-grey focus:border-accent']" type="text" :placeholder="placeholder" :name="name" @input="onInput">
    </div>
  </div>
  <div v-if="tagList.length">
    <button type="button" :aria-label="`Remove ${tag} tag`" title="`Remove ${tag} tag`" class="inline-block cursor-pointer outline-none focus:outline-none active:outline-none" v-for="(tag, index) in tagList" :key="tag" @click="remove(tag)">
      <note colour="primary">
        <span class="flex items-center">
          <span class="mr-1">{{ tag }}</span><icon-close width="20" height="20"/>
        </span>
      </note>
      <input type="hidden" :name="`${namePrefix}-${index}`" :value="tag"/>
    </button>
  </div>
  <div v-if="showList" class="fixed pin z-10" @click="showList = false"/>
</div>
</template>

<script>
import Note from '../components/note.vue';
import Tooltip from '../components/tooltip.vue';
import IconClose from '../components/icon-close.vue';
import axios from 'axios';

export default {
  inheritAttrs: false,
  components: {
    "note": Note,
    "icon-close": IconClose,
    "tooltip": Tooltip,
  },
  methods: {
    onInput (event) {
      this.error = '';
      if (event.data === ',') {
        const tag = event.target.value.replace(',', '');
        event.target.value = tag;

        if (this.tagList.includes(tag)) {
          return this.error = `This item is already tagged "${tag}".`
        }

        this.tagList.push(tag);
        event.target.value = '';
      }
    },
    remove (tag) {
      const index = this.tagList.indexOf(tag);
      if (index > -1) {
        this.tagList.splice(index, 1);
      }
    }
  },
  data () {
    return {
      showList: false,
      inputText: '',
      tagList: this.selectedTags || [],
      error: ''
    }
  },
  props: {
    name: String,
    placeholder: String,
    disabled: Boolean,
    selectedTags: Array,
    namePrefix: {
      type: String,
      required: true
    }
  }
}
</script>
