<template>
  <v-card class="mb-6">
    <v-card-title>
      Find properties
    </v-card-title>
    <v-card-text>
      TODO intro
    </v-card-text>
  </v-card>
  <v-container>
    <v-card v-for="property in properties" :color="app.property?.key == property.key ? 'success' : ''" class="mt-6">
      <v-card-title>
        {{ property.name }}
      </v-card-title>
      <v-card-text>
        TODO {{ property.key }}
      </v-card-text>
      <v-card-actions>
        <v-btn @click="app.property = property">
          Select
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import service from '@/backend/service';
import { useAppStore } from '@/store/app';
import { useRouter } from 'vue-router';
import { start } from '@/router'

const app = useAppStore();
if (!app.user) useRouter().push(start);
const properties = service.listProperties();
</script>
