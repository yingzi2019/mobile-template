import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '@/layouts';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: '内容管理',
    },
    name: '内容管理',
    path: '/content',
    children: [
      {
        name: '文章管理	',
        path: 'content-article',
        component: () => import('@/views/content/content-article.vue'),
        meta: {
          title: '文章管理',
        },
      },
      {
        name: '文章分类',
        path: 'article-category',
        component: () => import('@/views/content/content-article.vue'),
        meta: {
          title: '文章分类',
        },
      } as RouteRecordRaw,
    ],
  },
];

export default routes;
