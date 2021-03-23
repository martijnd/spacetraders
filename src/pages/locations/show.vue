<template>
  <div v-if="data && ships">
    <PrimaryTitle class="mb-4">
      Marketplace ({{ data.location.name }})
    </PrimaryTitle>

    <select
      v-model="selectedShip"
      class="border px-4 py-2"
    >
      <option
        disabled
        selected
        :value="null"
      >
        Select a ship
      </option>
      <option
        v-for="ship of notPresentShips"
        :key="ship.id"
        :value="ship"
        selected
      >
        {{ ship.manufacturer }}
      </option>
    </select>
    <SpaButton 
      :disabled="selectedShip && selectedShip.location === data.location.symbol"
      @click="onClickCreateFlightPath"
    >
      Create flight path
    </SpaButton>
    
    <hr class="my-8">

    <Alert
      v-if="marketplaceError"
      type="error"
      :title="marketplaceError.response.data.error.message"
    />

    <div v-if="marketplace">
      <SecondaryTitle class="mb-4">
        Buying
      </SecondaryTitle>

      <div class="mb-4">
        <TableContainer 
          :items="marketplace.location.marketplace"
          :headers="marketplaceHeaders"
        >
          <template #actions="{item}">
            <div class="flex items-center">
              <TextInput
                v-model="item.purchaseQuantity"
                placeholder="Amount"
                type="number"
              />
              <select
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
              </select>
              <SpaButton
                @click="onPurchase(item)"
              >
                Purchase
              </SpaButton>
            </div>
          </template>
        </TableContainer>
      </div>
      <div
        v-for="ship of presentShips"
        :key="ship.id"
      >
        <SecondaryTitle class="mb-4">
          {{ ship.manufacturer }} - {{ ship.type }}
        </SecondaryTitle>
  
        <div class="mb-4">
          <TableContainer
            :items="selectedShip.cargo"
            :headers="sellingHeaders"
          >
            <template #actions="{item}">
              <div class="flex items-center">
                <TextInput
                  v-model="item.sellQuantity"
                  placeholder="Amount"
                  type="number"
                />
                <SpaButton
                  @click="onSell(item, ship)"
                >
                  Sell
                </SpaButton>
              </div>
            </template>
          </TableContainer>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import useSWRV from 'swrv';
import { fetcher } from '@/utils/fetcher';   
import PrimaryTitle from '@/components/PrimaryTitle.vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/store';
import SpaButton from '@/components/SpaButton.vue';
import axios from 'axios';
import { Cargo, Location, MarketplaceGood, Ship, Transaction } from '@/types';
import TableContainer, { ITableHeader } from '@/components/table/TableContainer.vue';
import TextInput from '@/components/TextInput.vue';
import SecondaryTitle from '@/components/SecondaryTitle.vue';
import Alert from '@/components/Alert.vue';

export default defineComponent({
  components: {
    PrimaryTitle,
    SpaButton,
    TableContainer,
    TextInput,
    SecondaryTitle,
    Alert, 
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const ships = ref<Ship[]>([]);
    const selectedShip = ref<Ship|null>(null);
    onMounted(async () => {
      getShips();
    });

    const presentShips = computed(() => ships.value.filter(ship => ship.location === route.params.symbol));
    const notPresentShips = computed(() => ships.value.filter(ship => ship.location !== route.params.symbol));

    async function getShips() {
      const response = await axios.get(`/users/${store.state.user?.username}/ships`);
      ships.value = response.data.ships;

      if (ships.value.length > 0) {
        selectedShip.value = ships.value[0];
      }
    }
    const symbol = route.params.symbol;
    const { data, error } = useSWRV<{ location: Location }>(
      `/game/locations/${symbol}`,
      fetcher
    );

    // @ts-ignore
    const {data: marketplace, error: marketplaceError, mutate} = useSWRV(() => 
      data.value?.location.symbol 
      && `/game/locations/${data.value.location.symbol}/marketplace`, fetcher, {
        shouldRetryOnError: false,
      });

    async function onClickCreateFlightPath() {
      await axios.post(`/users/${store.state.user?.username}/flight-plans`, {
        shipId: selectedShip.value?.id,
        destination: symbol
      });
      store.dispatch('fetchUserData');
    }

    const marketplaceHeaders = ref<ITableHeader[]>([
      {
        key: 'symbol',
        text: 'Type'
      },
      {
        key: 'volumePerUnit',
        text: 'Volume / unit',
      }, 
      {
        key: 'pricePerUnit',
        text: 'Price / unit'
      }, 
      {
        key: 'quantityAvailable',
        text: 'Quantity'
      }
    ]);

    const sellingHeaders = ref<ITableHeader[]>([
      {
        key: 'good',
        text: 'Good'
      },
      {
        key: 'quantity',
        text: 'Quantity',
      }, 
      {
        key: 'totalVolume',
        text: 'Total volume'
      }
    ]);

    async function onPurchase (item: MarketplaceGood&{purchaseQuantity?: number, selectedShipId: string}) {
      try {

        const response = await axios.post(`/users/${store.state.user?.username}/purchase-orders`, {
          username: store.state.user?.username,
          shipId: item.selectedShipId,
          good: item.symbol,
          quantity: item.purchaseQuantity
        });

        item.purchaseQuantity = undefined;
        onTransaction(response.data);
      } catch (e) {
        console.log(e.response);
      }
    }

    function onTransaction(data: Transaction) {
        store.dispatch('fetchUserData');
        selectedShip.value = data.ship;
        mutate();
    }

    async function onSell (item: Cargo&{sellQuantity?: number}, ship: Ship) {
      try {
        const response = await axios.post(`/users/${store.state.user?.username}/sell-orders`, {
          username: store.state.user?.username,
          shipId: ship.id,
          good: item.good,
          quantity: item.sellQuantity
        });

        item.sellQuantity = undefined;
        onTransaction(response.data);
      } catch (e) {
        console.log(e.response);
      }
    }

    return {
      data,
      error,
      ships,
      presentShips,
      selectedShip,
      notPresentShips,
      onClickCreateFlightPath,
      marketplace,
      marketplaceHeaders,
      onPurchase,
      onSell,
      sellingHeaders,
      marketplaceError
    };
  },
});
</script>
