// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDummyStore = defineStore('dummy', () => {
  const banks = ref<Array<Bank>>([]);
  const properties = ref<Array<Property>>([]);
  const tracts = ref<Array<Tract>>([]);

  return {
    banks,
    properties,
    tracts,
  }
}, {
  persist: true,
},);