<template>
  <Alert
    title="Page not found"
    type="error"
    class="mb-4"
  />
  <SpaButton to="/">
    Go back
  </SpaButton>
</template>

<script lang="ts">
import Alert from '@/components/Alert.vue';
import SpaButton from '@/components/SpaButton.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
     Alert,
    SpaButton
  }
});
</script>

Alert
