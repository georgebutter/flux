
<template>
  <section>
    <div class="bg-white shadow py-2 fixed pin-t pin-x py-2 shadow z-60">
      <div class="container mx-auto">
        <div class="-mx-4">
          <a href="#colours" class="no-underline text-uppercase text-black">Colours</a>
          <a href="#typography" class="no-underline text-uppercase text-black">Typography</a>
          <a href="#components" class="no-underline text-uppercase text-black">Components</a>
        </div>
      </div>
    </div>
    <div class="py-10 px-4">
      <div class="container mx-auto">
        <div class="flex flex-wrap -mx-4 mb-4">
          <div class="w-full p-2">
            <h2 id="colours" name="colours" class="mb-4">
              <a href="#colours" class="text-accent no-underline">
                Colours
              </a>
            </h2>
          </div>
          <div class="w-full md:w-1/2 p-2">
            <h3 class="uppercase text-black mb-4">
              Primary Colours
            </h3>
            <div class="flex -mx-2">
              <swatch
                v-for="color in primary"
                v-bind:key="color.hex"
                v-bind:color="color"
                v-bind:column="'flex-1'"
              />
            </div>
          </div>
          <div class="w-full md:w-1/2 p-2">
            <h3 class="uppercase text-black mb-4">
              Accent Colours
            </h3>
            <div class="flex -mx-2">
              <swatch
                v-for="color in accent"
                v-bind:key="color.hex"
                v-bind:color="color"
                v-bind:column="'flex-1'"
              />
            </div>
          </div>
        </div>
        <div class="flex -mx-4 mb-4">
          <div class="flex-1 p-2">
            <h3 class="uppercase text-black mb-4">
              Semantic Colours
            </h3>
          </div>
        </div>
        <div class="flex flex-wrap -mx-4 mb-4">
          <div class="w-full md:w-1/2 p-2">
            <div class="flex -mx-2">
              <swatch
                v-for="color in yellow"
                v-bind:key="color.hex"
                v-bind:color="color"
                v-bind:column="'flex-1'"
              />
            </div>
          </div>
          <div class="w-full md:w-1/2 p-2">
            <div class="flex -mx-2">
              <swatch
                v-for="color in orange"
                v-bind:key="color.hex"
                v-bind:color="color"
                v-bind:column="'flex-1'"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-wrap -mx-4 mb-4">
          <div class="w-full md:w-1/2 p-2">
            <div class="flex -mx-2">
              <swatch
                v-for="color in cyan"
                v-bind:key="color.hex"
                v-bind:color="color"
                v-bind:column="'flex-1'"
              />
            </div>
          </div>
          <div class="w-full md:w-1/2 p-2">
            <div class="flex -mx-2">
              <swatch
                v-for="color in green"
                v-bind:key="color.hex"
                v-bind:color="color"
                v-bind:column="'flex-1'"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-wrap -mx-4 mb-4">
          <div class="w-full md:w-1/2 p-2">
            <div class="flex -mx-2">
              <swatch
                v-for="color in pink"
                v-bind:key="color.hex"
                v-bind:color="color"
                v-bind:column="'flex-1'"
              />
            </div>
          </div>
        </div>
        <div class="flex -mx-4 mb-4">
          <div class="flex-1 p-2">
            <h3 class="uppercase text-black">
              Neutral Colours
            </h3>
          </div>
        </div>
        <div class="flex flex-wrap -mx-4 mb-4">
          <div class="w-full p-2">
            <div class="flex flex-wrap -mx-2">
              <swatch
                v-for="color in neutral"
                v-bind:key="color.hex"
                v-bind:color="color"
                v-bind:column="'w-1/3 md:w-1/6'"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="py-10 px-4">
      <div class="container mx-auto text-black">
        <div class="flex flex-wrap -mx-4 mb-4">
          <div class="w-full p-2">
            <h2 id="typography" name="typography" class="mb-4">
              <a href="#typography" class="text-accent no-underline">
                Typography
              </a>
            </h2>
          </div>
          <div class="w-full p-2 text-center">
            <p class="text-5xl mb-5 font-bold">Work Sans</p>
          </div>
          <div class="w-full md:w-1/4 p-2">
            <h1 class="mb-4 text-4xl">
              Heading 1
            </h1>
          </div>
          <div class="w-full md:w-1/4 p-2">
            <h2 class="mb-4 text-3xl">
              Heading 2
            </h2>
          </div>
          <div class="w-full md:w-1/4 p-2">
            <heading-3>
              Heading 3
            </heading-3>
          </div>
          <div class="w-full md:w-1/4 p-2">
            <h4 class="mb-4 text-lg font-normal">
              Heading 4
            </h4>
          </div>
          <div class="w-full md:w-1/4 p-2">
            <h5 class="mb-4 text-md">
              Heading 5
            </h5>
          </div>
          <div class="w-full md:w-1/4 p-2">
            <h6 class="mb-4 text-base">
              Heading 6
            </h6>
          </div>
        </div>
      </div>
    </div>
    <div class="py-10 px-4">
      <div class="container mx-auto text-black">
        <div class="flex flex-wrap -mx-4 mb-4">
          <div class="w-full p-2">
            <h2 id="components" name="components" class="mb-4">
              <a href="#components" class="text-accent no-underline">
                Components
              </a>
            </h2>
          </div>
          <div class="w-full p-2">
            <h3 class="uppercase text-black mb-4">
              Buttons
            </h3>
          </div>
          <div class="w-1/2 flex flex-wrap">
            <h4 class="uppercase text-black mb-4 w-full">
              Primary Button
            </h4>
            <div class="w-1/2 mb-8">
              <primary-button>Default</primary-button>
            </div>
            <div class="w-1/2 mb-8">
              <primary-button disabled>Disabled</primary-button>
            </div>
          </div>
          <div class="w-1/2 flex flex-wrap">
            <h4 class="uppercase text-black mb-4 w-full">
              Secondary Button
            </h4>
            <div class="w-1/2 mb-8">
              <secondary-button>Default</secondary-button>
            </div>
            <div class="w-1/2 mb-8">
              <secondary-button disabled>Disabled</secondary-button>
            </div>
          </div>
          <div class="w-1/2 flex flex-wrap">
            <h4 class="uppercase text-black mb-4 w-full">
              Warning Button
            </h4>
            <div class="w-1/2 mb-8">
              <warning-button>Default</warning-button>
            </div>
            <div class="w-1/2 mb-8">
              <warning-button disabled>Disabled</warning-button>
            </div>
          </div>
          <div class="w-full p-2">
            <h3 class="uppercase text-black mb-4">
              Inputs
            </h3>
          </div>
          <div class="w-full -mx-4 flex">
            <div class="w-1/3 flex flex-wrap px-4">
              <form class="w-full" autocomplete="off">
                <form-label :show="true">
                  Input field
                </form-label>
                <text-field placeholder="Placeholder"/>
              </form>
            </div>
            <div class="w-1/3 flex flex-wrap px-4">
              <form-label :show="true">
                Password field
              </form-label>
              <password-field/>
            </div>
          </div>

          <div class="w-full p-2 mt-8">
            <h3 class="uppercase text-black mb-4">
              Other Components
            </h3>
          </div>
          <div class="w-1/2 p-2">
            <h4 class="uppercase text-black mb-4">
              Switch
            </h4>
            <div class="mb-4">
              <toggle :toggleOn="toggleOn" @toggleSwitch="toggleOn = !toggleOn"/>
            </div>
          </div>
          <div class="w-1/2 p-2">
            <h4 class="uppercase text-black mb-4">
              Multi select
            </h4>
            <div class="mb-4">
              <multi-select
                namePrefix="test"
                :list="[{ title: 'Home', value: 'home' }, { title: 'Blog', value: 'blog' }, { title: 'Article', value: 'article'}, { title: 'Item', value: 'item' }]"
              >
              </multi-select>
            </div>
          </div>
          <div class="w-1/2 p-2">
            <h4 class="uppercase text-black mb-4">
              Asset select
            </h4>
            <div class="mb-4">
              <asset-select namePrefix="collections" asset="collections"/>
            </div>
          </div>
          <div class="w-1/2 p-2">
            <h4 class="uppercase text-black mb-4">
              Tag select
            </h4>
            <div class="mb-4">
              <tag-select namePrefix="tag"/>
            </div>
          </div>
          <div class="w-full">
            <h4 class="uppercase text-black mb-4">
              Tooltips
            </h4>
            <div>
              <div class="p-2 inline-block">
                <tooltip colour="pink">Error</tooltip>
              </div>
              <div class="p-2 inline-block">
                <tooltip colour="pink" position="bottom">Error</tooltip>
              </div>
              <div class="p-2 inline-block">
                <tooltip colour="pink" position="left">Error</tooltip>
              </div>
              <div class="p-2 inline-block">
                <tooltip colour="pink" position="right">Error</tooltip>
              </div>
            </div>
          </div>
          <div class="w-full">
            <h4 class="uppercase text-black mb-4">
              Labels
            </h4>
            <div>
              <note colour="primary">Primary</note>
              <note colour="accent">Accent</note>
              <note colour="cyan">Information</note>
              <note colour="pink">Error</note>
              <note colour="green">Success</note>
              <note colour="yellow">Warning</note>
              <note colour="orange">Other</note>
            </div>
            <div>
              <note inverse colour="primary">Primary</note>
              <note inverse colour="accent">Accent</note>
              <note inverse colour="cyan">Information</note>
              <note inverse colour="pink">Error</note>
              <note inverse colour="green">Success</note>
              <note inverse colour="yellow">Warning</note>
              <note inverse colour="orange">Other</note>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PrimaryButton from '../components/primary-button.vue';
import SecondaryButton from '../components/secondary-button.vue';
import WarningButton from '../components/warning-button.vue';
import PasswordField from '../components/password-field.vue';
import FormLabel from '../components/form-label.vue';
import TextField from '../components/text-field.vue';
import Swatch from '../components/swatch.vue';
import Tooltip from '../components/tooltip.vue';
import Toggle from '../components/toggle.vue';
import Note from '../components/note.vue';
import Heading3 from '../components/heading-3.vue';
import MultiSelect from '../components/multi-select.vue';
import AssetSelect from '../components/asset-select.vue';
import TagSelect from '../components/tag-select.vue';

export default {
  name: 'style-guide',
  components: {
    "swatch": Swatch,
    "tooltip": Tooltip,
    "toggle": Toggle,
    "note": Note,
    "primary-button": PrimaryButton,
    "secondary-button": SecondaryButton,
    "warning-button": WarningButton,
    "password-field": PasswordField,
    "form-label": FormLabel,
    "text-field": TextField,
    "heading-3": Heading3,
    "tag-select": TagSelect,
    "asset-select": AssetSelect,
    "multi-select": MultiSelect,
  },
  data () {
    return {
      toggleOn: false,
      primary: [
        {
          hex: '#BE52F2',
          class: 'primary'
        },
        {
          hex: '#DBA5F5',
          class: 'primary-light'
        },
        {
          hex: '#EEDFF2',
          class: 'primary-lighter'
        },
      ],
      accent: [
        {
          hex: '#6979F8',
          class: 'accent'
        },
        {
          hex: '#A5AFFB',
          class: 'accent-light'
        },
        {
          hex: '#E5E7FA',
          class: 'accent-lighter'
        },
      ],
      yellow: [
        {
          hex: '#FFCF5C',
          class: 'yellow'
        },
        {
          hex: '#FFE29D',
          class: 'yellow-light'
        },
        {
          hex: '#FFF8E7',
          class: 'yellow-lighter'
        },
      ],
      orange: [
        {
          hex: '#FFA26B',
          class: 'orange'
        },
        {
          hex: '#FFC7A6',
          class: 'orange-light'
        },
        {
          hex: '#FFE8DA',
          class: 'orange-lighter'
        },
      ],
      cyan: [
        {
          hex: '#0084F4',
          class: 'cyan'
        },
        {
          hex: '#66B5F8',
          class: 'cyan-light'
        },
        {
          hex: '#D5E9FA',
          class: 'cyan-lighter'
        },
      ],
      green: [
        {
          hex: '#00C48C',
          class: 'green'
        },
        {
          hex: '#7DDFC3',
          class: 'green-light'
        },
        {
          hex: '#D5F2EA',
          class: 'green-lighter'
        },
      ],
      pink: [
        {
          hex: '#FF647C',
          class: 'pink'
        },
        {
          hex: '#FDAFBB',
          class: 'pink-light'
        },
        {
          hex: '#FBE4E8',
          class: 'pink-lighter'
        },
      ],
      neutral: [
        {
          hex: '#1A051D',
          class: 'black'
        },
        {
          hex: '#3F3356',
          class: 'grey'
        },
        {
          hex: '#D0C9D6',
          class: 'grey-light'
        },
        {
          hex: '#ECE9F1',
          class: 'grey-lighter'
        },
        {
          hex: '#F7F5F9',
          class: 'grey-lightest'
        },
        {
          hex: '#FFFFFF',
          class: 'white'
        },
      ]
    }
  }
}
</script>

<style src="../styles/main.css"></style>
