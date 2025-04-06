import { useStorage } from '@vueuse/core';

export const APP_NAME = 'Mobile Template';
export const APP_DESCRIPTION = 'An mobile web apps template';
export const DEFAULT_LOCALE = 'en-US';
export const DEFAULT_HOME_PATH = '/';
export const LOGIN_PATH = '/login';
export const TRANSITION_NAME = 'fade-slide';

// @unocss-include
export const selectionLocales = [
  {
    value: 'en-US',
    label: 'English(US)',
    icon: 'i-circle-flags-us',
  },
  {
    value: 'zh-CN',
    label: '简体中文',
    icon: 'i-circle-flags-cn',
  },
];

export const fp = useStorage('fp', '');

export const resetStorage = () => {
  console.log('resetStorage');
};
