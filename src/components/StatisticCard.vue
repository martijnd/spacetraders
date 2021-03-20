<template>
  <div
    v-bind="$attrs"
    class="inline-block py-4 px-8 transition-all duration-200 bg-white border-2 border-black cursor-pointer hover:shadow-lg dark:bg-dark dark:border-white"
  >
    <h3 class="text-xl">
      {{ title }}
    </h3>
    <div class="text-3xl font-extrabold">
      {{ current }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const current = ref(0);
    let DELAY = 10;

    function delayer() {
      if (current.value < props.amount) {
        current.value++;

        setTimeout(delayer, DELAY);
      }
    }
    setTimeout(delayer, DELAY);

    return {
      current,
    };
  },
});
</script>
