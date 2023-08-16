<template>
  <v-card class="mb-6">
    <v-card-title>
      Search by ID
    </v-card-title>
    <v-card-text>
      TODO intro / stats / ?
    </v-card-text>
  </v-card>

  <v-card title="Search" class="mb-6">
    <v-card-text>
      <p>Enter the ID you want to look up:</p>
      <v-text-field v-model="id" @keyup="search()" />
    </v-card-text>
  </v-card>

  <template v-if="id">
    <template v-if="!result">
      <v-card title="Result" :text="`No entity found for ID ${id}`"></v-card>
    </template>
    <template v-else>
      <tract-details-card :tract-key="result.key" v-if="isTract(result)"></tract-details-card>
      <v-card v-else>
        <v-card-title>
          {{ getTypeName(result) }}
        </v-card-title>
        <v-card-text>
          {{ result.name }} (ID {{ result.key }})
        </v-card-text>
        <v-card-actions>
        </v-card-actions>
      </v-card>
    </template>
  </template>
</template>

<script lang="ts" setup>
import service from '@/backend/service';
import TractDetailsCard from '@/components/TractDetailsCard.vue';
import { useAppStore } from '@/store/app';
import { isBank, isProperty, isTract } from '@/type-guards';
import { ref } from 'vue';

const app = useAppStore();
const id = ref('');
const result = ref<Entity | undefined>();

async function search() {
  console.log('search', id.value, typeof id.value);
  result.value = await service.findEntity(id.value);
}

function getTypeName(entity: Entity) {
  if (isProperty(entity)) return 'Property';
  if (isBank(entity)) return 'Bank';
  return 'Unknown entity type';
}

</script>
