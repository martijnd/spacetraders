<template>
  <PrimaryTitle
    class="mb-8"
  >
    Ships
  </PrimaryTitle>
  <div
    class="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
  >
    <ShipCard
      v-for="ship of ships"
      :key="ship.type"
      :ship="ship"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import PrimaryTitle from '@/components/PrimaryTitle.vue';
import ShipCard from '@/components/ShipCard.vue';
import { Ship } from '@/types';
import axios from 'axios';

export default defineComponent({
  components: {
    PrimaryTitle,
    ShipCard
  },
  setup () {
    const ships = ref<Ship[]>([]);

    onMounted(async () => {
      const response = await axios.get<{ships: Ship[]}>('/game/ships');
      ships.value = response.data.ships;
    });

    return {
        ships
    };
  }
});
</script>
