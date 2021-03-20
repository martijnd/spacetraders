<template>
  <div v-if="data">
    <PrimaryTitle>{{ data.ship.manufacturer }} - {{ data.ship.type }}</PrimaryTitle>

    <UserShipCard 
      :ship="data.ship"
    />

    <PrimaryTitle>Ship's location</PrimaryTitle>
    <router-link :to="`/locations/${data.ship.location}`">
      {{ data.ship.location }}
    </router-link>

    <PrimaryTitle> Current flight plan</PrimaryTitle>

    <div
      v-if="flightPlan"
      class="grid grid-cols-2"
    >
      <h3>Fuel consumed</h3> <span>{{ flightPlan.fuelConsumed }}</span>
    </div>
    <div v-else>
      None
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useSWRV from 'swrv';
import { fetcher } from '@/utils/fetcher';   
import PrimaryTitle from '@/components/PrimaryTitle.vue';
import { useStore } from '@/store';
import { useRoute } from 'vue-router';
import { Ship } from '@/types';
import UserShipCard from '@/components/UserShipCard.vue';

export default defineComponent({
  components: {
    PrimaryTitle,
    UserShipCard
  },
  setup() {
    
    const store = useStore();
    const route = useRoute();
    const shipId = route.params.shipId;
    const { data, error } = useSWRV<{ ship: Ship }>(
      `/users/${store.state.user?.username}/ships/${shipId}`,
      fetcher
    );

    // @ts-ignore
    const {data: flightPlan} = useSWRV(() => data.value?.ship.flightPlanId && 
      `/users/${store.state.user?.username}/flight-plans/${data.value?.ship.flightPlanId}`, fetcher);

    return {
      data,
      error,
      flightPlan
    };
  },
});
</script>
