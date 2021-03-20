<template>
  <div v-if="data">
    <PrimaryTitle>{{ data.system.name }}</PrimaryTitle>

    <SecondaryTitle>Locations</SecondaryTitle>
    <div
      v-for="location of data.system.locations"
      :key="location.name"
      class="py-2"
    > 
      <div class="flex justify-between">
        <h3 class="font-semibold text-lg hover:underline">
          <router-link :to="`/locations/${location.symbol}`">
            {{ location.name }}
          </router-link>
        </h3>
        <SpaButton>Create flight plan</SpaButton>
      </div>
      X: {{ location.x }} Y: {{ location.y }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useSWRV from 'swrv';
import { fetcher } from '@/utils/fetcher';   
import PrimaryTitle from '@/components/PrimaryTitle.vue';
import { useRoute } from 'vue-router';
import SpaButton from '@/components/SpaButton.vue';
import SecondaryTitle from '@/components/SecondaryTitle.vue';

export default defineComponent({
  components: {
    PrimaryTitle,
    SpaButton,
    SecondaryTitle, 
  },
  setup() {
    const route = useRoute();
    const symbol = route.params.symbol;
    const { data, error } = useSWRV<{ locations: Location }>(
      `/game/systems/${symbol}`,
      fetcher
    );

    return {
      data,
      error,
    };
  },
});
</script>
