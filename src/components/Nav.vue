<template>
  <div class="border-b shadow">
    <nav class="container max-w-screen-lg mx-auto flex justify-between items-center p-4">
      <div
        v-if="$store.state.user"
        class="space-x-4 md:space-x-8"
      >
        <NavLink to="/">
          SpaceTraders
        </NavLink>
      </div>
      <div v-else>
        SpaceTraders
      </div>
      <div
        v-if="$store.state.user"
        class="flex space-x-4 items-center"
      >
        <div>
          {{ new Intl.NumberFormat('nl-NL').format($store.state.user.credits) }} credits
        </div>
        <button
          @click="toggleTheme"
        >
          {{ theme === 'dark' ? '🌞' : '🌑' }}
        </button>
        <SpaButton
          v-if="$store.state.user"
          variant="secondary"
          @click="onClickLogout"
        >
          Log out
        </SpaButton>
      </div>
      <div
        v-else
        class="space-x-4"
      >
        <button
          @click="toggleTheme"
        >
          {{ theme === 'dark' ? '🌞' : '🌑' }}
        </button>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import SpaButton from './SpaButton.vue';
import NavLink from './NavLink.vue';
import { store } from '@/store';

export default defineComponent({
  components: { NavLink, SpaButton },
  setup() {
    function onClickLogout() {
      store.dispatch('logout');
    }

    const initThemeIsDark = computed(() => localStorage.theme === 'dark'
      || (!('theme' in localStorage)
      && window.matchMedia('(prefers-color-scheme: dark)').matches));

    const theme = ref(initThemeIsDark.value ? 'dark' : 'light');

    function toggleTheme () {
      if (theme.value === 'dark') {
        localStorage.theme = 'light';
        document.documentElement.classList.remove('dark');
        theme.value = 'light';
      } else {
        localStorage.theme = 'dark';
        document.documentElement.classList.add('dark');
        theme.value = 'dark';
      }
    }

    return {
      onClickLogout,
      toggleTheme,
      theme
    };
  }
});
</script>
