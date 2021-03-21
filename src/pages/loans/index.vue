<template>
  <PrimaryTitle class="mb-8">
    Available loans
  </PrimaryTitle>
  <div
    v-if="data"
    class="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
  >
    <div
      v-for="loan of data.loans"
      :key="loan.type"
      :ship="loan"
      class="shadow p-4 rounded hover:shadow-lg"
    >
      <h2 class="font-bold text-xl mb-2">
        {{ loan.type }}
      </h2>
      <div class="grid grid-cols-2">
        <h3 class="font-semibold">
          Amount
        </h3>
        <span>{{ new Intl.NumberFormat("nl-NL").format(loan.amount) }}</span>

        <h3 class="font-semibold">
          Collateral required
        </h3>
        <span>{{ loan.collateralRequired ? "Yes" : "No" }}</span>

        <h3 class="font-semibold">
          Rate
        </h3>
        <span>{{ loan.rate }}</span>
        <h3 class="font-semibold">
          Term
        </h3>
        <span>{{
          `${loan.termInDays} ${loan.termInDays === 1 ? "day" : "days"}`
        }}</span>
      </div>

      <SpaButton
        class="mt-4"
        @click="onClickTakeLoan(loan)"
      >
        Take loan
      </SpaButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useSWRV from 'swrv';
import { fetcher } from '@/utils/fetcher';
import PrimaryTitle from '@/components/PrimaryTitle.vue';
import { Loan } from '@/types';
import SpaButton from '@/components/SpaButton.vue';
import axios from 'axios';
import { useStore } from '@/store';

export default defineComponent({
  components: {
    PrimaryTitle,
    SpaButton,
  },
  setup() {
    const store = useStore();
    const { data, error } = useSWRV<{ loans: Loan[] }>('/game/loans', fetcher);

    async function onClickTakeLoan({ type }: Loan) {
      try {
        const response = await axios.post(
          `/users/${store.state.user?.username}/loans`,
          {
            type,
          }
        );

        console.log(response);
      } catch (e) {
        console.log(e);
      }
    }

    return {
      data,
      error,
      onClickTakeLoan,
    };
  },
});
</script>
