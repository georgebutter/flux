<template>
<div class="inline-block relative w-full">
  <div class="inline-block relative w-full">
    <input :disabled="disabled" class="rounded p-2 pl-8 shadow-lg outline-none text-base border border-grey-lighter focus:border-accent text-grey w-full" type="text" :placeholder="placeholder" :name="name" @focus="onFocus" @blur="onBlur">
    <div class="absolute pin-y pin-l flex items-center px-2 text-grey-light pointer-events-none">
      <icon-search width="20" height="20"/>
    </div>
  </div>
  <div :class="['absolute pin-b pt-2 translate-y-full w-full', showList ? '' : 'hidden']">
    <ul class="list-reset shadow-lg bg-white rounded">
      <li class="hover:bg-grey-lightest cursor-pointer p-2" v-for="item in computedList">{{ item.title }}</li>
    </ul>
  </div>
</div>
</template>

<script>
import IconArrowDown from '../components/icon-arrow-down.vue';
import IconSearch from '../components/icon-search.vue';

export default {
  inheritAttrs: false,
  components: {
    "icon-search": IconSearch,
    "icon-arrow-down": IconArrowDown,
  },
  methods: {
    onFocus () {
      this.showList = true;
    },
    onBlur () {
      this.showList = false;
    }
  },
  data () {
    return {
      showList: false,
      computedList: this.list
    }
  },
  props: {
    name: String,
    placeholder: String,
    disabled: Boolean,
    list: Array
  }
}
</script>
