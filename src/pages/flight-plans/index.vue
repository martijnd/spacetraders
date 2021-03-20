<template>
  <PrimaryTitle
    class="mb-8"
  >
    Flight plans
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
import { useStore } from '@/store';

export default defineComponent({
  components: {
    PrimaryTitle
  },
  setup () {
    const store = useStore();
    const {data, error} = useSWRV<{systems: System[]}>(`/users/${store.state.user?.username}/flight-plans`, fetcher);

    return {
        data, 
        error
    };
  }
});
</script>
