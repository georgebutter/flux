<template>
  <button :class="['bg-white shadow-lg rounded-full w-12 border-2 border-white outline-none active:outline-none focus:outline-none transition-padding-left', toggleOn ? 'pl-5' : '']" @click="$emit('toggleSwitch', $event)">
    <div :class="['w-6 h-6 rounded-full transition-background-color', toggleOn ? 'bg-primary' : 'bg-grey-lighter']">
    </div>
  </button>
</template>

<script>
  export default {
    name: 'toggle',
    props: {
      toggleOn: Boolean,
    }
  }
</script>
