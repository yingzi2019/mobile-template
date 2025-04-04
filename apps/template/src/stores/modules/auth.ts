import type { Recordable } from '@vben/types';

import { useRouter } from 'vue-router';

import { resetAllStores, useAccessStore, useUserStore } from '@vben/stores';

import {
  DEFAULT_HOME_PATH,
  LOGIN_PATH,
  refreshToken,
  refreshTokenExpireTime,
  resetToken,
  token,
  tokenExpireTime,
  userInfo,
} from '@/constants';
import * as AuthApi from '@/request/api/auth';
import { logout as logoutApi } from '@/request/api/auth';
import { notification } from 'ant-design-vue';
import { defineStore } from 'pinia';

function updateTokenInfo(data: any) {
  const {
    access_token,
    refresh_token,
    access_expire_time,
    refresh_expire_time,
  } = data;

  // save token
  token.value = access_token;
  refreshToken.value = refresh_token;
  tokenExpireTime.value = access_expire_time;
  refreshTokenExpireTime.value = refresh_expire_time;
}

export const useAuthStore = defineStore('auth', () => {
  const accessStore = useAccessStore();
  const userStore = useUserStore();
  const router = useRouter();

  const loginLoading = ref(false);

  async function fetchUserInfo() {
    const response = await AuthApi.getUserInfo().catch(() => {});
    if (response) {
      const { user, menulist, permissions } = response as any;
      const roles: string[] = [];

      // 设置用户角色
      if (user.is_superuser) {
        roles.push('super');
      }

      // 设置用户信息
      userStore.setUserInfo({
        avatar: '',
        realName: user.nick_name || user.real_name || user.username,
        userId: user.id,
        username: user.username,
        roles,
        menus: menulist,
        email: user.email,
      });

      // 设置用户的权限码
      accessStore.setAccessCodes(permissions.map((i: any) => i.codename));
    } else {
      return await logout();
    }
    return userStore.userInfo!;
  }

  async function authLogin(
    params: Recordable<any>,
    onSuccess?: () => Promise<void> | void,
  ) {
    try {
      loginLoading.value = true;
      const response = await AuthApi.login(params);
      accessStore.setIsAccessChecked(false);
      updateTokenInfo(response);
      const accessToken = response.access_token;

      if (accessToken) {
        accessStore.setAccessToken(accessToken);
        await fetchUserInfo();
        const { userInfo } = userStore;

        if (accessStore.loginExpired) {
          accessStore.setLoginExpired(false);
        } else {
          onSuccess
            ? await onSuccess?.()
            : await router.push(userInfo?.homePath || DEFAULT_HOME_PATH);
        }

        if (userInfo?.username) {
          notification.success({
            description: `欢迎回来: ${userInfo?.realName}`,
            duration: 3,
            message: '登录成功',
          });
        }
      }
    } finally {
      loginLoading.value = false;
    }

    return {
      userInfo,
    };
  }

  async function logout(redirect: boolean = true) {
    resetToken();
    await logoutApi();

    resetAllStores();
    accessStore.setLoginExpired(false);

    await router.replace({
      path: LOGIN_PATH,
      query: redirect
        ? {
            redirect: encodeURIComponent(router.currentRoute.value.fullPath),
          }
        : {},
    });
  }

  function $reset() {
    loginLoading.value = false;
  }

  return {
    $reset,
    authLogin,
    fetchUserInfo,
    loginLoading,
    logout,
  };
});
