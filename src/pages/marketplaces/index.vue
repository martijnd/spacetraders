<template>
  <PrimaryTitle>Marketplaces</PrimaryTitle>
  <div v-if="locations.length">
    <div
      v-for="location of locations"
      :key="location.id"
    >
      <SecondaryTitle class="mt-4 mb-2">
        {{ location.name }}
      </SecondaryTitle>
      <TableContainer
        :items="location.marketplace"
        :headers="marketplaceHeaders"
      >
        <template #actions="{ item }">
          <div class="flex items-center">
            <TextInput
              v-model="item.purchaseQuantity"
              placeholder="Amount"
              type="number"
            />
            <!-- <select
              v-model="item.selectedShipId"
              class="px-4 py-2 border"
            >
              <option
                disabled
                selected
                :value="undefined"
              >
                Select a ship
              </option>
              <option
                v-for="ship of presentShips"
                :key="ship.id"
                :value="ship.id"
              >
                {{ ship.manufacturer }}
              </option>
            </select> -->
            <SpaButton @click="onPurchase(item)">
              Purchase
            </SpaButton>
          </div>
        </template>
      </TableContainer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import PrimaryTitle from '@/components/PrimaryTitle.vue';
import { useStore } from '@/store';
import { Location, Ship } from '@/types';
import axios from 'axios';
import TableContainer, {
  ITableHeader,
} from '@/components/table/TableContainer.vue';
import TextInput from '@/components/TextInput.vue';
import SpaButton from '@/components/SpaButton.vue';
import SecondaryTitle from '@/components/SecondaryTitle.vue';

export default defineComponent({
  components: {
    PrimaryTitle,
    TextInput,
    TableContainer,
    SpaButton,
    SecondaryTitle,
  },
  setup() {
    const store = useStore();
    const locations = ref<Location[]>([]);
    const marketplaceHeaders = ref<ITableHeader[]>([
      {
        key: 'symbol',
        text: 'Type',
      },
      {
        key: 'volumePerUnit',
        text: 'Volume / unit',
      },
      {
        key: 'pricePerUnit',
        text: 'Price / unit',
      },
      {
        key: 'quantityAvailable',
        text: 'Quantity',
      },
    ]);

    onMounted(async () => {
      const responseShips = await axios.get<{ ships: Ship[] }>(
        `/users/${store.state.user?.username}/ships`
      );
      const ships = responseShips.data.ships;

      ships.forEach(async (ship) => {
        if (ship.location) {
          const responseLocation = await axios.get(
            `/game/locations/${ship.location}/marketplace`
          );
          locations.value.push(responseLocation.data.location);
        }
      });
    });

    return {
      locations,
      marketplaceHeaders,
    };
  },
});
</script>
