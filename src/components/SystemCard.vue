<template>
  <DataCard>
    <template #default>
      <div
        v-for="entry of system"
        :key="entry[0]"
        class="mb-4"
      >
        {{ entry }}
      </div>
    </template>
  </DataCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataCard from './DataCard.vue';

export default defineComponent({
  components: { DataCard },
  props: {
    system: {
      type: Object,
      required: true,
    },
  },
  setup() {
    function toSentence(attr: string) {
      return attr.replace(/^[a-z]|[A-Z]/g, (v, i) =>
        i === 0 ? v.toUpperCase() : ' ' + v.toLowerCase()
      );
    }

    return {
      toSentence,
    };
  },
});
</script>
