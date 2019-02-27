
<template>
  <section>
    <div class="bg-white shadow py-2">
      <div class="container mx-auto">
        <a href="#colours">Colours</a>
        <a href="#typography">Typography</a>
        <a href="#components">Components</a>
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
            <h1 class="mb-4">
              Heading 1
            </h1>
          </div>
          <div class="w-full md:w-1/4 p-2">
            <h2 class="mb-4">
              Heading 2
            </h2>
          </div>
          <div class="w-full md:w-1/4 p-2">
            <h3 class="mb-4">
              Heading 3
            </h3>
          </div>
          <div class="w-full md:w-1/4 p-2">
            <h4 class="mb-4">
              Heading 4
            </h4>
          </div>
          <div class="w-full md:w-1/4 p-2">
            <h5 class="mb-4">
              Heading 5
            </h5>
          </div>
          <div class="w-full md:w-1/4 p-2">
            <h6 class="mb-4">
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
          <div class="w-1/3 flex flex-wrap">
            <div class="w-1/2 mb-8">
              <primary-button>Default</primary-button>
            </div>
            <div class="w-1/2 mb-8">
              <primary-button disabled>Disabled</primary-button>
            </div>
            <div class="w-1/2 mb-8">
              <secondary-button>Default</secondary-button>
            </div>
            <div class="w-1/2 mb-8">
              <secondary-button disabled>Disabled</secondary-button>
            </div>
          </div>
          <div class="w-1/3 flex">

          </div>
          <div class="w-1/3">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PrimaryButton from '../components/primary-button.vue';
import SecondaryButton from '../components/secondary-button.vue';
import Swatch from '../components/swatch.vue';

export default {
  name: 'app',
  components: {
    "swatch": Swatch,
    "primary-button": PrimaryButton,
    "secondary-button": SecondaryButton
  },
  data () {
    return {
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
