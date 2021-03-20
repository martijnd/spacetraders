<template>
  <div class="grid place-items-center">
    <form
      class="p-4 bg-purple-600 rounded shadow-lg space-y-4 w-72"
      @submit.prevent="onSubmit"
    >
      <h2 class="font-bold text-white">
        Please log in
      </h2>
      <label class="block mb-2 text-white">
        Username
        <TextInput
          v-model="state.username"
          placeholder="Username"
          autocomplete="username"
          name="username"
          type="text"
        /></label>
      <label class="block mb-2 text-white">
        Token
        <TextInput
          v-model="state.token"
          autocomplete="off"
          placeholder="Token"
          name="token"
          type="text"
        /></label>
      <button class="text-purple-600 bg-white rounded px-4 py-2 font-bold ">
        Login
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
    const store = useStore();
    const state = reactive({
      username: '',
      token: '',
    });
 
    async function onSubmit() {
      try {
        const response = await axios.get(`/users/${state.username}`, {headers: {
          Authorization: `Bearer ${state.token}`
        }});
        store.dispatch('login', {username: state.username, token: state.token, user: response.data.user});
      } catch (e) {
        console.log(e.response.data.error.message);
      }
    }

    return {
      onSubmit,
      state,
    };
  },
});
</script>
