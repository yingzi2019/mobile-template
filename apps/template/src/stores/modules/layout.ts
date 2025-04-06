import { showAppNavBar, toggleAppNavBar } from '@shared/utils';
import { defineStore } from 'pinia';

export const useAppLayoutStore = defineStore('app-layout', () => {
  const AppNavBarLeft = shallowRef('div');
  const AppNavBarMiddle = shallowRef('div');
  const AppNavBarRight = shallowRef('div');

  const setAppNavBarLeft = (value: string) => {
    AppNavBarLeft.value = value;
  };
  const setAppNavBarMiddle = (value: string) => {
    AppNavBarMiddle.value = value;
  };
  const setAppNavBarRight = (value: string) => {
    AppNavBarRight.value = value;
  };

  const initAppNavBar = () => {
    setAppNavBarLeft('LeftBack');
    setAppNavBarMiddle('Title');
    // setAppNavBarRight('AppLocalePicker');
    setAppNavBarRight('ToggleDark');
  };

  return {
    showAppNavBar,
    toggleAppNavBar,
    initAppNavBar,
    AppNavBarLeft,
    AppNavBarMiddle,
    AppNavBarRight,
    setAppNavBarLeft,
    setAppNavBarMiddle,
    setAppNavBarRight,
  };
});
