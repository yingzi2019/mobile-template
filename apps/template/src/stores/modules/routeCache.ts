import type { RouteRecordNameGeneric, RouteRecordRaw } from 'vue-router';

import { defineStore } from 'pinia';

export const useRouteCacheStore = defineStore('route-cache', () => {
  const routeCaches = ref<RouteRecordNameGeneric[]>([]);

  const addRoute = (route: RouteRecordRaw) => {
    if (routeCaches.value.includes(route.name)) return;

    if (route?.meta?.keepAlive) routeCaches.value.push(route.name);
  };

  return {
    routeCaches,
    addRoute,
  };
});
