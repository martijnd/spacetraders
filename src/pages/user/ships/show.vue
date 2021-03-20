<template>
  <div v-if="data">
    <PrimaryTitle>{{ data.ship.manufacturer }} - {{ data.ship.type }}</PrimaryTitle>
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

export default defineComponent({
  components: {
    PrimaryTitle,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const shipId = route.params.shipId;
    const { data, error } = useSWRV<{ ship: Ship }>(
      `/users/${store.state.user?.username}/ships/${shipId}`,
      fetcher
    );

    return {
      data,
      error,
    };
  },
});
</script>
