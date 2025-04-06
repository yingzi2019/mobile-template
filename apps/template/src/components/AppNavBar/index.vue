<script setup lang="ts">
import type { Component } from 'vue';

import { shallowRef, watchEffect } from 'vue';

import { useAppLayoutStore } from '@/stores/modules/layout';
import { NavBar } from 'vant';

const route = useRoute();
const { AppNavBarLeft, AppNavBarMiddle, AppNavBarRight, showAppNavBar } =
  useAppLayoutStore();

const LeftComponent = shallowRef<Component | string>('div');
const RightComponent = shallowRef<Component | string>('div');
const MiddleComponent = shallowRef<Component | string>('div');

// 组件缓存
const componentCache = new Map<string, Component | string>();

// 预加载组件映射
const components: Record<string, { default: Component }> = import.meta.glob(
  './components/*.vue',
  {
    eager: true,
  },
);

function getComponent(name: string) {
  // 检查缓存
  if (componentCache.has(name)) {
    return componentCache.get(name)!;
  }

  if (name && typeof name === 'object') {
    return name;
  }

  if (!name) {
    return 'div';
  }

  const componentPath = `./components/${name}.vue`;
  const component = components[componentPath]?.default || 'div';

  // 存入缓存
  componentCache.set(name, component);
  return component;
}

watchEffect(() => {
  if (showAppNavBar) {
    LeftComponent.value = getComponent(AppNavBarLeft);
    MiddleComponent.value = getComponent(AppNavBarMiddle);
    RightComponent.value = getComponent(AppNavBarRight);
  }
});
</script>

<template>
  <Transition name="slide" mode="out-in" appear>
    <NavBar
      v-if="showAppNavBar && route?.meta?.AppNavBar !== false"
      class="app-nav-bar"
      :border="false"
      fixed
      safe-area-inset-top
    >
      <template #left>
        <component :is="LeftComponent" />
      </template>
      <template #title>
        <component :is="MiddleComponent" />
      </template>
      <template #right>
        <component :is="RightComponent" />
      </template>
    </NavBar>
  </Transition>
</template>

<style scoped lang="scss">
.app-nav-bar {
  --van-border-width: 0px;

  z-index: 10;

  :deep(.van-nav-bar__content) {
    .van-nav-bar__left,
    .van-nav-bar__right {
      padding-inline: var(--app-padding);
    }

    .van-nav-bar__title {
      font-size: 16px;
      line-height: 160%;
      letter-spacing: 0.2px;
    }
  }
}
</style>
