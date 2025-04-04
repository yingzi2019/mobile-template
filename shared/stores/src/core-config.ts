import { reactive } from 'vue';

import { defineStore } from 'pinia';

export const useCoreConfigStore = defineStore(
  'core-config',
  () => {
    const config = reactive<Record<string, any>>({
      baseUrl: '',
      prefix: '',
    });

    const getConfig = (key: string) => {
      return config[key];
    };

    const setConfig = (key: string, value: any) => {
      config[key] = value;
    };

    const $reset = () => {};

    return { $reset, config, getConfig, setConfig };
  },
  {
    persist: {
      pick: ['config'],
    },
  },
);
