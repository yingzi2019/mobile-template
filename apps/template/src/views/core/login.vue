<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
</script>

<template>
  <div>
    <h1>Login {{ count }}</h1>
    <div>
      <van-button type="primary" to="/home">Home</van-button>
      <van-button type="primary" to="/about">About</van-button>
      <van-button type="primary" to="/register">Register</van-button>
    </div>
  </div>
</template>
