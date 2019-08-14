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
    <div :class="[`h-${h} p-2 overflow-y-scroll overflow-x-auto rte `, preview ? ``: `hidden`]" v-html="compiledMarkdown">
    </div>
  </div>
</template>


<script>
import marked from 'marked';
import IconHideEye from '../components/icon-eye-hide.vue';
import IconEye from '../components/icon-eye.vue';
import Prism from 'prismjs';
import Liquid from 'liquidjs';
const engine = new Liquid();

// Register highlight tag
engine.registerTag('highlight', {
  parse: function(tagToken, remainTokens) {
    this.str = tagToken.args;
    this.tpl = [];
    const stream = engine.parser.parseStream(remainTokens)
      .on('start', () => {
        console.log(this)
      })
      .on('tag:endhighlight', () => stream.stop())
      .on('template', tpl => {
        console.log(tpl)
        this.tpl.push(tpl)
      })
      .on('end', () => {
        throw new Error(`tag ${tagToken.raw} not closed`)
      })

    stream.start()
  },
  render: async function(scope, hash) {
    let code = '';
    console.log(this.tpl)
    for (let i = 0; i < this.tpl.length; i++) {
      const block = this.tpl[i].raw
      code += block
    }
    const prismCode = Prism.highlight(code, Prism.languages[this.str], this.str);
    return `<pre><code class="language-${this.str}">${prismCode}</code></pre>`;
  },
});

export default {
  name: 'markdown-editor',
  components: {
    "icon-eye": IconEye,
    "icon-eye-hide": IconHideEye,
  },
  data () {
    return {
      markdown: this.value || '',
      preview: false,
      compiledMarkdown: '',
      h: this.height || '64'
    }
  },
  methods: {
    update (e, val) {
      this.markdown = e ? e.target.value : val;
      engine
      .parseAndRender(this.markdown)
      .then(content => {
        this.compiledMarkdown = marked(content);
      })
    }
  },
  mounted() {
    this.update(null, this.markdown)
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
