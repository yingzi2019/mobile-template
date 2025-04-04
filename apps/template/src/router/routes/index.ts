import type { RouteRecordRaw } from 'vue-router';

import { mergeRouteModules, traverseTreeValues } from '@vben/utils';

import { coreRoutes, fallbackNotFoundRoute } from './core';

const dynamicRouteFiles = import.meta.glob('./modules/**/*.ts', {
  eager: true,
});

const filteredRouteFiles: Record<string, unknown> = Object.fromEntries(
  Object.entries(dynamicRouteFiles).filter(
    ([path]) => !path.startsWith('./modules/_')
  )
);

// 有需要可以自行打开注释，并创建文件夹
// const externalRouteFiles = import.meta.glob('./external/**/*.ts', { eager: true });
// const staticRouteFiles = import.meta.glob('./static/**/*.ts', { eager: true });

/** 动态路由 */
const dynamicRoutes = mergeRouteModules(filteredRouteFiles);

// Object.keys(dynamicRouteFiles).forEach((key) => {
//   const mod = dynamicRouteFiles[key].default || {};
//   const modList = Array.isArray(mod) ? [...mod] : [mod];
//   dynamicRoutes.push(...modList);
// });

/** 外部路由列表，访问这些页面可以不需要Layout，可能用于内嵌在别的系统(不会显示在菜单中) */
// const externalRoutes: RouteRecordRaw[] = mergeRouteModules(externalRouteFiles);
// const staticRoutes: RouteRecordRaw[] = mergeRouteModules(staticRouteFiles);
const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/welcome',
    component: () => import('@/views/Welcome.vue'),
    name: 'Welcome',
    meta: {
      title: '欢迎',
    },
  },
  {
    path: '/creategoods',
    component: () => import('@/views/goods/Creategoods.vue'),
    name: 'Creategoods',
  },
  ...dynamicRoutes,
];
const externalRoutes: RouteRecordRaw[] = [];
console.log('dynamicRoutes:', dynamicRoutes);
/** 路由列表，由基本路由、外部路由和404兜底路由组成
 *  无需走权限验证（会一直显示在菜单中） */
const routes: RouteRecordRaw[] = [
  ...coreRoutes,
  ...externalRoutes,
  // ...dynamicRoutes, // 暂时写死, 渲染全部菜单
  fallbackNotFoundRoute,
];
console.log('routes:', routes);

/** 基本路由列表，这些路由不需要进入权限拦截 */
const coreRouteNames = traverseTreeValues(coreRoutes, (route) => route.name);

/** 有权限校验的路由列表，包含动态路由和静态路由 */
const accessRoutes = [...dynamicRoutes, ...staticRoutes];
export { accessRoutes, coreRouteNames, dynamicRoutes, routes };
