<script setup lang="ts">
import { ref } from 'vue';

import { showToast } from 'vant';

const count = ref(0);

function handleToast() {
  showToast('Hello');
}
</script>

<template>
  <div>
    <h1>Login {{ count }}</h1>
    <div class="flex gap-6">
      <van-cell-group>
        <van-cell title="单元格" value="内容" />
        <van-cell title="单元格" value="内容" label="描述信息" />
      </van-cell-group>
      <van-button type="primary" size="small" to="/home">Home</van-button>
      <van-button type="primary" size="small" to="/about">About</van-button>
      <van-button type="primary" size="small" to="/register">
        Register
      </van-button>
      <van-button type="primary" size="small" @click="handleToast" plain>
        toast
      </van-button>
    </div>
  </div>
</template>
