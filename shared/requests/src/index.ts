/**
 * 该文件可自行根据业务逻辑进行调整
 */
import type { RequestClientOptions } from '@vben/request';

import { preferences } from '@vben/preferences';
import {
  authenticateResponseInterceptor,
  defaultResponseInterceptor,
  RequestClient,
} from '@vben/request';
import { useAccessStore } from '@vben/stores';

import { useStorage } from '@vueuse/core';
import { message } from 'ant-design-vue';
import qs from 'qs';

import {
  errorMessageResponseInterceptor,
  logout,
  refreshTokenApi,
} from './lib';

// 添加环境 URL 存储
const envBaseUrl = useStorage<string>('env-switcher-current-url', '');
const isDev = import.meta.env.DEV;

// eslint-disable-next-line import/no-mutable-exports
export let baseRequest = null as unknown as RequestClient;

export function createRequestClient(
  baseURL: string,
  options?: RequestClientOptions,
) {
  const client = new RequestClient({
    ...options,
    baseURL: isDev ? envBaseUrl.value || baseURL : baseURL,
    paramsSerializer: (params) => {
      return qs.stringify(params, { allowDots: true, arrayFormat: 'repeat' });
    },
  });

  /**
   * 重新认证逻辑
   */
  async function doReAuthenticate() {
    try {
      const accessStore = useAccessStore();
      if (
        preferences.app.loginExpiredMode === 'modal' &&
        accessStore.isAccessChecked
      ) {
        accessStore.setLoginExpired(true);
      } else {
        await logout();
      }
    } catch (error) {
      console.error('重新认证过程发生错误:', error);
      await logout();
    }
  }

  /**
   * 刷新token逻辑
   */
  async function doRefreshToken() {
    try {
      const data = await refreshTokenApi();

      if (!data || !data.access_token) {
        await doReAuthenticate();
        return null;
      }

      const accessStore = useAccessStore();
      const newToken = data.access_token;
      const newRefreshToken = data.refresh_token;

      accessStore.setAccessToken(newToken);
      accessStore.setRefreshToken(newRefreshToken);

      return newToken;
    } catch (error) {
      console.error('刷新 token 过程发生错误:', error);
      await doReAuthenticate();
      return null;
    }
  }

  function formatToken(token: null | string) {
    return token ? `Bearer ${token}` : null;
  }

  // 请求头处理
  client.addRequestInterceptor({
    fulfilled: async (config) => {
      const accessStore = useAccessStore();
      if (accessStore.accessToken) {
        config.headers.Authorization = formatToken(accessStore.accessToken);
        config.headers['Accept-Language'] = preferences.app.locale;

        if (config.method?.toUpperCase() === 'GET') {
          const timestamp = Date.now();
          config.params = {
            ...config.params,
            _t: timestamp,
          };
        }
      }

      if (isDev) {
        const currentEnvBaseUrl = envBaseUrl.value;
        if (currentEnvBaseUrl) {
          config.baseURL = currentEnvBaseUrl;
        }
      }

      return config;
    },
  });

  // 处理返回的响应数据格式
  client.addResponseInterceptor(
    defaultResponseInterceptor({
      codeField: 'code',
      dataField: 'data',
      successCode: 200,
    }),
  );

  // token过期的处理
  client.addResponseInterceptor(
    authenticateResponseInterceptor({
      client,
      doReAuthenticate,
      doRefreshToken,
      enableRefreshToken: preferences.app.enableRefreshToken,
      formatToken,
    }),
  );

  // 通用的错误处理,如果没有进入上面的错误处理逻辑，就会进入这里
  client.addResponseInterceptor(
    errorMessageResponseInterceptor((msg: string, error) => {
      // 这里可以根据业务进行定制,你可以拿到 error 内的信息进行定制化处理，根据不同的 code 做不同的提示，而不是直接使用 message.error 提示 msg
      // 当前mock接口返回的错误字段是 error 或者 message
      const errmsg = error?.response?.data?.errmsg;
      if (errmsg && errmsg !== 'ok') {
        msg = errmsg;
      }

      // 如果没有错误信息，则会根据状态码进行提示
      message.error({
        content: msg,
        duration: 3,
        key: 'response-error',
      });
    }),
  );

  if (!baseRequest) {
    baseRequest = client;
  }

  return client;
}
