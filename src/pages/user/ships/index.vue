<template>
  <PrimaryTitle>My ships</PrimaryTitle>
  <div v-if="data">
    <UserShipCard
      v-for="ship of data.ships"
      :key="ship.id"
      :ship="ship"
      @click="$router.push(`/user/ships/${ship.id}`)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useSWRV from 'swrv';
import { fetcher } from '@/utils/fetcher';   
import PrimaryTitle from '@/components/PrimaryTitle.vue';
import { useStore } from '@/store';
import UserShipCard from '@/components/UserShipCard.vue';
import { Ship } from '@/types';

export default defineComponent({
  components: {
    PrimaryTitle,
    UserShipCard,
  },
  setup() {
    const store = useStore();
    const { data, error } = useSWRV<{ ships: Ship[] }>(
      `/users/${store.state.user?.username}/ships`,
      fetcher
    );

    return {
      data,
      error,
    };
  },
});
</script>
