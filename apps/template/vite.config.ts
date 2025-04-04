import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from '@vben/vite-config';

import { createVitePlugins } from './build/vite';

export default defineConfig(async (config) => {
  if (!config) {
    throw new Error('config is required');
  }

  const { mode, command } = config;
  const isBuild = command === 'build';

  return {
    application: {},
    vite: {
      server: {
        port: 5175,
      },
      plugins: [...(await createVitePlugins(mode))],
      resolve: {
        alias: {
          '@': path.join(path.dirname(fileURLToPath(import.meta.url)), 'src'),
        },
      },
    },
  };
});

// export default defineConfig(async ({ mode }: any) => {
//   const isProduction = mode === 'production';

//   return {
//     application: {},
//     vite: {
//       server: {
//         port: 5175,
//       },
//       plugins: [
//         Components({
//           dts: 'types/components.d.ts',
//           resolvers: [AntDesignVueResolver({ importStyle: 'less' })],
//         }),
//         mkcert(),
//         AutoImport({
//           dirs: ['src/store/modules'],
//           dts: 'types/auto-imports.d.ts',
//           eslintrc: {
//             enabled: true,
//             filepath: 'types/.eslintrc-auto-imports.js',
//           },
//           imports: [
//             'vue',
//             '@vueuse/core',
//             {
//               'vue-router': ['useRoute', 'useRouter'],
//             },
//           ],
//           resolvers: [],
//           viteOptimizeDeps: false,
//         }),
//       ],
//       resolve: {
//         alias: {
//           '@': path.join(path.dirname(fileURLToPath(import.meta.url)), 'src'),
//         },
//       },
//       esbuild: {
//         drop: isProduction ? ['console', 'debugger'] : [],
//       },
//     },
//   };

// export default defineConfig({ mode }: ConfigEnv): UserConfig => {
//   const root = process.cwd();
//   const env = loadEnv(mode, root);

//   return {
//     base: env.VITE_APP_PUBLIC_PATH,
//     plugins: createVitePlugins(mode),

//     server: {
//       host: true,
//       port: 3000,
//       proxy: {
//         '/api': {
//           target: '',
//           ws: false,
//           changeOrigin: true,
//         },
//       },
//     },

//     resolve: {
//       alias: {
//         '@': path.join(__dirname, './src'),
//         '~': path.join(__dirname, './src/assets'),
//         '~root': path.join(__dirname, '.'),
//       },
//     },

//     build: {
//       cssCodeSplit: false,
//       chunkSizeWarningLimit: 2048,
//       outDir: env.VITE_APP_OUT_DIR || 'dist',
//     },

//     optimizeDeps: { include, exclude },
//   };
// };
