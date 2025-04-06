import { createApp, watchEffect } from 'vue';

import { initStores } from '@vben/stores';
import '@vben/styles';

import App from '@/App.vue';
import { APP_NAME } from '@/constants';
import { $t, setupI18n } from '@/locales';
import { router } from '@/router';
import { initAppConfig } from '@/utils/init';
import { createHead } from '@unhead/vue/client';
import { useTitle } from '@vueuse/core';

// Vant 桌面端适配
import '@vant/touch-emulator';

import 'vant/lib/style/css-variables.css';
import 'vant/lib/index.css';
import 'virtual:uno.css';
import 'nprogress/nprogress.css';
import '@/styles/main.scss';
import '@/styles/transition.scss';

async function bootstrap(namespace: string) {
  const app = createApp(App);

  // 配置 unhead
  const head = createHead();
  app.use(head);

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
    const routeTitle = (router.currentRoute.value?.meta?.title || '') as string;
    const pageTitle = (routeTitle ? `${$t(routeTitle)} - ` : '') + APP_NAME;
    useTitle(pageTitle);
  });

  app.mount('#app');
}

export { bootstrap };
