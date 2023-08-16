<template>
  <v-card class="mb-6">
    <v-card-title>
      Buy credits from {{ tract.name }}
    </v-card-title>
    <v-card-text>
      TODO intro / stats / ?
    </v-card-text>
  </v-card>
  <v-spacer />
  <tract-details :property-key="app.property!.key" :tract-key="tract.key"></tract-details>
  <v-card title="Buy">
    <v-card-text>
      <p>
        Total available: {{ tract!.available }}
      </p>
      <p>
        <v-text-field type="number" v-model.number="amount" :rules="minMaxRules(0, tract.available)" />
      </p>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="service.buy(app.property!.key, tract.key, app.user!.key, amount)">
        Buy
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import service from '@/backend/service';
import { useAppStore } from '@/store/app';
import { useRouter } from 'vue-router';
import { tractList } from '@/router'
import { ref } from 'vue';

const app = useAppStore();
if (!app.tract) useRouter().push(tractList);

const tract = service.tractDetails(app.tract!.key);
const amount = ref(0);

function minMaxRules(min: number, max: number) {
  return [
    (value: string) => parseInt(value) > min || `Minimum value is ${min}`,
    (value: string) => parseInt(value) < max || `Maximum value is ${max}`,
  ];
}
</script>
