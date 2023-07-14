<template>
  <v-card class="mb-6">
    <v-card-title>
      Sell credits from {{ tract.name }}
    </v-card-title>
    <v-card-text>
      TODO intro / stats / ?
    </v-card-text>
  </v-card>
  <tract-details :property-key="app.property!.key" :tract-key="tract.key"></tract-details>
  <v-card title="Sell">
    <v-card-text>
      <p>
        Total owned: {{ bought }}
      </p>
      <p>
        <v-text-field type="number" v-model.number="amount" :rules="minMaxRules(0, bought)" />
      </p>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="service.sell(app.property!.key, tract.key, app.user!.key, amount)">
        Sell
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
import TractDetails from '@/components/TractDetails.vue';
import { watchEffect } from 'vue';

const app = useAppStore();
if (!app.tract) useRouter().push(tractList);

const tract = service.tractDetails(app.tract!.key);
const bought = tract.inventory.find(item => item.owner == app.user?.key)?.amount || 0;
const amount = ref(0);

function minMaxRules(min: number, max: number) {
  return [
    (value: string) => parseInt(value) > min || `Minimum value is ${min}`,
    (value: string) => parseInt(value) < max || `Maximum value is ${max}`,
  ];
}
</script>
