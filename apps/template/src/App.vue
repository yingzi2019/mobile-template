<script setup lang="ts">
import { stopProgress } from '@vben/utils';

import { TRANSITION_NAME } from '@/constants';
import { useRouteCacheStore } from '@/stores';
import { useHead } from '@unhead/vue';

useHead({
  title: 'Vue3 Vant Mobile',
  meta: [
    {
      name: 'description',
      content: 'An mobile web apps template based on the Vue 3 ecosystem',
    },
    {
      name: 'theme-color',
      content: () => (isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => (preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
    },
  ],
});

const keepAliveRouteNames = computed(() => {
  return useRouteCacheStore().routeCaches as string[];
});

const mode = computed(() => {
  return isDark.value ? 'dark' : 'light';
});

const getTransitionName = (route) => {
  return undefined;
  // TODO: 需要根据路由层级来判断是否需要过渡动画
  console.log(route);
  if (route.name === 'Login') {
    return TRANSITION_NAME;
  }
};

const theme = computed(() => {
  return isDark.value ? 'dark' : 'light';
});

onMounted(() => {
  setTimeout(() => {
    stopProgress();
  }, 300);
});
</script>

<template>
  <van-config-provider :theme="theme">
    <app-nav-bar />
    <router-view v-slot="{ Component, route }">
      <section class="app-wrapper">
        <transition :name="getTransitionName(route)" mode="out-in" appear>
          <keep-alive :include="keepAliveRouteNames">
            <component :is="Component" />
          </keep-alive>
        </transition>
      </section>
    </router-view>
    <bottom-menu />
  </van-config-provider>
</template>
