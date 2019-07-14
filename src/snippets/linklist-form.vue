<template>
<div class="bg-white rounded-lg shadow-lg px-4 pt-4 mb-4">
  <heading-3>
    Menu items
  </heading-3>
  <div v-if="links.length">
    <draggable v-model="links" group="link" @start="drag=true" @end="drag=false" ghost-class="ghost">
      <transition-group type="transition" :name="'link-list'">
        <div v-for="(link, index) in links" :key="link.__ob__.dep.id" class="py-1 -mx-4 px-4 border-t py-4 border-1 border-grey-lighter flex bg-white">
          <div class="flex items-center pr-2 text-grey-light">
            <icon-drag width="40" height="40" class="cursor-move"/>
          </div>
          <div class="flex-auto flex">
            <div class="mb-4 px-2 w-1/2">
              <form-label :show="true" :for="`title-${index}`">
                Title
              </form-label>
              <text-field :id="`title-${index}`" type="text" :name="`title-${index}`" :value="link.title" :error="fields.includes(`title-${index}`)"/>
            </div>
            <div class="mb-4 px-2 w-1/2">
              <form-label :show="true" :for="`url-${index}`">
                Link
              </form-label>
              <text-field :id="`url-${index}`" type="text" :name="`url-${index}`" :value="link.url" :error="fields.includes(`url-${index}`)" />
            </div>
          </div>
          <div class="flex items-center pl-2 text-grey-light">
            <button class="text-grey-light hover:text-grey outline-none active:outline-none focus:outline-none" type="button" @click="deleteLink(index)">
              <icon-delete width="20" height="20" />
            </button>
          </div>
        </div>
      </transition-group>
    </draggable>
  </div>
  <div v-else>
    <div class="bg-grey-lighter -mx-4 py-8 text-center">
      <p class="text-grey-light">This menu has no links</p>
    </div>
  </div>
  <div class="-mx-4">
    <button type="button" role="button" class="bg-green text-white block w-full outline-none focus:outline-none py-6 px-4 mb-4 hover:bg-green-lighter hover:text-green rounded-b-lg transition-background-color flex justify-center" @click="createLink">
      <icon-add-item width="20" height="20"/><span class="ml-4">Add menu item</span>
    </button>
  </div>
</div>
</template>

<style>
.link-list-move {
  transition: transform 0.3s ease;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>

<script>
import IconAddItem from '../components/icon-add-item.vue';
import IconDrag from '../components/icon-drag.vue';
import IconDelete from '../components/icon-delete.vue';
import TextField from '../components/text-field.vue';
import FormLabel from '../components/form-label.vue';
import Heading3 from '../components/heading-3.vue';
import draggable from 'vuedraggable'

export default {
  name: 'linklist-form',
  components: {
    "icon-add-item": IconAddItem,
    "icon-drag": IconDrag,
    "icon-delete": IconDelete,
    "text-field": TextField,
    "form-label": FormLabel,
    "heading-3": Heading3,
    draggable
  },
  data () {
    const form = window.siteData.form || {};
    const navigation = window.siteData.navigation || {};
    return {
      links: form.links || navigation.links || []
    }
  },
  methods: {
    createLink: function () {
      this.links.push({
        title: '',
        url: ''
      })
    },
    deleteLink (i) {
      this.links.splice(i, 1);
    },
  },
  props: {
    fields: Array,
  }
}
</script>
