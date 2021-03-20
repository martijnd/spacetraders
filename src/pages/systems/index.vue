<template>
  <PrimaryTitle
    class="mb-8"
  >
    Systems
  </PrimaryTitle>
  <div
    v-if="data"
    class="grid md:grid-cols-2 gap-4"
  >
    <SystemCard
      v-for="system of data.systems"
      :key="system.type"
      class="bg-blue-700 hover:bg-blue-900 text-white"
      :system="system"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useSWRV from 'swrv';
import { fetcher } from '@/utils/fetcher';
import PrimaryTitle from '@/components/PrimaryTitle.vue';
import SystemCard from '@/components/SystemCard.vue';
import { System } from '@/types';

export default defineComponent({
  components: {
    PrimaryTitle,
    SystemCard
  },
  setup () {
    const {data, error} = useSWRV<{systems: System[]}>('/game/systems', fetcher);

    return {
        data, 
        error
    };
  }
});
</script>
