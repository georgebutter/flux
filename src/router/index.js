import Vue from 'vue'
import Router from 'vue-router'
import dashboard from '../templates/dashboard.vue'
import collections from '../templates/collections.vue'
import collection from '../templates/collection.vue'
import createCollection from '../templates/create-collection.vue'
import items from '../templates/items.vue'
import createItem from '../templates/create-item.vue'
import navigation from '../templates/navigation.vue'
import themes from '../templates/themes.vue'
import apps from '../templates/apps.vue'
import settings from '../templates/settings.vue'
import users from '../templates/users.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/admin/',
      meta: {
        parent: 'Dashboard',
      },
      name: 'Dashboard',
      component: dashboard
    },
    {
      path: '/admin/collections',
      meta: {
        parent: 'Collections',
      },
      name: 'Collections',
      component: collections,
    },
    {
      path: '/admin/collections/create',
      meta: {
        parent: 'Collections',
      },
      name: 'Create a collection',
      component: createCollection,
    },
    {
      path: '/admin/collections/:id',
      meta: {
        parent: 'Collections',
      },
      name: 'Collection',
      component: collection,
    },
    {
      path: '/admin/items',
      meta: {
        parent: 'Items',
      },
      name: 'Items',
      component: items,
    },
    {
      path: '/admin/items/create',
      meta: {
        parent: 'Items',
      },
      name: 'Create Item',
      component: createItem,
    },
    {
      path: '/admin/navigation',
      meta: {
        parent: 'Navigation',
      },
      name: 'Navigation',
      component: navigation
    },
    {
      path: '/admin/themes',
      meta: {
        parent: 'Themes',
      },
      name: 'Themes',
      component: themes
    },
    {
      path: '/admin/apps',
      meta: {
        parent: 'Apps',
      },
      name: 'Apps',
      component: apps
    },
    {
      path: '/admin/settings',
      meta: {
        parent: 'Settings',
      },
      name: 'Settings',
      component: settings
    },
    {
      path: '/admin/users',
      meta: {
        parent: 'Users',
      },
      name: 'Users',
      component: users
    },
  ]
})
