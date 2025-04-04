import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '@/layouts';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      order: -2,
      icon: 'lucide:layout-dashboard',
      title: '租户管理',
    },
    name: '租户管理',
    path: '/tenant',
    children: [
      {
        path: 'tenant_list',
        component: () => import('@/views/tenant/List.vue'),
        name: '租户列表',
        meta: {
          breadcrumb: '租户列表',
          title: '租户列表',
        },
      },
      {
        path: 'review',
        component: () => import('@/views/tenant/Review.vue'),
        name: '租户审核',
        meta: {
          breadcrumb: '租户审核',
          title: '租户审核',
        },
      },
      {
        path: 'statistics',
        component: () => import('@/views/tenant/Statistics.vue'),
        name: '租户统计',
        meta: {
          breadcrumb: '租户统计',
          title: '租户统计',
        },
      },
    ],
  },
];

export default routes;
