import type { RouteRecordRaw } from 'vue-router';

import { DEFAULT_HOME_PATH } from '@vben/constants';

import { $t } from '@/locales';
// import Login from '@/views/_core/authentication/login.vue';
import Login from '@/views/Login.vue';

/** 全局404页面 */
const fallbackNotFoundRoute: RouteRecordRaw = {
  component: () => import('@/views/_core/fallback/not-found.vue'),
  meta: {
    hideInBreadcrumb: true,
    hideInMenu: true,
    hideInTab: true,
    title: '404',
  },
  name: 'FallbackNotFound',
  path: '/:path(.*)*',
};

/** 基本路由，这些路由是必须存在的 */
const coreRoutes: RouteRecordRaw[] = [
  {
    name: 'Root',
    path: '/',
    redirect: DEFAULT_HOME_PATH,
    meta: {
      title: 'Root',
    },
  },
  {
    name: 'Login',
    component: Login,
    path: '/login',
    meta: {
      hideInTab: true,
      title: $t('page.auth.login'),
    },
  },
];

export { coreRoutes, fallbackNotFoundRoute };
