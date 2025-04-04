import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '@/layouts';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      order: -1,
      icon: 'lucide:layout-dashboard',
      title: '用户管理',
    },
    name: '用户管理',
    path: '/users-manager',
    children: [
      {
        path: 'users-list',
        component: () => import('@/views/users-manager/users-list.vue'),
        name: '用户列表',
        meta: {
          breadcrumb: '用户列表',
          title: '用户列表',
        },
      },
    ],
  },
];

export default routes;
