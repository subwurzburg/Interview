<template>
  <div class="w-full">
    <img :src="url" class="rounded-full">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    url: {
      type: String,
      required: true
    }
  },
  setup(props) {
    return {
      url: props.url,
    }
  }
});
</script>