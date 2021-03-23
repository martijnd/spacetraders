<template>
  <aside class="flex-none w-full md:w-60 border-r p-4">
    <ul>
      <li
        v-for="menuItem of menuItems"
        :key="menuItem.name"
      >
        <NavLink
          :to="menuItem.to"
          class="py-2 block"
        >
          {{ menuItem.name }}
        </NavLink>
      </li>
    </ul>
    <hr class="mt-4">
    <div
      v-if="data"
      id="ships"
      class="mt-4"
    >
      <h3 class="font-bold text-xl mb-2">
        Your ships
      </h3>
      <div
        v-for="ship of data.user.ships"
        :key="ship.id"
      >
        <div class="dark:bg-gray-900 bg-gray-100 p-2">
          <router-link :to="`/user/ships/${ship.id}`">
            <h4 class="font-bold text-xl rounded">
              {{ ship.manufacturer }}
            </h4>
          </router-link>
          <router-link
            v-if="ship.location"
            :to="`/locations/${ship.location}`"
          >
            <small
              class="underline"
            >Docked at {{ ship.location }}</small>
          </router-link>
          <small
            v-else
          >Currently travelling</small>
        </div>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { Ship } from '@/types';
import { fetcher } from '@/utils/fetcher';
import useSWRV from 'swrv';
import { defineComponent } from 'vue';
import NavLink from './NavLink.vue';

export default defineComponent({
  components: { NavLink },
  setup() {
    const store = useStore();
    const menuItems: { name: string; to: string }[] = [
      {
        name: 'Dashboard',
        to: '/',
      },
      {
        name: 'Loans',
        to: '/loans',
      },
      {
        name: 'Available ships',
        to: '/ships',
      },
      {
        name: 'Systems',
        to: '/systems',
      },
      {
        name: 'My ships',
        to: '/user/ships',
      },
    ];

    const { data } = useSWRV<{ ships: Ship[] }>(
      `/users/${store.state.user?.username}`,
      fetcher
    );

    return {
      menuItems,
      data
    };
  },
});
</script>
