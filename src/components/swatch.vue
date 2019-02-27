<template>
  <div :class="column +' p-2'">
    <div class="rounded-lg shadow-lg">
      <div :class="'bg-'+ color.class +' ratio-1:1 rounded-t-lg'">
      </div>
      <div class="bg-white rounded-b-lg p-4 text-center">
        <p class="text-grey">{{ color.hex }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      color: Object,
      column: String
    }
  }
</script>
