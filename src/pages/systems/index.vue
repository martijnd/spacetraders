<template>
  <PrimaryTitle
    class="mb-8"
  >
    Systems
  </PrimaryTitle>
  <div
    v-if="data"
  >
    <div
      v-for="system of data.systems"
      :key="system.symbol"
      class="max-w-screen-md mb-4"
    >
      <router-link
        :to="`/systems/${system.symbol}`"
        class="flex justify-between items-center"
      >
        <h2 class="text-2xl font-bold">
          {{ system.name }}
        </h2>
        <span class="bg-dark rounded-full text-white p-2">{{ system.symbol }}</span>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';  
import useSWRV from 'swrv';
import { fetcher } from '@/utils/fetcher';
import PrimaryTitle from '@/components/PrimaryTitle.vue';
import { System } from '@/types';

export default defineComponent({
  components: {
    PrimaryTitle
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
