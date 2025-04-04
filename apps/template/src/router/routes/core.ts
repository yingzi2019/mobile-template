import type { RouteRecordRaw } from 'vue-router';

import { $t } from '@/locales';
import Login from '@/views/core/login.vue';

/** 全局404页面 */
const fallbackNotFoundRoute: RouteRecordRaw = {
  component: () => import('@/views/core/not-found.vue'),
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
    name: 'Login',
    path: '/login',
    component: Login,
    meta: {
      title: $t('page.auth.login'),
    },
  },
  {
    name: 'ForgetPassword',
    path: '/forget-password',
    component: () => import('@/views/core/forget-password.vue'),
    meta: {
      title: $t('page.auth.forgetPassword'),
    },
  },
  {
    name: 'Register',
    path: '/register',
    component: () => import('@/views/core/register.vue'),
    meta: {
      title: $t('page.auth.register'),
    },
  },
  {
    name: 'About',
    path: '/about',
    component: () => import('@/views/core/about.vue'),
    meta: {
      title: $t('page.auth.about'),
    },
  },
];

export { coreRoutes, fallbackNotFoundRoute };
