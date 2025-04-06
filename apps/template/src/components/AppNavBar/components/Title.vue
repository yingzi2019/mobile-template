<script setup>
const route = useRoute();
const { t } = useI18n();
</script>

<template>
  <div v-if="route.meta?.title">
    {{ t(route.meta.title) }}
  </div>
</template>
