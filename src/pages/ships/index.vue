<template>
  <PrimaryTitle
    class="mb-8"
  >
    Ships
  </PrimaryTitle>
  <div
    v-if="data"
    class="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
  >
    <ShipCard
      v-for="ship of data.ships"
      :key="ship.type"
      class="bg-blue-700 hover:bg-blue-900 text-white"
      :ship="ship"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useSWRV from 'swrv';
import { fetcher } from '@/utils/fetcher';
import PrimaryTitle from '@/components/PrimaryTitle.vue';
import ShipCard from '@/components/ShipCard.vue';
import { Ship } from '@/types';

export default defineComponent({
  components: {
    PrimaryTitle,
    ShipCard
  },
  setup () {
    const {data, error} = useSWRV<{ships: Ship[]}>('/game/ships', fetcher);

    return {
        data, 
        error
    };
  }
});
</script>
