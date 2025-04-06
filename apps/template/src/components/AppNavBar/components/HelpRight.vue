<script setup>
const handleHelp = () => {
  console.log('handle help');
};
</script>

<template>
  <div class="flex gap-16">
    <svg-icon
      name="help-circle-outline"
      class="text-grayscale-500 active:text-grayscale-900 size-24"
      size=""
      @click="handleHelp"
    />
  </div>
</template>

<style scoped></style>
