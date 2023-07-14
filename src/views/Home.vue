<template>
  <v-card class="mb-6">
    <v-card-title>
      Welcome
    </v-card-title>
    <v-card-text>
      TODO intro
    </v-card-text>
  </v-card>
  <v-card>
    <v-card-title>
      {{ !app.user ? 'Login' : 'Switch user' }}
    </v-card-title>
    <v-card-text>
      <form @submit.prevent="submit">
        <v-text-field v-model="user" :counter="10" label="User" autocomplete="username"></v-text-field>
        <v-text-field v-model="password" type="password" label="Password" autocomplete="current-password"></v-text-field>

        <v-btn class="me-4" type="submit">
          submit
        </v-btn>
      </form>
    </v-card-text>
  </v-card>
  <v-card v-if="app.user" color="success">
    <v-card-text>
      Logged in. Use the menu on the left.
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app';
import { ref } from 'vue';

const user = ref('');
const password = ref('');
const app = useAppStore();

function submit() {
  app.user = {
    name: user.value,
    key: user.value,
  }
}
</script>
