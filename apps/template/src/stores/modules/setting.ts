import { defineStore } from 'pinia';

export const useSettingStore = defineStore('setting', () => {
  const setting = reactive({});

  return {
    setting,
  };
});
