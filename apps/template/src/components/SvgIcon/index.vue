<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  name: string;
  className?: string;
}
const props = withDefaults(defineProps<Props>(), {
  name: '',
  className: '',
});

function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

const isExternalIcon = computed(() => isExternal(props.name));
const iconName = computed(() => `#icon-${props.name}`);
const svgClass = computed(() => {
  return props.className ? `svg-icon ${props.className}` : 'svg-icon';
});
// 外链 icon
const styleExternalIcon = computed(() => {
  return {
    mask: `url(${props.name}) no-repeat 50% 50%`,
    '-webkit-mask': `url(${props.name}) no-repeat 50% 50%`,
  };
});
</script>

<template>
  <div
    v-if="isExternalIcon"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-bind="$attrs"
  ></div>
  <svg v-else :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentcolor;
}

.svg-external-icon {
  display: inline-block;
  background-color: currentcolor;
  mask-size: cover !important;
}
</style>
