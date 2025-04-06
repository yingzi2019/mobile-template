<script setup>
const appConfig = useAppStore();
</script>

<template>
  <div>
    <img
      class="w-110 h-36"
      :src="appConfig.getAppConfig.app_web_settings?.logo"
      alt="top logo"
    />
  </div>
</template>

<style scoped></style>
