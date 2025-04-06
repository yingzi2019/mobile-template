<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import { selectionLocales } from '@/constants';
import { toggleLocalePicker } from '@shared/utils';

const { locale } = useI18n();
const currentLocaleItem = computed(
  () => selectionLocales.find((i) => i.value === unref(locale.value)) || null,
);
</script>

<template>
  <div class="flex flex-row items-center" v-if="currentLocaleItem">
    <i
      v-show="currentLocaleItem.icon"
      role="button"
      title="Language selector"
      class="size-20"
      :class="currentLocaleItem.icon"
      @click="toggleLocalePicker()"
    ></i>
  </div>
</template>
