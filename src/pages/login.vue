<template>
  <div class="grid place-items-center">
    <form
      class="p-4 bg-purple-600 rounded shadow-lg space-y-4 w-72"
      @submit.prevent="onSubmit"
    >
      <h2 class="font-bold text-white">
        Login
      </h2>
      <label class="block mb-2 text-white">
        Username
        <TextInput
          v-model="state.username"
          placeholder="E-mail"
          autocomplete="username"
          name="email"
          type="text"
        /></label>
      <label class="block mb-2 text-white">
        Password
        <TextInput
          v-model="state.password"
          autocomplete="current-password"
          placeholder="Password"
          name="current-password"
          type="password"
        /></label>
      <button class="text-purple-600 bg-white rounded px-4 py-2 font-bold ">
        Submit
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import TextInput from '@/components/TextInput.vue';
import { useStore } from '@/store';
import axios from 'axios';
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  components: { TextInput },
  setup() {
    const state = reactive({
      username: '',
      password: '',
    });
    const {dispatch} = useStore();
    async function onSubmit() {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/oauth/token`, {
          grant_type: 'password',
          client_id: import.meta.env.VITE_CLIENT_ID,
          client_secret: import.meta.env.VITE_CLIENT_SECRET,
          username: state.username,
          password: state.password,
          scope: '',
        });

        dispatch('login', response.data.access_token);
      } catch (e) {
        console.log(e);
      }
    }

    return {
      onSubmit,
      state,
    };
  },
});
</script>
