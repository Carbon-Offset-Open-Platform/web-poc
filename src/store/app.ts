// App status
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const user = ref<User | undefined>();
  const property = ref<Property | undefined>();
  const tract = ref<Tract | undefined>();

  return {
    user,
    property,
    tract,
  }
}, {
  persist: true,
},);