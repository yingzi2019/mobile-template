import { useStorage } from '@vueuse/core';

const fp = useStorage<string>('fp', '');

const WHITE_LIST = new Set(['fp']);

const resetStorage = () => {
  Object.keys(localStorage)
    .filter((k) => !WHITE_LIST.has(k))
    .forEach((k) => {
      localStorage.removeItem(k);
    });
};

export { fp, resetStorage };
