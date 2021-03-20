<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :to="to"
    v-bind="$attrs"
    :class="`${colorClasses} disabled:opacity-50 font-semibold rounded py-2 px-4 inline-block hover:shadow transition-colors duration-100`"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    as: {
      type: String,
      default: 'primary',
      validator: (value: string) => ['primary', 'danger'].includes(value),
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (value: string) => ['primary', 'secondary'].includes(value),
    },
    to: {
      type: String,
      default: () => null,
    },
  },
  setup(props) {
    const colorClasses = computed(() => {
      if (props.variant === 'primary') {
        return {
          primary: 'bg-blue-700 hover:bg-blue-800 text-white',
          danger: 'bg-red-600 rounded hover:bg-red-700 text-white',
        }[props.as];
      }
      return {
        primary: 'border border-blue-400 text-blue-400 hover:bg-blue-800 hover:text-white',
        danger: 'border border-red-400 text-red-400 hover:bg-red-800 hover:text-white',
      }[props.as];
    });

    return {
      colorClasses,
    };
  },
});
</script>
