<template>
  <div
    v-bind="$attrs"
    :class="`rounded border-2 p-4 ${backgroundColorClass} ${textColorClass} ${borderColorClass}`"
  >
    <h3 class="font-semibold text-xl">
      {{ title }}
    </h3>
    <p
      v-if="text"
      class="mt-2"
    >
      {{ text }}
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'info',
      validator: (type: string) =>
        ['info', 'error', 'warning', 'success'].includes(type),
    },
  },
  setup(props) {
    const backgroundColorClass = computed(() => {
      return {
        info: 'bg-blue-500',
        success: 'bg-green-300',
        error: 'bg-red-300',
        warning: 'bg-yellow-400',
      }[props.type];
    });

    const textColorClass = computed(() => {
      return {
        info: 'text-white',
        success: 'text-green-900',
        error: 'text-red-900',
        warning: 'text-yellow-800',
      }[props.type];
    });

    const borderColorClass = computed(() => {
      return {
        info: 'border-blue-800',
        success: 'border-green-900',
        error: 'border-red-800',
        warning: 'border-yellow-800',
      }[props.type];
    });

    return {
      backgroundColorClass,
      textColorClass,
      borderColorClass
    };
  },
});
</script>

