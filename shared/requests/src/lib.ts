import type {
  MakeErrorMessageFn,
  ResponseInterceptorConfig,
} from '@vben/request';

import { LOGIN_PATH } from '@vben/constants';
import { $t } from '@vben/locales';
import { resetAllStores, useAccessStore } from '@vben/stores';

import { useConfigStore } from '@hnsaas/store';
import { useStorage } from '@vueuse/core';
import axios from 'axios';

// 环境变量和存储
const isDev = import.meta.env.DEV;
const envBaseUrl = useStorage<string>('env-switcher-current-url', '');

export const logoutApi = async () => {
  const accessStore = useAccessStore();
  const configStore = useConfigStore();
  const token = accessStore.accessToken;
  const baseUrl = isDev ? envBaseUrl.value : configStore.getConfig('baseUrl');
  const prefix = configStore.getConfig('prefix');
  const res = await fetch(`${baseUrl}${prefix}/logout`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'GET',
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error('logoutApi', error);
      return {
        code: 200,
        data: {},
        errmsg: 'ok',
      };
    });
  return res;
};

export const refreshTokenApi = async () => {
  try {
    const accessStore = useAccessStore();
    const refreshToken = accessStore.refreshToken;
    if (!refreshToken) {
      return null;
    }

    const configStore = useConfigStore();
    const baseUrl = isDev ? envBaseUrl.value : configStore.getConfig('baseUrl');
    const prefix = configStore.getConfig('prefix');

    const res = await fetch(`${baseUrl}${prefix}/refreshtoken`, {
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const data = await res.json();

    if (!data || !data.access_token) {
      console.warn('刷新 token 失败 - 返回数据无效');
      return null;
    }

    return data;
  } catch (error) {
    console.error('刷新 token 时发生错误:', error);
    return null;
  }
};

export async function logout(redirect: boolean = true) {
  try {
    await logoutApi();
  } catch (error) {
    console.error('登出 API 调用失败:', error);
  }

  try {
    resetAllStores();
    const accessStore = useAccessStore();
    accessStore.setAccessToken(null);
    accessStore.setLoginExpired(false);

    // 使用 window.location 进行重定向，避免 router 未定义的问题
    if (redirect) {
      const currentPath = window.location.pathname + window.location.search;
      const loginPath =
        LOGIN_PATH +
        (currentPath === '/'
          ? ''
          : `?redirect=${encodeURIComponent(currentPath)}`);
      window.location.href = loginPath;
    }
  } catch (error) {
    console.error('登出过程发生错误:', error);
    // 如果出现错误，强制跳转到登录页
    window.location.href = LOGIN_PATH;
  }
}

export const errorMessageResponseInterceptor = (
  makeErrorMessage?: MakeErrorMessageFn,
): ResponseInterceptorConfig => {
  return {
    rejected: (error: any) => {
      if (axios.isCancel(error)) {
        return Promise.reject(error);
      }

      const err: string = error?.toString?.() ?? '';
      let errMsg = '';
      if (err?.includes('Network Error')) {
        errMsg = $t('ui.fallback.http.networkError');
      } else if (error?.message?.includes?.('timeout')) {
        errMsg = $t('ui.fallback.http.requestTimeout');
      }
      if (errMsg) {
        makeErrorMessage?.(errMsg, error);
        return Promise.reject(error);
      }

      let errorMessage = '';
      const status = error?.response?.status;

      switch (status) {
        case 400: {
          errorMessage = $t('ui.fallback.http.badRequest');
          break;
        }
        case 401: {
          errorMessage = $t('ui.fallback.http.unauthorized');
          break;
        }
        case 403: {
          errorMessage = $t('ui.fallback.http.forbidden');
          break;
        }
        case 404: {
          errorMessage = $t('ui.fallback.http.notFound');
          break;
        }
        case 408: {
          errorMessage = $t('ui.fallback.http.requestTimeout');
          break;
        }
        default: {
          errorMessage = $t('ui.fallback.http.internalServerError');
        }
      }
      makeErrorMessage?.(errorMessage, error);
      return Promise.reject(error);
    },
  };
};
