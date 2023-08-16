<template>
  <v-app>
    <v-navigation-drawer rail permanent>
      <v-list dense>
        <v-list-item v-for="(item, index) in items" :to="item.link" :key="index" link :title="item.title">
          <template v-slot:prepend>
            <v-icon :icon="item.icon" :title="item.link.name"></v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
      <v-app-bar-nav-icon @click.stop="statusOpen = !statusOpen"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="statusOpen" permanent location="right">
      <v-card v-for="item in status" :title="item.label" :subtitle="item.value" class="mb-6" />
    </v-navigation-drawer>
  </v-app>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue';
import { ref } from 'vue';
import { RouteRecordRaw, RouterView } from 'vue-router';
import { VApp, VNavigationDrawer, VList, VListItem, VAppBar } from 'vuetify/lib/components/index.mjs';
import { useAppStore } from './store/app';
import { start, search, propertyList, tractList, buy, sell } from './router';

const app = useAppStore();
const navOpen = ref(true);
const statusOpen = ref(true);
type Status = Array<{ label: string; value: string }>;
const status = ref<Status>([]);

let items = new Array<{ icon: string; title: string; link: RouteRecordRaw; }>();
watchEffect(() => {
  // defaults
  items = [
    { icon: 'mdi-home-account', title: 'Start', link: start },
    // { icon: 'mdi-email', title: 'Banks', link: banks },
  ];

  if (app.user) {
    items.push({ icon: 'mdi-magnify', title: 'Search', link: search });
    items.push({ icon: 'mdi-map-marker', title: 'Properties', link: propertyList });
  }

  if (app.property) {
    items.push({ icon: 'mdi-land-rows-vertical', title: 'Tract', link: tractList });
  }

  if (app.tract) {
    items.push({ icon: 'mdi-cart-arrow-down', title: 'Buy', link: buy });
    items.push({ icon: 'mdi-cart-arrow-up', title: 'Sell', link: sell });
  }
});

watchEffect(() => {
  const values: Status = [];
  if (app.user) {
    values.push({
      label: 'User name',
      value: app.user.name,
    });
  }
  if (app.property) {
    values.push({
      label: 'Selected property',
      value: `${app.property.name} (${app.property.key})`,
    });
  }
  if (app.tract) {
    values.push({
      label: 'Selected tract',
      value: `${app.tract.name} (${app.tract.key})`,
    });
  }
  status.value = values;
});

</script>
