<template>
  <router-link
    v-bind="$attrs"
    class="text-blue-700 dark:text-blue-100 font-semibold"
  >
    <slot />
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

});
</script>

