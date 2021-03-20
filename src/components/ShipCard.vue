<template>
  <DataCard>
    <template #default>
      <div>
        <div class="flex justify-between items-center border-b">
          <h3 class="text-xl font-bold">
            {{ ship.type }}
          </h3>
          <span class="text-sm">({{ ship.class }})</span>
        </div>
        <div class="pt-4">
          <div
            v-for="attr of attrs"
            :key="attr.label"
            class="grid md:grid-cols-2"
          >
            <h4 class="font-bold">
              {{ attr.label }}
            </h4>
            <span class="text-right">{{ attr.value }}</span>
          </div>
          <div class="mt-4">
            <h4 class="font-bold text-xl">
              Locations
            </h4>
            <ul>
              <li
                v-for="location of ship.purchaseLocations"
                :key="location.location"
              >
                <span class="text-right">{{ location.location }} - {{ new Intl.NumberFormat('nl-NL').format(location.price) }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
  </DataCard>
</template>

<script lang="ts">
import { Ship } from '@/types';
import { defineComponent } from 'vue';
import DataCard from './DataCard.vue';

export default defineComponent({
  components: { DataCard },
  props: {
    ship: {
      type: Object as () => Ship,
      required: true,
    },
  },
  setup(props) {
    const attrs: { label: string; value: string | number }[] = [
      {
        label: 'Manufacturer',
        value: props.ship.manufacturer,
      },
      {
        label: 'Max. Cargo',
        value: props.ship.maxCargo,
      },
      {
        label: 'Type',
        value: props.ship.type,
      },
      {
        label: 'Speed',
        value: props.ship.speed,
      },
      {
        label: 'Plating',
        value: props.ship.plating,
      },
      {
        label: 'Weapons',
        value: props.ship.weapons,
      },
    ];

    return {
      attrs,
    };
  },
});
</script>
