<template>
  <div class="flex flex-col min-h-screen">
    <Nav />
    <div class="md:flex flex-grow">
      <NavigationBar v-if="$store.state.user" />
      <main class="container flex-1 max-w-screen-lg p-4 mx-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Nav from './components/Nav.vue';
import NavigationBar from './components/NavigationBar.vue';

export default defineComponent({
  name: 'App',
  components: {
    Nav,
    NavigationBar,
  },
});
</script>
