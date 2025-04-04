import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '@/layouts';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      order: -1,
      icon: 'lucide:layout-dashboard',
      title: '系统设置',
    },
    name: '系统设置',
    path: '/system-config',
    children: [
      {
        path: 'admin',
        component: () => import('@/views/system/admin.vue'),
        name: '管理员',
        meta: {
          breadcrumb: '管理员',
          title: '管理员',
        },
      },
      {
        path: 'menu',
        component: () => import('@/views/system/menu.vue'),
        name: '菜单管理',
        meta: {
          breadcrumb: '菜单管理',
          title: '菜单管理',
        },
      },
      {
        path: 'permissions',
        component: () => import('@/views/system/permissions.vue'),
        name: '权限管理',
        meta: {
          breadcrumb: '权限管理',
          title: '权限管理',
        },
      },
      {
        path: 'platform',
        component: () => import('@/views/system/sysconfig.vue'),
        name: '平台配置',
        meta: {
          breadcrumb: '平台配置',
          title: '平台配置',
        },
      },
      {
        path: 'celerytask',
        component: () => import('@/views/system/celerytask.vue'),
        name: '任务配置',
        meta: {
          breadcrumb: '任务配置',
          title: '任务配置',
        },
      },
    ],
  },
];

export default routes;
