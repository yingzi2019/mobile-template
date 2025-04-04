import { createApp, watchEffect } from 'vue';

import { preferences } from '@vben/preferences';
import { initStores } from '@vben/stores';
import '@vben/styles';
import '@vben/styles/antd';

import App from '@/App.vue';
import { $t, setupI18n } from '@/locales';
import { router } from '@/router';
import { initAppConfig } from '@/utils/init';
import { useTitle } from '@vueuse/core';

// import '@/styles/index.scss';

async function bootstrap(namespace: string) {
  const app = createApp(App);

  // 国际化 i18n 配置
  await setupI18n(app);

  // 配置 pinia-tore
  await initStores(app, { namespace });

  // 配置路由及路由守卫
  app.use(router);
  await router.isReady();

  initAppConfig();

  // 动态更新标题
  watchEffect(() => {
    if (preferences.app.dynamicTitle) {
      const routeTitle = (router.currentRoute.value?.meta?.title ||
        '') as string;
      const pageTitle =
        (routeTitle ? `${$t(routeTitle)} - ` : '') + preferences.app.name;
      useTitle(pageTitle);
    }
  });

  app.mount('#app');
}

export { bootstrap };
