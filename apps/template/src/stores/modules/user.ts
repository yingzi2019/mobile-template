import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({});

  return {
    userInfo,
  };
});

export default useUserStore;
