<template>
  <div class="min-h-screen flex flex-col">
    <Nav />
    <main class="container max-w-screen-lg mx-auto p-4 flex-grow">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Nav from './components/Nav.vue';

export default defineComponent({
  name: 'App',
  components: {
    Nav,
  },
});
</script>
