<template>
  <div v-if="data && ships">
    <PrimaryTitle>{{ data.location.name }}</PrimaryTitle>

    <select
      v-model="currentShip"
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
        v-for="ship of ships.ships"
        :key="ship.id"
        :value="ship"
        selected
      >
        {{ ship.manufacturer }}
      </option>
    </select>
    <SpaButton 
      :disabled="currentShip && currentShip.location === data.location.symbol"
      @click="onClickCreateFlightPath"
    >
      Create flight path
    </SpaButton>
    
    <div
      v-if="currentShip"
    >
      <hr class="my-8">
      <UserShipCard :ship="currentShip" />
    </div>
    <hr class="my-8">

    <Alert
      v-if="marketplaceError && currentShip"
      type="error"
      :title="marketplaceError.response.data.error.message"
    />

    <div v-if="marketplace && currentShip">
      <PrimaryTitle>Marketplace ({{ data.location.name }})</PrimaryTitle>
      <SecondaryTitle class="mb-4">
        Buying
      </SecondaryTitle>

      <div class="flex flex-col mb-4">
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
              <SpaButton
                @click="onPurchase(item)"
              >
                Purchase
              </SpaButton>
            </div>
          </template>
        </TableContainer>
      </div>

      <SecondaryTitle class="mb-4">
        Selling
      </SecondaryTitle>

      <div class="flex flex-col mb-4">
        <TableContainer 
          :items="currentShip.cargo"
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
                @click="onSell(item)"
              >
                Sell
              </SpaButton>
            </div>
          </template>
        </TableContainer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useSWRV from 'swrv';
import { fetcher } from '@/utils/fetcher';   
import PrimaryTitle from '@/components/PrimaryTitle.vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/store';
import SpaButton from '@/components/SpaButton.vue';
import axios from 'axios';
import {Cargo, Location, MarketplaceGood, Ship, Transaction} from '@/types';
import TableContainer, { ITableHeader } from '@/components/table/TableContainer.vue';
import TextInput from '@/components/TextInput.vue';
import SecondaryTitle from '@/components/SecondaryTitle.vue';
import UserShipCard from '@/components/UserShipCard.vue';
import Alert from '@/components/Alert.vue';

export default defineComponent({
  components: {
    PrimaryTitle,
    SpaButton,
    TableContainer,
    TextInput,
    SecondaryTitle,
    UserShipCard,
    Alert, 
  },
  setup() {
    const route = useRoute();
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

    const store = useStore();
     const { data: ships } = useSWRV<{ locations: Location }>(
      `/users/${store.state.user?.username}/ships`,
      fetcher
    );

    const currentShip = ref<Ship|null>(null);
    async function onClickCreateFlightPath() {
      await axios.post(`/users/${store.state.user?.username}/flight-plans`, {
        shipId: currentShip.value?.id,
        destination: symbol
      });
    }

    const marketplaceHeaders = ref<ITableHeader[]>([
      {
        key: 'symbol',
        text: 'Type'
      },
      {
        key: 'volumePerUnit',
        text: 'Volume per unit',
      }, 
      {
        key: 'pricePerUnit',
        text: 'Price per unit'
      }, 
      {
        key: 'quantityAvailable',
        text: 'Quantity available'
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

    async function onPurchase (item: MarketplaceGood&{purchaseQuantity?: number}) {
      try {

        const response = await axios.post(`/users/${store.state.user?.username}/purchase-orders`, {
          username: store.state.user?.username,
          shipId: currentShip.value?.id,
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
        store.dispatch('updateCredits', data.credits);
        currentShip.value = data.ship;
        mutate();
    }

    async function onSell (item: Cargo&{sellQuantity?: number}) {
      try {
        const response = await axios.post(`/users/${store.state.user?.username}/sell-orders`, {
          username: store.state.user?.username,
          shipId: currentShip.value?.id,
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
      currentShip,
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
