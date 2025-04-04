import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '@/layouts';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      order: -1,
      icon: 'lucide:layout-dashboard',
      title: '商品管理',
    },
    name: '商品管理',
    path: '/commodity',
    children: [
      {
        path: 'brand',
        component: () => import('@/views/commodity/brand.vue'),
        name: '品牌',
        meta: {
          breadcrumb: '品牌',
          title: '品牌',
        },
      },
    ],
  },
];

export default routes;
