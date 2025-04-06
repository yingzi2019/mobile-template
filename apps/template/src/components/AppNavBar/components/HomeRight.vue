<script setup>
import { isApp } from '@/utils/is';

const router = useRouter();
const unreadCount = ref(0);

const show = !isApp();

function toDownload() {
  router.push({ name: 'Download' });
}

function handleNotification() {
  router.push({ name: 'message' });
}
</script>

<template>
  <div class="flex gap-16">
    <svg-icon
      v-show="show"
      name="normal-download"
      class="size-24"
      size=""
      @click="toDownload()"
    />
    <van-badge :dot="unreadCount > 0">
      <svg-icon
        name="notification"
        class="size-24"
        size=""
        @click="handleNotification()"
      />
    </van-badge>
  </div>
</template>

<style scoped></style>
