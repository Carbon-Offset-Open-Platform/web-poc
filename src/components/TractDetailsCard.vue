<template>
  <v-card>
    <v-card-title>{{ tract.name }}</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item title="ID"> {{ tract.key }} </v-list-item>
        <v-list-item title="Area"> {{ tract.area }} </v-list-item>
        <v-list-item title="Bank"> {{ bank.name }} ({{ bank.key }}) </v-list-item>
        <v-list-item title="Geolocation"> {{ tract.geolocation[0] }} x {{ tract.geolocation[1] }} </v-list-item>
        <v-list-item title="Available"> {{ tract.available }} </v-list-item>
        <v-list-item title="Inventory">
          <v-list v-if="tract.inventory?.length">
            <v-list-item v-for="item in tract.inventory">
              User {{ item.owner }} owns {{ item.amount }}
            </v-list-item>
          </v-list>
          <p v-else>empty</p>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import service from '@/backend/service';
import { useAppStore } from '@/store/app';

const props = defineProps(['tractKey'])
const app = useAppStore();
const tract = service.tractDetails(props.tractKey);
const bank = service.bankDetails(tract.bank);
// console.log(app.bought);
// const inventory = app.bought.get(tract.key);

</script>
