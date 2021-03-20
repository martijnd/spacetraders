<template>
  <DataCard class="bg-blue-700 hover:bg-blue-900 text-white max-w-lg">
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
          <div
            v-if="ship.cargo"
            class="mt-4"
          >
            <h4 class="font-bold text-xl">
              Cargo
            </h4>
            <ul>
              <li
                v-for="cargo of ship.cargo"
                :key="cargo.good"
              >
                <hr>
                <div>Good: {{ cargo.good }}</div>
                <div>Quantity: {{ cargo.quantity }}</div>
                <div>Total volume: {{ cargo.totalVolume }}</div>
              </li>
            </ul>
            <hr>
            <span>Total: {{ totalCargo }} / {{ ship.maxCargo }}</span>
          </div>
        </div>
      </div>
    </template>
  </DataCard>
</template>

<script lang="ts">
import { Ship } from '@/types';
import { computed, defineComponent } from 'vue';
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
        label: 'Location',
        value: props.ship.location,
      },
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
      {
        label: 'Space available',
        value: props.ship.spaceAvailable,
      },
      {
        label: 'X',
        value: props.ship.x,
      },
      {
        label: 'Y',
        value: props.ship.y,
      },
    ];

    const totalCargo = computed(() => props.ship.cargo.reduce((acc, curr) => acc + curr.quantity, 0));
    return {
      attrs,
      totalCargo
    };
  },
});
</script>
