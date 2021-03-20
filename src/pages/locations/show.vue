<template>
  <div v-if="data">
    <PrimaryTitle>{{ data.location.name }}</PrimaryTitle>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useSWRV from 'swrv';
import { fetcher } from '@/utils/fetcher';   
import PrimaryTitle from '@/components/PrimaryTitle.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  components: {
    PrimaryTitle, 
  },
  setup() {
    const route = useRoute();
    const symbol = route.params.symbol;
    const { data, error } = useSWRV<{ locations: Location }>(
      `/game/locations/${symbol}`,
      fetcher
    );

    return {
      data,
      error,
    };
  },
});
</script>
