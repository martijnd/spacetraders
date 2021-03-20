<template>
  <div
    v-bind="$attrs"
    class="transition-all duration-100 rounded shadow hover:shadow-md dark:bg-white dark:text-dark"
  >
    <div class="p-4">
      <slot name="default" />
    </div>
    <div
      v-if="$slots.actions"
      class="border-t col-span-2 p-4"
    >
      <slot name="actions" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

});
</script>

