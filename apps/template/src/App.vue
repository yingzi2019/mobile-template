<script setup lang="ts">
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
  console.log(route);
  if (route.name === 'Login') {
    return TRANSITION_NAME;
  }
};
</script>

<template>
  <van-config-provider :theme="mode">
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

<style scoped>
.app-wrapper {
  position: relative;
  width: 100%;
  padding: 16px;
  overflow: hidden;
}
</style>
