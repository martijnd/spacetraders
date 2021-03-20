<template>
  <PrimaryTitle>
    SpaceTraders
  </PrimaryTitle>
  <div class="grid grid-cols-2">
    <div>
      <SecondaryTitle>Ships</SecondaryTitle>
      <div
        v-for="ship of $store.state.user.ships"
        :key="ship.id"
      >
        {{ ship.manufacturer }}
      </div>
    </div>
    <div>
      <SecondaryTitle>Loans</SecondaryTitle>
      <div
        v-for="loan of $store.state.user.loans"
        :key="loan.id"
      >
        {{ new Intl.NumberFormat('nl-NL').format(loan.repaymentAmount) }} - due on {{ new Date(loan.due).toLocaleDateString() }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PrimaryTitle from '@/components/PrimaryTitle.vue';
import SecondaryTitle from '@/components/SecondaryTitle.vue';

export default defineComponent({
  components: {
    PrimaryTitle,
    SecondaryTitle
  }
});
</script>
