import type { PluginOption } from 'vite';

import process from 'node:process';

import { VantResolver } from '@vant/auto-import-resolver';
import legacy from '@vitejs/plugin-legacy';
import autoprefixer from 'autoprefixer';
import viewport from 'postcss-mobile-forever';
import postcssPresetEnv from 'postcss-preset-env';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { loadEnv } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import Sitemap from 'vite-plugin-sitemap';

export async function createVitePlugins(mode: string) {
  const env = loadEnv(mode, process.cwd());
  const https = env.VITE_APP_HTTPS.toLowerCase() === 'true';

  const plugins: PluginOption[] = [
    Sitemap({
      outDir: env.VITE_APP_OUT_DIR || 'dist',
    }),

    Components({
      extensions: ['vue'],
      resolvers: [
        VantResolver({
          importStyle: false,
        }),
      ],
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
      resolvers: [
        VantResolver({
          importStyle: false,
        }),
      ],
    }),

    legacy({
      targets: ['defaults', 'not IE 11'],
    }),

    UnoCSS(),
  ];

  if (https) {
    plugins.push(mkcert());
  }

  return plugins;
}

export function createViteCSSOptions() {
  return {
    postcss: {
      plugins: [
        autoprefixer(),
        postcssPresetEnv({
          stage: 3,
          browsers: 'last 2 versions, not IE 11',
        }),
        viewport({
          appSelector: '#app',
          viewportWidth: 375,
          maxDisplayWidth: 600,
          rootContainingBlockSelectorList: ['van-tabbar', 'van-popup'],
        }),
      ],
    },
    preprocessorOptions: {
      scss: {
        api: 'modern',
        silenceDeprecations: ['import'],
      },
    },
  };
}
