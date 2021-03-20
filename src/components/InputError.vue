<template>
  <ul
    v-if="errors.length"
    class="bg-red-300 border-red-800 rounded-sm px-4 py-2 mb-2"
  >
    <li
      v-for="error of errors"
      :key="error"
      class="text-red-800"
    >
      {{ error }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    errors: {
      type: Array,
      default: () => []
    }
  },
});
</script>
