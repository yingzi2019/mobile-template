import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '@/layouts';
import { $t } from '@/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: '面板',
    },
    name: '数据面板',
    path: '/dashboard',
    children: [
      {
        name: '首页',
        path: 'home',
        component: () => import('@/views/dashboard/dashboard-home.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: $t('首页'),
        },
      },
    ],
  },
];

export default routes;
