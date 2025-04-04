import type { Router, RouteRecordRaw } from 'vue-router';

import { useAccessStore, useUserStore } from '@vben/stores';
import { startProgress, stopProgress } from '@vben/utils';

import { DEFAULT_HOME_PATH, LOGIN_PATH } from '@/constants';
import { coreRouteNames } from '@/router/routes';
import { useAuthStore, useRouteCacheStore } from '@/stores';

function setupCommonGuard(router: Router) {
  const loadedPaths = new Set<string>();

  router.beforeEach(async (to) => {
    to.meta.loaded = loadedPaths.has(to.path);

    if (!to.meta.loaded) {
      startProgress();
    }
    const routeCacheStore = useRouteCacheStore();

    // Route cache
    routeCacheStore.addRoute(to as unknown as RouteRecordRaw);

    return true;
  });

  router.afterEach((to) => {
    to.meta.loaded = loadedPaths.has(to.path);

    if (!to.meta.loaded) {
      stopProgress();
      loadedPaths.add(to.path);
    }

    console.log('to', to.name);
  });
}

/**
 * 权限访问守卫配置
 * @param router
 */
function setupAccessGuard(router: Router) {
  router.beforeEach(async (to, from) => {
    const accessStore = useAccessStore();
    const userStore = useUserStore();
    const authStore = useAuthStore();

    // 基本路由，这些路由不需要进入权限拦截
    if (coreRouteNames.includes(to.name as string)) {
      if (to.path === LOGIN_PATH && accessStore.accessToken) {
        return decodeURIComponent(
          (to.query?.redirect as string) ||
            userStore.userInfo?.homePath ||
            DEFAULT_HOME_PATH,
        );
      }
      return true;
    }

    // accessToken 检查
    if (!accessStore.accessToken) {
      // 明确声明忽略权限访问权限，则可以访问
      if (to.meta.ignoreAccess) {
        return true;
      }

      // 没有访问权限，跳转登录页面
      if (to.fullPath !== LOGIN_PATH) {
        return {
          path: LOGIN_PATH,
          // 如不需要，直接删除 query
          query:
            to.fullPath === DEFAULT_HOME_PATH
              ? {}
              : { redirect: encodeURIComponent(to.fullPath) },
          // 携带当前跳转的页面，登录后重新跳转该页面
          replace: true,
        };
      }
      return to;
    }

    // 是否已经生成过动态路由
    if (accessStore.isAccessChecked) {
      return true;
    }

    // 生成路由表
    // 当前登录用户拥有的角色标识列表
    const userInfo = userStore.userInfo || (await authStore.fetchUserInfo());

    const accessibleRoutes = [];

    // 保存菜单信息和路由信息
    accessStore.setAccessRoutes(accessibleRoutes);
    accessStore.setIsAccessChecked(true);
    const redirectPath = (from.query.redirect ??
      (to.path === DEFAULT_HOME_PATH
        ? userInfo.homePath || DEFAULT_HOME_PATH
        : to.fullPath)) as string;

    return {
      ...router.resolve(decodeURIComponent(redirectPath)),
      replace: true,
    };
  });
}

/**
 * 项目守卫配置
 * @param router
 */
function createRouterGuard(router: Router) {
  setupCommonGuard(router);
  setupAccessGuard(router);
}

export { createRouterGuard };
