<template>
  <v-app>
    <v-navigation-drawer v-model="navOpen" app>
      <v-list dense>
        <v-list-item v-for="(item, index) in items" :key="index" link :title="item.title">
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="navOpen = !navOpen"></v-app-bar-nav-icon>
      <v-toolbar-title>Title</v-toolbar-title>
    </v-app-bar>
    <default-view />
  </v-app>
</template>

<script lang="ts" setup>
import { watchEffect } from 'vue';
import { ref } from 'vue';
import { VApp, VNavigationDrawer, VList, VListItem, VAppBar } from 'vuetify/lib/components/index.mjs';
import DefaultView from './View.vue'
import { useAppStore } from '@/store/app';

const app = useAppStore();
const navOpen = ref(true);
const statusOpen = ref(true);
type Status = Array<{ label: string; value: string }>;
const status = ref<Status>([]);

let items = new Array<{ icon: string; title: string; link: string; }>();
watchEffect(() => {
  // defaults
  items = [
    { icon: 'mdi-view-dashboard', title: 'Start', link: '/' },
    { icon: 'mdi-email', title: 'Banks', link: 'banks' },
  ];

  if (app.user) { // login required
    items.push({ icon: 'mdi-view-dashboard', title: 'Properties', link: 'properties' });

    if (app.property) {
      items.push({ icon: 'mdi-view-dashboard', title: 'Tract', link: 'tracts' });

      if (app.tract) {
        items.push({ icon: 'mdi-view-dashboard', title: 'Buy', link: 'buy' });
        items.push({ icon: 'mdi-view-dashboard', title: 'Sell', link: 'sell' });
      }
    }
  }
});

</script>
