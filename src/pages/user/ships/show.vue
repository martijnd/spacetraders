<template>
  <div
    v-if="data"
    class="grid xl:grid-cols-2 gap-4"
  >
    <div>
      <PrimaryTitle>{{ data.ship.manufacturer }} - {{ data.ship.type }}</PrimaryTitle>
      <UserShipCard
        :ship="data.ship"
      />
    </div>

    <div>
      <div v-if="!flightPlan && locationData">
        <PrimaryTitle>Ship's location</PrimaryTitle>
        <router-link
          :to="`/locations/${data.ship.location}`"
        >
          {{ locationData.location.name }} ({{ data.ship.location }})
        </router-link>
      </div>

      <div v-if="flightPlan">
        <PrimaryTitle> Current flight plan</PrimaryTitle>
        <div
          class="grid grid-cols-2"
        >
          <h3 class="font-bold">
            Fuel consumed
          </h3> <span>{{ flightPlan.flightPlan.fuelConsumed }}</span>
          <h3 class="font-bold">
            Departure
          </h3> <span>{{ flightPlan.flightPlan.departure }}</span>
          <h3 class="font-bold">
            Destination
          </h3> <span>{{ flightPlan.flightPlan.destination }}</span>
          <h3 class="font-bold">
            Distance
          </h3> <span>{{ flightPlan.flightPlan.distance }}</span>
          <h3 class="font-bold">
            Fuel remaining
          </h3> <span>{{ flightPlan.flightPlan.fuelRemaining }}</span>
          <h3 class="font-bold">
            Time remaining (sec)
          </h3> <span>{{ flightPlan.flightPlan.timeRemainingInSeconds }}</span>
        </div>
      </div>
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
    const {data: flightPlan } = useSWRV(() => data.value?.ship.flightPlanId && 
      `/users/${store.state.user?.username}/flight-plans/${data.value?.ship.flightPlanId}`, fetcher, {
        refreshInterval: 1000
      });

      // @ts-ignore
      const { data: locationData } = useSWRV<{ location: Location }>(() => data.value?.ship.location &&
      `/game/locations/${data.value?.ship.location}`,
      fetcher
    );


    return {
      data,
      error,
      flightPlan,
      locationData
    };
  },
});
</script>
