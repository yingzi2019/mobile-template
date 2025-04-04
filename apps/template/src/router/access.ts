import type {
  ComponentRecordType,
  GenerateMenuAndRoutesOptions,
} from '@vben/types';

import { generateAccessible } from '@vben/access';
import { preferences } from '@vben/preferences';

import { BasicLayout, IFrameView } from '@/layouts';
import { $t } from '@/locales';
import { message } from 'ant-design-vue';
import { useUserStore } from '@vben/stores';
import { transformMenuToRoute } from '@/utils/routerHelper';
import { createAllTestMenus } from '@hnsaas/utils';
import { TEST_MENUS_CONFIG } from '@/constants/fakemenus';
const forbiddenComponent = () => import('@/views/_core/fallback/forbidden.vue');

async function generateAccess(options: GenerateMenuAndRoutesOptions) {
  const pageMap: ComponentRecordType = import.meta.glob('../views/**/*.vue');
  const isDev = import.meta.env.DEV;

  const layoutMap: ComponentRecordType = {
    BasicLayout,
    IFrameView,
    BasicPage: () => import('@/views/Basic/index'),
  };

  return await generateAccessible(preferences.app.accessMode, {
    ...options,
    fetchMenuListAsync: async () => {
      message.loading({
        content: `${$t('common.loadingMenu')}...`,
        duration: 1.5,
      });
      const { userInfo } = useUserStore();
      const userMenus = userInfo?.menus || [];
      if (isDev) {
        const testMenus = createAllTestMenus(TEST_MENUS_CONFIG);
        const finalMenus = [...testMenus, ...userMenus];
        const routes = transformMenuToRoute(finalMenus);
        return routes as any[];
      }
      const routes = transformMenuToRoute(userMenus);
      return routes as any[];
    },
    // 可以指定没有权限跳转403页面
    forbiddenComponent,
    // 如果 route.meta.menuVisibleWithForbidden = true
    layoutMap,
    pageMap,
  });
}

export { generateAccess };
