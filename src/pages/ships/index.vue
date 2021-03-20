<template>
  <PrimaryTitle
    class="mb-8"
  >
    Ships
  </PrimaryTitle>
  <div
    v-if="data"
    class="grid md:grid-cols-2 gap-4"
  >
    <DataCard
      v-for="ship of data.ships"
      :key="ship.type"
      :data="ship"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useSWRV from 'swrv';
import { fetcher } from '@/utils/fetcher';
import PrimaryTitle from '@/components/PrimaryTitle.vue';
import DataCard from '@/components/DataCard.vue';
import { Ship } from '@/types';

export default defineComponent({
  components: {
    PrimaryTitle,
    DataCard
  },
  setup () {
    const {data, error} = useSWRV<{ships: Ship[]}>('/game/ships', fetcher);

    return {
        data, error
    };
  }
});
</script>
