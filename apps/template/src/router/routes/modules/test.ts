import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '@/layouts';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      order: -2,
      icon: 'lucide:layout-dashboard',
      title: '测试',
    },
    name: '测试',
    path: '/ceshi',
    children: [
      {
        path: 'test1',
        component: () => import('@/views/content/content-article.vue'),
        name: '测试1',
        meta: {
          breadcrumb: '测试1',
          title: '测试1',
        },
      },
    ],
  },
];

export default routes;
