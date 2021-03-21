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
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavLink from './NavLink.vue';

export default defineComponent({
  components: { NavLink },
  setup() {
      const menuItems: {name: string, to: string}[] = [
          {
              name: 'Dashboard',
              to: '/'
          },
          {
              name: 'Loans',
              to: '/loans'
          },
          {
              name: 'Available ships',
              to: '/ships'
          },
          {
              name: 'Systems',
              to: '/systems'
          },
          {
              name: 'My ships',
              to: '/user/ships'
          }
      ];

      return {
          menuItems
      };
  },
});
</script>
