<template>
  <v-card class="mb-6">
    <v-card-title>
      Select a tract on {{ app.property?.name }}
    </v-card-title>
    <v-card-text>
      TODO intro
    </v-card-text>
  </v-card>
  <v-container>
    <v-card v-for="tract in tracts" :color="app.tract?.key == tract.key ? 'success' : ''" class="mt-6">
      <v-card-title>
        {{ tract.name }}
      </v-card-title>
      <v-card-text>
        TODO {{ tract.key }}
      </v-card-text>
      <v-card-actions>
        <v-btn @click="app.tract = tract">
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
import { propertyList } from '@/router'

const app = useAppStore();
if (!app.property) useRouter().push(propertyList);
const tracts = service.listTracts(app.property!.key, app.user?.key);

</script>
