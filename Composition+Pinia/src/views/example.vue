<template>
  test
  <!-- {{ counterStore.doubleCount }} -->
  <button @click="increment">按我+1</button>
  {{ doubleCount }}
</template>

<script lang="ts">
import { useCounterStore, useCounterStoreComposition } from '@/stores/example';
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

export default {
  setup() {
    // const counterStore = useCounterStore()
    const { count, increment } = useCounterStoreComposition()
    const { doubleCount } = storeToRefs(useCounterStoreComposition())
    return {
      increment,
      doubleCount
    }
  }
}
</script>