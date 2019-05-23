
<template>
  <div id="app" class="w-full flex flex-row">
    <sidebar></sidebar>
    <main class="flex-grow">
      <header class="w-full flex bg-white shadow py-4">
        <div class="w-1/2 px-4">
          {{ site.name }}
        </div>
        <div class="w-1/2 px-4 text-right">
          <a class="no-underline" href="/admin/logout">
            Logout
          </a>
        </div>
      </header>
      <section class="p-6">
        <h1>{{ page_title }} - {{ theme }}</h1>
      </section>
      <section class="p-6">
        <div class="bg-white rounded shadow-lg p-4 flex">
          <div class="w-1/6">
            <ul class="list-reset">
              <li class="mb-2">
                <div class="mb-2">
                  <span class="inline-block text-grey-light">
                    <icon-open-folder width="20" height="20"/>
                  </span>
                  assets
                </div>
                <ul class="list-reset pl-6 text-grey">
                  <li class="mb-2" v-for="file in fileTree.assets">
                    <button class="text-accent outline-none focus:outline-none active:outline-none" @click="getFile('assets', file)">
                      {{ file }}
                    </button>
                  </li>
                </ul>
              </li>
              <li class="mb-2">
                <div class="mb-2">
                  <span class="inline-block text-grey-light">
                    <icon-open-folder width="20" height="20"/>
                  </span>
                  layouts
                </div>
                <ul class="list-reset pl-6 text-grey">
                  <li class="mb-2" v-for="file in fileTree.layouts">
                    <button class="text-accent outline-none focus:outline-none active:outline-none" @click="getFile('layouts', file)">
                      {{ file }}
                    </button>
                  </li>
                </ul>
              </li>
              <li class="mb-2">
                <div class="mb-2">
                  <span class="inline-block text-grey-light">
                    <icon-open-folder width="20" height="20"/>
                  </span>
                  snippets
                </div>
                <ul class="list-reset pl-6 text-grey">
                  <li class="mb-2" v-for="file in fileTree.snippets">
                    <button class="text-accent outline-none focus:outline-none active:outline-none" @click="getFile('snippets', file)">
                      {{ file }}
                    </button>
                  </li>
                </ul>
              </li>
              <li class="mb-2">
                <div class="mb-2">
                  <span class="inline-block text-grey-light">
                    <icon-open-folder width="20" height="20"/>
                  </span>
                  templates
                </div>
                <ul class="list-reset pl-6 text-grey">
                  <li class="mb-2" v-for="file in fileTree.templates">
                    <button class="text-accent outline-none focus:outline-none active:outline-none" @click="getFile('templates', file)">
                      {{ file }}
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="w-5/6">
            <div v-if="currentFile === ''">
              <h3>
                Edit your template files
              </h3>
              <p>
                Choose a file from the left to start editing
              </p>
            </div>
            <div v-else>
              <div class="bg-grey-lighter -mr-4 -mt-4 rounded-tr-lg">
                <ul class="list-reset">
                  <li class="inline-block bg-white p-2" v-for="file in openFiles">
                    {{ file.url }}
                  </li>
                </ul>
              </div>
              <code-editor :code="currentFile" :format="currentFormat"/>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import Sidebar from '../snippets/sidebar.vue';
import IconOpenFolder from '../components/icon-open-folder.vue';
import CodeEditor from '../components/code-editor.vue';

export default {
  name: 'theme',
  components: {
    "icon-open-folder": IconOpenFolder,
    "sidebar": Sidebar,
    "code-editor": CodeEditor,
  },
  methods: {
    getFile(parent, file) {
      fetch(`/admin/themes/${this.theme}/${parent}/${file}.json`)
      .then(
        (response) => {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }

          // Examine the text in the response
          response.json().then((data) => {
            console.log(data);
            this.currentFile = data.file;
            this.currentFormat = data.format;
            this.openFiles[data.url] = {
              content: data.file,
              url: data.url
            }
          });
        }
      )
    }
  },
  data () {
    const {
      site,
      template,
      suffix,
      theme,
      page_title,
      fileTree
    } = window.siteData;

    return {
      suffix: suffix,
      template: template,
      site: site,
      theme: theme,
      page_title: page_title,
      fileTree: fileTree,
      openFiles: {},
      currentFile: '',
      currentFormat: '',
    }
  }
}
</script>
<style src="../styles/main.css"></style>
