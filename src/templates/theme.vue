
<template>
  <admin-container>
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
                <li class="inline-block bg-white p-2 mr-1" v-for="file in openFiles" @click="closeTab(file.url)">
                  {{ file.url }}
                  <span>
                    <icon-close width="16" height="16"/>
                  </span>
                </li>
              </ul>
            </div>
            <code-editor :code="currentFile" :format="currentFormat"/>
          </div>
        </div>
      </div>
    </section>
  </admin-container>
</template>

<script>
import AdminContainer from '../snippets/admin-container.vue';
import IconOpenFolder from '../components/icon-open-folder.vue';
import IconClose from '../components/icon-close.vue';
import CodeEditor from '../components/code-editor.vue';

export default {
  name: 'theme',
  components: {
    "icon-open-folder": IconOpenFolder,
    "icon-close": IconClose,
    "admin-container": AdminContainer,
    "code-editor": CodeEditor,
  },
  methods: {
    closeTab(key) {
      delete this.openFiles[key];
      this.currentFile = this.currentFile;
    },
    getFile(parent, file) {
      fetch(`/admin/themes/${this.theme}/${parent}/${file}`)
      .then(
        (response) => {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }

          // Examine the text in the response
          response.text().then((data) => {
            console.log(data);
            this.currentFile = data;
            this.currentFormat = file.split('.')[1];
            this.openFiles[`${parent}/${file}`] = {
              content: data,
              url: `${parent}/${file}`
            }
          });
        }
      )
    }
  },
  data () {
    const {
      theme,
      fileTree
    } = window.siteData;

    return {
      theme: theme,
      fileTree: fileTree,
      openFiles: {},
      currentFile: '',
      currentFormat: '',
    }
  }
}
</script>
