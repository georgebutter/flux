<template>
<div>
  <div class="inline-block relative w-full z-20">
    <div class="inline-block relative w-full">
      <input :disabled="disabled" class="rounded p-2 pl-8 shadow-lg outline-none text-base border border-grey-lighter focus:border-accent text-grey w-full" type="text" :placeholder="placeholder" :name="name" @focus="onFocus">
      <div class="absolute pin-y pin-l flex items-center px-2 text-grey-light pointer-events-none">
        <icon-search width="20" height="20"/>
      </div>
    </div>
    <div :class="['absolute pin-b pt-2 translate-y-full w-full', showList ? '' : 'hidden']">
      <ul class="list-reset shadow-lg bg-white rounded overflow-hidden">
        <li :class="['cursor-pointer p-2 pl-8 relative', selectedValues.includes(item.value) ? 'bg-accent text-accent-lighter hover:bg-accent-lighter hover:text-accent' : 'hover:bg-grey-lightest']" v-for="item in computedList" @click="toggleItem(item)">
          <div class="absolute pin-y pin-l flex items-center px-2 pointer-events-none">
            <icon-tick width="20" height="20" v-if="selectedValues.includes(item.value)"/>
          </div>
          {{ item.title }}
        </li>
      </ul>
    </div>
  </div>
  <ul class="list-reset mt-1 text-grey" v-if="selectedValues.length">
    <li class="flex items-center p-2 hover:bg-grey-lighter cursor-pointer" v-for="(value, index) in selectedValues" :key="value" :aria-title="`Remove ${selectedTitles[index]}`" @click="toggleItem({value: value, title: selectedTitles[index] })">
      <icon-close width="20" height="20"/><span class="ml-1">{{ selectedTitles[index] }}</span>
      <input type="hidden" :name="`${namePrefix}-${index}`" :value="value"
    </li>
  </ul>
  <div v-if="showList" class="fixed pin z-10" @click="showList = false"/>
</div>
</template>

<script>
import IconTick from '../components/icon-tick.vue';
import IconSearch from '../components/icon-search.vue';
import IconClose from '../components/icon-close.vue';

export default {
  inheritAttrs: false,
  components: {
    "icon-search": IconSearch,
    "icon-tick": IconTick,
    "icon-close": IconClose,
  },
  methods: {
    onFocus () {
      this.showList = true;
    },
    onBlur () {
      this.showList = false;
    },
    toggleItem (item) {
      if (this.selectedValues.includes(item.value)) {
        this.selectedTitles.splice(this.selectedValues.indexOf(item.value), 1);
        this.selectedValues.splice(this.selectedValues.indexOf(item.value), 1);
      } else {
        this.selectedTitles.push(item.title);
        this.selectedValues.push(item.value);
      }
      this.showList = false;
    }
  },
  data () {
    return {
      showList: false,
      computedList: this.list,
      selectedValues: [],
      selectedTitles: [],
    }
  },
  props: {
    name: String,
    placeholder: String,
    disabled: Boolean,
    list: Array,
    namePrefix: String,
  }
}
</script>
