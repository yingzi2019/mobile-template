<script setup>
const router = useRouter();
const route = useRoute();

function onBack() {
  const routeName = route.meta?.backName;
  if (routeName) {
    return router.push({ name: routeName });
  } else {
    if (window.history.state.back) {
      if (window.history.state.back === '/redirect') {
        window.history.go(-2);
      } else {
        history.back();
      }
    } else {
      router.back();
    }
  }
}
</script>

<template>
  <div @click="onBack">
    <i class="i-solar-alt-arrow-left-linear block size-[24px]"></i>
  </div>
</template>

<style scoped></style>
