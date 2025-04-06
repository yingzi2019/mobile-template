import { useStorage, useToggle } from '@vueuse/core';

export function useAppConfigToggles(key: string = '') {
  if (!key.startsWith('toggle-')) {
    throw new Error('key must start with toggle-');
  }

  const value = useStorage(key, false);
  return [value, (value: boolean) => (value = !value)] as const;
}

export const [showLoading, toggleLoading] = useToggle(); // 显示全局Loading

export const [showAppNavBar, toggleAppNavBar] = useToggle(true); // 显示导航栏

export const [showLocalePicker, toggleLocalePicker] = useToggle(false); // 显示语言选择器
