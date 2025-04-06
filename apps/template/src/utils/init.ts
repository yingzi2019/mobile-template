import { useAppLayoutStore } from '@/stores';

export async function initAppConfig() {
  const appLayoutStore = useAppLayoutStore();
  appLayoutStore.initAppNavBar();
}
