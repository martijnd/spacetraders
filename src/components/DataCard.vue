<template>
  <div
    v-bind="$attrs"
    class="grid grid-cols-1 lg:grid-cols-2 rounded p-4 shadow hover:shadow-md transition-shadow duration-100"
  >
    <div
      v-for="entry of Object.entries(data)"
      :key="entry[0]"
      class="mb-4"
    >
      <h3 class="font-bold text-lg">
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
            <h4 class="font-bold italic">
              {{ attr[0] }}
            </h4>
            <span>{{ attr[1] }}</span>
          </div>
        </li>
      </ul>
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

