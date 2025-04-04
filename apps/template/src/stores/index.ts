import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export { pinia };

export { useAuthStore } from './modules/auth';
export { useRouteCacheStore } from './modules/routeCache';
export { useUserStore } from './modules/user';
