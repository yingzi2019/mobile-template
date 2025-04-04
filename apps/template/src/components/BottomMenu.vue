<script setup lang="ts">
import { routeWhiteList } from '@/config/routes';

const { t } = useI18n();
const active = ref(0);
const route = useRoute();

const show = computed(() => route.name && routeWhiteList.includes(route.name));
</script>

<template>
  <van-tabbar v-if="show" v-model="active" placeholder route>
    <van-tabbar-item replace to="/">
      {{ t('common.menus.home') }}
      <template #icon>
        <div class="i-carbon:home"></div>
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/profile">
      {{ t('common.menus.profile') }}
      <template #icon>
        <div class="i-carbon:user"></div>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>
