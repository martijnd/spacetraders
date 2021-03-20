<template>
  <div class="flex justify-between my-4">
    <button
      :disabled="!showPrevious"
      class="py-2 px-4 bg-blue-700 text-white font-semibold rounded disabled:opacity-50"
      @click="$emit('page-changed', +current - 1)"
    >
      Previous
    </button>
    <span>Showing page {{ current }} of {{ Math.ceil(total / perPage) }}</span>
    <SpaButton
      :disabled="!showNext"
      class="py-2 px-4 bg-blue-700 text-white font-semibold rounded disabled:opacity-50"
      @click="$emit('page-changed', +current + 1)"
    >
      Next
    </SpaButton>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import SpaButton from './SpaButton.vue';

export default defineComponent({
  components: { SpaButton },
  props: {
    current: {
      type: [Number, String],
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    }
  },
  emits: ['page-changed'],
  setup(props) {
    const showPrevious = computed(() => +props.current > 1);
    const showNext = computed(() => +props.current < Math.ceil(props.total / props.perPage));

    return {
      showPrevious,
      showNext
    };
  },
});
</script>
