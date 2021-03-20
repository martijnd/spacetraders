<template>
  <input
    v-bind="$attrs"
    class="border w-full dark:bg-gray-900 block text-gray-800 rounded-sm py-2 px-4"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  >
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    }
  },
  emits: ['update:modelValue']
});
</script>
