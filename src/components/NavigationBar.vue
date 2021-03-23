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
      v-if="$store.state.user"
      id="ships"
      class="mt-4"
    >
      <h3 class="font-bold text-xl mb-2">
        Your ships
      </h3>
      <router-link
        v-for="ship of $store.state.user.ships"
        :key="ship.id"
        :to="`/user/ships/${ship.id}`"
      >
        <div
         
          class="dark:bg-gray-900 bg-gray-100 p-2"
        >
          <h4 class="font-bold text-xl rounded">
            {{ ship.manufacturer }}
          </h4> 
          <small v-if="ship.location">Docked at {{ ship.location }}</small>
          <small v-else>Currently travelling</small>
        </div>
      </router-link>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavLink from './NavLink.vue';

export default defineComponent({
  components: { NavLink },
  setup() {
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

    return {
      menuItems
    };
  },
});
</script>
