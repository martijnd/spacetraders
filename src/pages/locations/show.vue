<template>
  <div v-if="data && ships">
    <PrimaryTitle>{{ data.location.name }}</PrimaryTitle>

    <select
      v-model="shipId"
    >
      <option
        v-for="(ship, i) of ships.ships"
        :key="ship.id"
        :value="ship.id"
        :selected="i === 0"
      >
        {{ ship.manufacturer }}
      </option>
    </select>
    
    <SpaButton @click="onClickCreateFlightPath">
      Create flight path
    </SpaButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useSWRV from 'swrv';
import { fetcher } from '@/utils/fetcher';   
import PrimaryTitle from '@/components/PrimaryTitle.vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/store';
import SpaButton from '@/components/SpaButton.vue';
import axios from 'axios';

export default defineComponent({
  components: {
    PrimaryTitle,
    SpaButton, 
  },
  setup() {
    const route = useRoute();
    const symbol = route.params.symbol;
    const { data, error } = useSWRV<{ locations: Location }>(
      `/game/locations/${symbol}`,
      fetcher
    );

    const store = useStore();
     const { data: ships } = useSWRV<{ locations: Location }>(
      `/users/${store.state.user?.username}/ships`,
      fetcher
    );

    const shipId = ref(null);
    async function onClickCreateFlightPath() {
      const response = await axios.post(`/users/${store.state.user?.username}/flight-plans`, {
        shipId: shipId.value,
        destination: symbol
      });
      
      console.log(response);
    }

    return {
      data,
      error,
      ships,
      shipId,
      onClickCreateFlightPath
    };
  },
});
</script>
