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
      v-for="plan of data.flightPlans"
      :key="plan.id"
      class="max-w-screen-md mb-4"
    >
      <router-link
        :to="`/systems/${symbol}/flight-plans/${plan.id}`"
        class="flex justify-between items-center"
      >
        <h2 class="text-2xl font-bold">
          {{ plan.from }}
        </h2>
        <h2 class="text-2xl font-bold">
          {{ plan.to }}
        </h2>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';  
import useSWRV from 'swrv';
import { fetcher } from '@/utils/fetcher';
import PrimaryTitle from '@/components/PrimaryTitle.vue';
import { FlightPlan } from '@/types';
import { useRoute } from 'vue-router';

export default defineComponent({
  components: {
    PrimaryTitle
  },
  setup () {
    const route = useRoute();
    const symbol = route.params.symbol;
    const {data, error} = useSWRV<{flightPlans: FlightPlan[]}>(`/game/systems/${symbol}/flight-plans`, fetcher);

    return {
        data, 
        error,
        symbol
    };
  }
});
</script>
