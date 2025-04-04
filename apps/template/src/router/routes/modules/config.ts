import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '@/layouts';
import { $t } from '@/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: '开发管理',
    },
    name: '开发管理',
    path: '/develop',
    children: [
      {
        name: 'API文档',
        path: 'docs',
        component: () => import('@/views/system/apidocument.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: $t('API文档'),
        },
      },
    ],
  },
];

export default routes;
