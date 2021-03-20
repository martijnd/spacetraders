<template>
  <div
    v-bind="$attrs"
    class="grid grid-cols-1 transition-all duration-100 rounded shadow lg:grid-cols-2 hover:shadow-md dark:bg-white dark:text-dark"
  >
    <div
      v-for="entry of Object.entries(data)"
      :key="entry[0]"
      class="mb-4 p-4"
    >
      <h3 class="text-lg font-bold">
        {{ toSentence(entry[0]) }}
      </h3>
      <span v-if="['string', 'number'].includes(typeof entry[1])">{{
        entry[1]
      }}</span>
      <ul
        v-else
      >
        <li
          v-for="x of entry[1]"
          :key="x[1]"
          class="ml-4 list-disc"
        >
          <div
            v-for="attr in Object.entries(x)"
            :key="attr[0]"
          >
            <h4 class="italic font-bold">
              {{ toSentence(attr[0]) }}
            </h4>
            <span>{{ attr[0] === 'price' ? new Intl.NumberFormat('nl-NL').format(attr[1]) : attr[1] }}</span>
          </div>
        </li>
      </ul>
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
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup() {
    function toSentence(attr: string) {
      return attr.replace(/^[a-z]|[A-Z]/g, (v, i) =>
        i === 0 ? v.toUpperCase() : ' ' + v.toLowerCase());
    }

    return {
      toSentence,
    };
  },
});
</script>

