<script setup lang="ts">
const handleMore = () => {
  console.log('handle more');
};
</script>

<template>
  <div class="flex gap-16">
    <svg-icon
      name="dots-vertical"
      class="text-grayscale-500 active:text-grayscale-900 size-24"
      size=""
      @click="handleMore"
    />
  </div>
</template>

<style scoped></style>
