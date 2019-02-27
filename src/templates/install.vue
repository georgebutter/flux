
<template>
  <div id="app" class="font-sans flex flex-col flex-grow">
    <div class="w-full max-w-sm p-4 self-center">
      <form action="/install/site" method="post" class="bg-white rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <ul class="border py-2 rounded text-pink-dark list-reset border-pink-dark px-3 text-sm">
            <li v-for="error in errors">
              {{ error }}
            </li>
          </ul>
        </div>
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="SiteName">
            <span>Site Name</span>
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="SiteName" name="name" type="text" placeholder="Site name"/>
        </div>
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="Description">
            <span>Description</span>
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="Description" name="description" type="text" placeholder="Description"/>
        </div>
        <div class="mb-6">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="Email">
            <span>Email</span>
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="Email" type="email" name="email" placeholder="Site email"/>
        </div>

        <div class="flex items-center justify-between">
          <button type="submit" class="bg-indigo hover:bg-indigo-dark text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      errors: window.siteData.errors
    }
  }
}
</script>

<style src="../styles/main.css"></style>
