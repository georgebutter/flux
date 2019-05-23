<template>
<monaco-editor ref="editor" class="w-full min-h-screen" v-model="code" :language="format">
</monaco-editor>
</template>

<script>
import MonacoEditor from 'vue-monaco'
export default {
  components: {
    MonacoEditor
  },
  props: {
    code: String,
    format: String,
  }
}
</script>
