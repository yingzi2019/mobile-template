import process from 'node:process';

import { VantResolver } from '@vant/auto-import-resolver';
import legacy from '@vitejs/plugin-legacy';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { loadEnv } from 'vite';
import Sitemap from 'vite-plugin-sitemap';

export async function createVitePlugins(mode: string) {
  const env = loadEnv(mode, process.cwd());

  return [
    Sitemap({
      outDir: env.VITE_APP_OUT_DIR || 'dist',
    }),

    Components({
      extensions: ['vue'],
      resolvers: [VantResolver()],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/types/components.d.ts',
    }),

    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      imports: [
        'vue',
        '@vueuse/core',
        {
          'vue-router/auto': ['useLink', 'useRouter', 'useRoute'],
          'vue-i18n': ['useI18n'],
        },
      ],
      dts: 'src/types/auto-imports.d.ts',
      dirs: ['src/composables'],
      resolvers: [VantResolver()],
    }),

    legacy({
      targets: ['defaults', 'not IE 11'],
    }),

    UnoCSS(),
  ];
}
